import React, { useEffect, useState } from 'react'
import { Grid, Typography, Card, CardContent } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SubjectIcon from '@mui/icons-material/Subject';
import PersonIcon from '@mui/icons-material/Person';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NotificationsIcon from '@mui/icons-material/Notifications';

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser.sclassName._id

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <PageContainer>
            <HeaderSection>
                <HeaderContent>
                    <HeaderIcon>
                        <PersonIcon />
                    </HeaderIcon>
                    <HeaderText>
                        <HeaderTitle>Welcome back, {currentUser.name}! 👋</HeaderTitle>
                        <HeaderSubtitle>Here's your academic overview for today</HeaderSubtitle>
                    </HeaderText>
                </HeaderContent>
                <HeaderStats>
                    <StatBadge>
                        <TrendingUpIcon />
                        <span>Attendance: {overallAttendancePercentage}%</span>
                    </StatBadge>
                </HeaderStats>
            </HeaderSection>

            <StatsGrid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatsCard>
                        <StatsCardContent>
                            <StatsIcon>
                                <SubjectIcon />
                            </StatsIcon>
                            <StatsInfo>
                                <StatsLabel>Total Subjects</StatsLabel>
                                <StatsValue>
                                    <CountUp start={0} end={numberOfSubjects || 0} duration={2.5} />
                                </StatsValue>
                                <StatsTrend>+2 this class</StatsTrend>
                            </StatsInfo>
                        </StatsCardContent>
                    </StatsCard>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <StatsCard>
                        <StatsCardContent>
                            <StatsIcon>
                                <AssignmentIcon />
                            </StatsIcon>
                            <StatsInfo>
                                <StatsLabel>Total Assignments</StatsLabel>
                                <StatsValue>
                                    <CountUp start={0} end={15} duration={4} />
                                </StatsValue>
                                <StatsTrend>3 pending</StatsTrend>
                            </StatsInfo>
                        </StatsCardContent>
                    </StatsCard>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <StatsCard>
                        <StatsCardContent>
                            <StatsIcon>
                                <SchoolIcon />
                            </StatsIcon>
                            <StatsInfo>
                                <StatsLabel>Current Class</StatsLabel>
                                <StatsValue>{currentUser.sclassName.sclassName}</StatsValue>
                                <StatsTrend>Active</StatsTrend>
                            </StatsInfo>
                        </StatsCardContent>
                    </StatsCard>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <StatsCard>
                        <StatsCardContent>
                            <StatsIcon>
                                <TrendingUpIcon />
                            </StatsIcon>
                            <StatsInfo>
                                <StatsLabel>Performance</StatsLabel>
                                <StatsValue>85%</StatsValue>
                                <StatsTrend>+5% this month</StatsTrend>
                            </StatsInfo>
                        </StatsCardContent>
                    </StatsCard>
                </Grid>
            </StatsGrid>

            <ChartSection>
                <ChartCard>
                    <ChartCardContent>
                        <ChartHeader>
                            <ChartIcon>
                                <SchoolIcon />
                            </ChartIcon>
                            <ChartText>
                                <ChartTitle>Attendance Overview</ChartTitle>
                                <ChartSubtitle>Your attendance performance across all subjects</ChartSubtitle>
                            </ChartText>
                        </ChartHeader>
                        
                        <ChartContainer>
                            {response ? (
                                <EmptyState>
                                    <EmptyStateIcon>
                                        <SchoolIcon />
                                    </EmptyStateIcon>
                                    <EmptyStateText>No Attendance Found</EmptyStateText>
                                    <EmptyStateSubtext>Your attendance data will appear here once available</EmptyStateSubtext>
                                </EmptyState>
                            ) : loading ? (
                                <LoadingState>
                                    <LoadingSpinner />
                                    <LoadingText>Loading attendance data...</LoadingText>
                                </LoadingState>
                            ) : subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                <CustomPieChart data={chartData} />
                            ) : (
                                <EmptyState>
                                    <EmptyStateIcon>
                                        <SchoolIcon />
                                    </EmptyStateIcon>
                                    <EmptyStateText>No Attendance Found</EmptyStateText>
                                    <EmptyStateSubtext>Your attendance data will appear here once available</EmptyStateSubtext>
                                </EmptyState>
                            )}
                        </ChartContainer>
                    </ChartCardContent>
                </ChartCard>
            </ChartSection>

            <NoticesSection>
                <NoticesCard>
                    <NoticesCardContent>
                        <NoticesHeader>
                            <NoticesIcon>
                                <NotificationsIcon />
                            </NoticesIcon>
                            <NoticesText>
                                <NoticesTitle>School Notices</NoticesTitle>
                                <NoticesSubtitle>Stay updated with important announcements and updates</NoticesSubtitle>
                            </NoticesText>
                        </NoticesHeader>
                        <SeeNotice />
                    </NoticesCardContent>
                </NoticesCard>
            </NoticesSection>
        </PageContainer>
    )
}

