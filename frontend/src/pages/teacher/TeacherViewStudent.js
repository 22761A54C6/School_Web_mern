import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Collapse, Table, TableBody, TableHead, Typography, Card, CardContent, Chip, Avatar, Divider } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp, Person, School, Class, Assessment, Add } from '@mui/icons-material';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart'
import { PurpleButton } from '../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../components/styles';
import styled from 'styled-components';

const TeacherViewStudent = () => {

    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch();
    const { currentUser, userDetails, response, loading, error } = useSelector((state) => state.user);

    const address = "Student"
    const studentID = params.id
    const teachSubject = currentUser.teachSubject?.subName
    const teachSubjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    useEffect(() => {
        if (userDetails) {
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <StudentViewContainer>
            {loading ? (
                <LoadingContainer>
                    <LoadingText>Loading student details...</LoadingText>
                </LoadingContainer>
            ) : (
                <>
                    <HeaderSection>
                        <StudentAvatar>
                            <Person />
                        </StudentAvatar>
                        <HeaderText>
                            <StudentName>{userDetails?.name}</StudentName>
                            <StudentRole>Student Profile</StudentRole>
                        </HeaderText>
                    </HeaderSection>

                    <ContentGrid>
                        <InfoCard>
                            <CardHeader>
                                <Typography variant="h6" component="h3" sx={{ 
                                    fontWeight: 600, 
                                    color: '#1a1a1a',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}>
                                    <Person />
                                    Student Information
                                </Typography>
                            </CardHeader>
                            <CardContent>
                                <InfoItem>
                                    <InfoLabel>Name</InfoLabel>
                                    <InfoValue>{userDetails?.name}</InfoValue>
                                </InfoItem>
                                <InfoItem>
                                    <InfoLabel>Roll Number</InfoLabel>
                                    <InfoValue>{userDetails?.rollNum}</InfoValue>
                                </InfoItem>
                                <InfoItem>
                                    <InfoLabel>Class</InfoLabel>
                                    <InfoValue>
                                        {sclassName?.sclassName}
                                        <ClassChip label="Enrolled" color="primary" size="small" />
                                    </InfoValue>
                                </InfoItem>
                                <InfoItem>
                                    <InfoLabel>School</InfoLabel>
                                    <InfoValue>{studentSchool?.schoolName}</InfoValue>
                                </InfoItem>
                            </CardContent>
                        </InfoCard>

                        {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 && (
                            <AttendanceCard>
                                <CardHeader>
                                    <Typography variant="h6" component="h3" sx={{ 
                                        fontWeight: 600, 
                                        color: '#1a1a1a',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}>
                                        <Assessment />
                                        Attendance Overview
                                    </Typography>
                                </CardHeader>
                                <CardContent>
                                    <AttendanceStats>
                                        <StatItem>
                                            <StatLabel>Overall Attendance</StatLabel>
                                            <StatValue>{overallAttendancePercentage}%</StatValue>
                                        </StatItem>
                                        <StatItem>
                                            <StatLabel>Total Sessions</StatLabel>
                                            <StatValue>{subjectAttendance.length}</StatValue>
                                        </StatItem>
                                    </AttendanceStats>
                                    
                                    <ChartContainer>
                                        <CustomPieChart data={chartData} />
                                    </ChartContainer>

                                    {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                        if (subName === teachSubject) {
                                            const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);

                                            return (
                                                <SubjectAttendance key={index}>
                                                    <SubjectHeader>
                                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                                                            {subName} - {subjectAttendancePercentage}%
                                                        </Typography>
                                                        <Button
                                                            variant="outlined"
                                                            size="small"
                                                            onClick={() => handleOpen(subId)}
                                                            startIcon={openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                        >
                                                            Details
                                                        </Button>
                                                    </SubjectHeader>
                                                    
                                                    <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                        <AttendanceTable>
                                                            <Table size="small">
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
                                                                                    <Chip 
                                                                                        label={data.status} 
                                                                                        color={data.status === 'Present' ? 'success' : 'error'}
                                                                                        size="small"
                                                                                    />
                                                                                </StyledTableCell>
                                                                            </StyledTableRow>
                                                                        );
                                                                    })}
                                                                </TableBody>
                                                            </Table>
                                                        </AttendanceTable>
                                                    </Collapse>
                                                </SubjectAttendance>
                                            )
                                        }
                                        return null;
                                    })}
                                </CardContent>
                            </AttendanceCard>
                        )}

                        {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 && (
                            <MarksCard>
                                <CardHeader>
                                    <Typography variant="h6" component="h3" sx={{ 
                                        fontWeight: 600, 
                                        color: '#1a1a1a',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}>
                                        <Assessment />
                                        Subject Marks
                                    </Typography>
                                </CardHeader>
                                <CardContent>
                                    {subjectMarks.map((result, index) => {
                                        if (result.subName.subName === teachSubject) {
                                            return (
                                                <MarksItem key={index}>
                                                    <MarksLabel>Current Marks</MarksLabel>
                                                    <MarksValue>{result.marksObtained}</MarksValue>
                                                </MarksItem>
                                            )
                                        }
                                        return null;
                                    })}
                                </CardContent>
                            </MarksCard>
                        )}
                    </ContentGrid>

                    <ActionSection>
                        <ActionButton
                            variant="contained"
                            onClick={() => navigate(`/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`)}
                            startIcon={<Add />}
                        >
                            Add Attendance
                        </ActionButton>
                        
                        <ActionButton
                            variant="contained"
                            onClick={() => navigate(`/Teacher/class/student/marks/${studentID}/${teachSubjectID}`)}
                            startIcon={<Add />}
                        >
                            Add Marks
                        </ActionButton>
                    </ActionSection>
                </>
            )}
        </StudentViewContainer>
    )
}

