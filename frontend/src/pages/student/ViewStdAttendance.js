import React, { useEffect, useState } from 'react'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Box, Button, Collapse, Paper, Table, TableBody, TableHead, Typography, Card } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomBarChart from '../../components/CustomBarChart'
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';
import styled from 'styled-components';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const ViewStdAttendance = () => {
    const dispatch = useDispatch();

    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const attendanceBySubject = groupAttendanceBySubject(subjectAttendance)

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);

    const subjectData = Object.entries(attendanceBySubject).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <TableSection>
                <TableHeader>
                    <TableHeaderIcon>
                        <SchoolIcon />
                    </TableHeaderIcon>
                    <TableHeaderContent>
                        <TableHeaderTitle>Attendance Overview</TableHeaderTitle>
                        <TableHeaderSubtitle>Track your attendance across all subjects</TableHeaderSubtitle>
                    </TableHeaderContent>
                </TableHeader>

                <AttendanceTable>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Subject</StyledTableCell>
                            <StyledTableCell>Present</StyledTableCell>
                            <StyledTableCell>Total Sessions</StyledTableCell>
                            <StyledTableCell>Attendance Percentage</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(attendanceBySubject).map(([subName, { present, allData, subId, sessions }], index) => {
                            const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);

                            return (
                                <React.Fragment key={index}>
                                    <StyledTableRow>
                                        <StyledTableCell>{subName}</StyledTableCell>
                                        <StyledTableCell>{present}</StyledTableCell>
                                        <StyledTableCell>{sessions}</StyledTableCell>
                                        <StyledTableCell>
                                            <AttendancePercentage percentage={subjectAttendancePercentage}>
                                                {subjectAttendancePercentage}%
                                            </AttendancePercentage>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <DetailsButton
                                                variant="contained"
                                                onClick={() => handleOpen(subId)}
                                            >
                                                {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                Details
                                            </DetailsButton>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                <DetailsContainer>
                                                    <DetailsTitle>Attendance Details</DetailsTitle>
                                                    <DetailsTable size="small" aria-label="purchases">
                                                        <TableHead>
                                                            <StyledTableRow>
                                                                <StyledTableCell>Date</StyledTableCell>
                                                                <StyledTableCell align="right">Status</StyledTableCell>
                                                            </StyledTableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {allData.map((data, index) => {
                                                                const date = new Date(data.date);
                                                                const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                return (
                                                                    <StyledTableRow key={index}>
                                                                        <StyledTableCell component="th" scope="row">
                                                                            {dateString}
                                                                        </StyledTableCell>
                                                                        <StyledTableCell align="right">
                                                                            <StatusBadge status={data.status}>
                                                                                {data.status}
                                                                            </StatusBadge>
                                                                        </StyledTableCell>
                                                                    </StyledTableRow>
                                                                )
                                                            })}
                                                        </TableBody>
                                                    </DetailsTable>
                                                </DetailsContainer>
                                            </Collapse>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                </React.Fragment>
                            )
                        })}
                    </TableBody>
                </AttendanceTable>

                <OverallAttendanceCard>
                    <OverallAttendanceIcon>
                        <TrendingUpIcon />
                    </OverallAttendanceIcon>
                    <OverallAttendanceContent>
                        <OverallAttendanceLabel>Overall Attendance Percentage</OverallAttendanceLabel>
                        <OverallAttendanceValue>{overallAttendancePercentage}%</OverallAttendanceValue>
                    </OverallAttendanceContent>
                </OverallAttendanceCard>
            </TableSection>
        )
    }

    const renderChartSection = () => {
        return (
            <ChartSection>
                <ChartHeader>
                    <ChartHeaderIcon>
                        <InsertChartIcon />
                    </ChartHeaderIcon>
                    <ChartHeaderContent>
                        <ChartHeaderTitle>Attendance Analytics</ChartHeaderTitle>
                        <ChartHeaderSubtitle>Visual representation of your attendance data</ChartHeaderSubtitle>
                    </ChartHeaderContent>
                </ChartHeader>
                <ChartContainer>
                    <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
                </ChartContainer>
            </ChartSection>
        )
    };

    return (
        <Container>
            {loading ? (
                <LoadingState>
                    <LoadingText>Loading attendance data...</LoadingText>
                </LoadingState>
            ) : (
                <ContentWrapper>
                    {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                        <>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}

                            <BottomNavigationWrapper>
                                <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                                    <BottomNavigationAction
                                        label="Table"
                                        value="table"
                                        icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                    />
                                    <BottomNavigationAction
                                        label="Chart"
                                        value="chart"
                                        icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                    />
                                </BottomNavigation>
                            </BottomNavigationWrapper>
                        </>
                    ) : (
                        <EmptyState>
                            <EmptyStateIcon>
                                <CalendarTodayIcon />
                            </EmptyStateIcon>
                            <EmptyStateTitle>No Attendance Data</EmptyStateTitle>
                            <EmptyStateText>Currently you have no attendance details available.</EmptyStateText>
                        </EmptyState>
                    )}
                </ContentWrapper>
            )}
        </Container>
    )
}