export default StudentHomePage

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24px;
  animation: fadeIn 0.5s ease-in-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const HeaderSection = styled.div`
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const HeaderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  color: white;
  box-shadow: 0 8px 25px rgba(127, 86, 218, 0.3);
  
  .MuiSvgIcon-root {
    font-size: 28px;
  }
`;

const HeaderText = styled.div``;

const HeaderTitle = styled(Typography)`
  && {
    font-size: 32px;
    font-weight: 700;
    color: white;
    margin-bottom: 8px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const HeaderSubtitle = styled(Typography)`
  && {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.9);
  }
`;

const HeaderStats = styled.div`
  display: flex;
  gap: 12px;
`;

const StatBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  color: white;
  font-weight: 500;
  font-size: 14px;
  backdrop-filter: blur(10px);
  
  .MuiSvgIcon-root {
    font-size: 16px;
  }
`;

const StatsGrid = styled(Grid)`
  && {
    margin-bottom: 32px;
  }
`;

const StatsCard = styled(Card)`
  && {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    height: 100%;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }
  }
`;

const StatsCardContent = styled(CardContent)`
  && {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 24px;
    height: 100%;
  }
`;

const StatsIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  color: white;
  flex-shrink: 0;
  
  .MuiSvgIcon-root {
    font-size: 24px;
  }
`;

const StatsInfo = styled.div`
  flex: 1;
`;

const StatsLabel = styled(Typography)`
  && {
    font-size: 14px;
    color: #64748b;
    font-weight: 500;
    margin-bottom: 4px;
  }
`;

const StatsValue = styled(Typography)`
  && {
    font-size: 24px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 4px;
  }
`;

const StatsTrend = styled(Typography)`
  && {
    font-size: 12px;
    color: #10b981;
    font-weight: 500;
  }
`;

const ChartSection = styled.div`
  margin-bottom: 32px;
`;

const ChartCard = styled(Card)`
  && {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
`;

const ChartCardContent = styled(CardContent)`
  && {
    padding: 32px;
  }
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const ChartIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  color: white;
  
  .MuiSvgIcon-root {
    font-size: 24px;
  }
`;

const ChartText = styled.div``;

const ChartTitle = styled(Typography)`
  && {
    font-size: 20px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 4px;
  }
`;

const ChartSubtitle = styled(Typography)`
  && {
    font-size: 14px;
    color: #64748b;
  }
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 420px;
  height: 420px;
  margin: 0 auto;
  background: none;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px;
`;

const EmptyStateIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  color: white;
  margin-bottom: 16px;
  
  .MuiSvgIcon-root {
    font-size: 32px;
  }
`;

const EmptyStateText = styled(Typography)`
  && {
    font-size: 18px;
    color: #64748b;
    font-weight: 500;
    margin-bottom: 8px;
  }
`;

const EmptyStateSubtext = styled(Typography)`
  && {
    font-size: 14px;
    color: #94a3b8;
  }
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #7f56da;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled(Typography)`
  && {
    font-size: 18px;
    color: #64748b;
    font-weight: 500;
  }
`;

const NoticesSection = styled.div``;

const NoticesCard = styled(Card)`
  && {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
`;

const NoticesCardContent = styled(CardContent)`
  && {
    padding: 32px;
  }
`;

const NoticesHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const NoticesIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  color: white;
  
  .MuiSvgIcon-root {
    font-size: 24px;
  }
`;

const NoticesText = styled.div``;

const NoticesTitle = styled(Typography)`
  && {
    font-size: 20px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 4px;
  }
`;

const NoticesSubtitle = styled(Typography)`
  && {
    font-size: 14px;
    color: #64748b;
  }
`;