export default TeacherViewStudent

const StudentViewContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 24px;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const StudentAvatar = styled(Avatar)`
  && {
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    font-size: 48px;
    box-shadow: 0 8px 32px rgba(127, 86, 218, 0.3);
  }
`;

const HeaderText = styled.div`
  text-align: center;
`;

const StudentName = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 4px 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StudentRole = styled.p`
  font-size: 1.1rem;
  color: #7f56da;
  font-weight: 600;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: #666;
  font-weight: 500;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
  margin-bottom: 32px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled(Card)`
  && {
    border-radius: 16px;
    background: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(127, 86, 218, 0.1);
    overflow: hidden;
  }
`;

const AttendanceCard = styled(Card)`
  && {
    border-radius: 16px;
    background: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(127, 86, 218, 0.1);
    overflow: hidden;
  }
`;

const MarksCard = styled(Card)`
  && {
    border-radius: 16px;
    background: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(127, 86, 218, 0.1);
    overflow: hidden;
  }
`;

const CardHeader = styled.div`
  padding: 24px 24px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled(Typography)`
  && {
    font-size: 0.875rem;
    color: #666;
    font-weight: 500;
  }
`;

const InfoValue = styled(Typography)`
  && {
    font-size: 1rem;
    color: #1a1a1a;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const ClassChip = styled(Chip)`
  && {
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    color: white;
    font-weight: 600;
    height: 24px;
  }
`;

const AttendanceStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 16px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border: 1px solid rgba(127, 86, 218, 0.1);
`;

const StatLabel = styled(Typography)`
  && {
    font-size: 0.875rem;
    color: #666;
    font-weight: 500;
    margin-bottom: 4px;
  }
`;

const StatValue = styled(Typography)`
  && {
    font-size: 1.5rem;
    color: #7f56da;
    font-weight: 700;
  }
`;

const ChartContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 420px;
  height: 420px;
  margin-left: auto;
  margin-right: auto;
  background: none;
`;

const SubjectAttendance = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
`;

const SubjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const AttendanceTable = styled.div`
  margin-top: 16px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
`;

const MarksItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`;

const MarksLabel = styled(Typography)`
  && {
    font-size: 1rem;
    color: #666;
    font-weight: 500;
  }
`;

const MarksValue = styled(Typography)`
  && {
    font-size: 1.5rem;
    color: #7f56da;
    font-weight: 700;
  }
`;

const ActionSection = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    color: white;
    text-transform: none;
    font-weight: 600;
    border-radius: 8px;
    padding: 12px 24px;
    box-shadow: 0 4px 12px rgba(127, 86, 218, 0.3);
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 100%);
      box-shadow: 0 6px 20px rgba(127, 86, 218, 0.4);
      transform: translateY(-2px);
    }
  }
`;