export default ViewStdAttendance

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24px;
`;

const ContentWrapper = styled.div`
  position: relative;
  padding-bottom: 80px;
`;

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
`;

const LoadingText = styled(Typography)`
  && {
    font-size: 18px;
    color: white;
    font-weight: 500;
  }
`;

const TableSection = styled.div``;

const TableHeader = styled.div`
  background: white;
  border-radius: 16px 16px 0 0;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 0;
`;

const TableHeaderIcon = styled.div`
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

const TableHeaderContent = styled.div``;

const TableHeaderTitle = styled(Typography)`
  && {
    font-size: 20px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 4px;
  }
`;

const TableHeaderSubtitle = styled(Typography)`
  && {
    font-size: 14px;
    color: #64748b;
  }
`;

const AttendanceTable = styled(Table)`
  && {
    background: white;
    border-radius: 0 0 16px 16px;
    overflow: hidden;
  }
`;

const AttendancePercentage = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  background: ${props => props.percentage >= 75 ? '#dcfce7' : props.percentage >= 50 ? '#fef3c7' : '#fee2e2'};
  color: ${props => props.percentage >= 75 ? '#166534' : props.percentage >= 50 ? '#92400e' : '#dc2626'};
`;

const DetailsButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    color: white;
    border-radius: 8px;
    text-transform: none;
    font-weight: 500;
    padding: 8px 16px;
    
    &:hover {
      background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 100%);
    }
  }
`;

const DetailsContainer = styled(Box)`
  margin: 16px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
`;

const DetailsTitle = styled(Typography)`
  && {
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 16px;
  }
`;

const DetailsTable = styled(Table)`
  && {
    background: white;
    border-radius: 8px;
    overflow: hidden;
  }
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.status === 'Present' ? '#dcfce7' : '#fee2e2'};
  color: ${props => props.status === 'Present' ? '#166534' : '#dc2626'};
`;

const OverallAttendanceCard = styled(Card)`
  && {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    margin-top: 24px;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const OverallAttendanceIcon = styled.div`
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

const OverallAttendanceContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
`;

const OverallAttendanceLabel = styled(Typography)`
  && {
    font-size: 16px;
    color: #64748b;
    font-weight: 500;
  }
`;

const OverallAttendanceValue = styled(Typography)`
  && {
    font-size: 24px;
    font-weight: 700;
    color: #1e293b;
  }
`;

const ChartSection = styled.div``;

const ChartHeader = styled.div`
  background: white;
  border-radius: 16px 16px 0 0;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 0;
`;

const ChartHeaderIcon = styled.div`
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

const ChartHeaderContent = styled.div``;

const ChartHeaderTitle = styled(Typography)`
  && {
    font-size: 20px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 4px;
  }
`;

const ChartHeaderSubtitle = styled(Typography)`
  && {
    font-size: 14px;
    color: #64748b;
  }
`;

const ChartContainer = styled.div`
  background: white;
  border-radius: 0 0 16px 16px;
  padding: 24px;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BottomNavigationWrapper = styled(Paper)`
  && {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    border-radius: 16px 16px 0 0;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 24px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const EmptyStateIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  color: white;
  margin-bottom: 24px;
  
  .MuiSvgIcon-root {
    font-size: 40px;
  }
`;

const EmptyStateTitle = styled(Typography)`
  && {
    font-size: 24px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 8px;
  }
`;

const EmptyStateText = styled(Typography)`
  && {
    font-size: 16px;
    color: #64748b;
  }
`;