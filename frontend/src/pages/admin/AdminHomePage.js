import { Container, Grid, Paper, Typography, Box } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);

    const { currentUser } = useSelector(state => state.user)

    const adminID = currentUser._id

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

    return (
        <PageContainer>
            <HeaderSection>
                <HeaderContent>
                    <HeaderIcon>
                        <DashboardIcon />
                    </HeaderIcon>
                    <HeaderText>
                        <HeaderTitle>Admin Dashboard</HeaderTitle>
                        <HeaderSubtitle>Welcome back, {currentUser.name}! Here's your school overview.</HeaderSubtitle>
                    </HeaderText>
                </HeaderContent>
            </HeaderSection>

            <StatsGrid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatsCard>
                        <CardIcon>
                            <GroupIcon />
                        </CardIcon>
                        <CardContent>
                            <CardTitle>Total Students</CardTitle>
                            <CardData>
                                <CountUp start={0} end={numberOfStudents || 0} duration={2.5} />
                            </CardData>
                            <CardSubtitle>Registered students</CardSubtitle>
                        </CardContent>
                    </StatsCard>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                    <StatsCard>
                        <CardIcon>
                            <SchoolIcon />
                        </CardIcon>
                        <CardContent>
                            <CardTitle>Total Classes</CardTitle>
                            <CardData>
                                <CountUp start={0} end={numberOfClasses || 0} duration={2.5} />
                            </CardData>
                            <CardSubtitle>Active classes</CardSubtitle>
                        </CardContent>
                    </StatsCard>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                    <StatsCard>
                        <CardIcon>
                            <PersonIcon />
                        </CardIcon>
                        <CardContent>
                            <CardTitle>Total Teachers</CardTitle>
                            <CardData>
                                <CountUp start={0} end={numberOfTeachers || 0} duration={2.5} />
                            </CardData>
                            <CardSubtitle>Teaching staff</CardSubtitle>
                        </CardContent>
                    </StatsCard>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                    <StatsCard>
                        <CardIcon>
                            <MonetizationOnIcon />
                        </CardIcon>
                        <CardContent>
                            <CardTitle>Fees Collection</CardTitle>
                            <CardData>
                                <CountUp start={0} end={23000} duration={2.5} prefix="$" />
                            </CardData>
                            <CardSubtitle>This month</CardSubtitle>
                        </CardContent>
                    </StatsCard>
                </Grid>
            </StatsGrid>

            <NoticesSection>
                <NoticesCard>
                    <SeeNotice />
                </NoticesCard>
            </NoticesSection>
        </PageContainer>
    );
};

export default AdminHomePage

const PageContainer = styled.div`
  padding: 24px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const HeaderSection = styled.div`
  margin-bottom: 32px;
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
  
  .MuiSvgIcon-root {
    font-size: 28px;
  }
`;

const HeaderText = styled.div``;

const HeaderTitle = styled(Typography)`
  && {
    font-size: 32px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 8px;
  }
`;

const HeaderSubtitle = styled(Typography)`
  && {
    font-size: 16px;
    color: #64748b;
  }
`;

const StatsGrid = styled(Grid)`
  && {
    margin-bottom: 32px;
  }
`;

const StatsCard = styled(Paper)`
  && {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    }
  }
`;

const CardIcon = styled.div`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 12px;
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    color: white;
    margin-bottom: 16px;
    
    .MuiSvgIcon-root {
      font-size: 28px;
    }
  }
`;

const CardContent = styled.div`
  padding: 24px;
  text-align: center;
`;

const CardTitle = styled(Typography)`
  && {
    font-size: 16px;
    font-weight: 600;
    color: #64748b;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const CardData = styled.div`
  && {
    font-size: 32px;
    font-weight: 700;
    color: #7f56da;
    margin-bottom: 8px;
  }
`;

const CardSubtitle = styled(Typography)`
  && {
    font-size: 14px;
    color: #94a3b8;
    font-weight: 500;
  }
`;

const NoticesSection = styled.div`
  margin-top: 32px;
`;

const NoticesCard = styled(Paper)`
  && {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
`;