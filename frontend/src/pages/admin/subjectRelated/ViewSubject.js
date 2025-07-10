import React, { useEffect, useState } from 'react'
import { getClassStudents, getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Tab, Typography, BottomNavigation, BottomNavigationAction, Paper, Card, CardContent, Grid } from '@mui/material';
import TableTemplate from '../../../components/TableTemplate';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styled from 'styled-components';
import SubjectIcon from '@mui/icons-material/Subject';
import PeopleIcon from '@mui/icons-material/People';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AddIcon from '@mui/icons-material/Add';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

const ViewSubject = () => {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassStudents, getresponse, error } = useSelector((state) => state.sclass);

  const { classID, subjectID } = params

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  if (error) {
    console.log(error)
  }

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [selectedSection, setSelectedSection] = useState('attendance');
  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const studentColumns = [
    { id: 'rollNum', label: 'Roll No.', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
  ]

  const studentRows = sclassStudents.map((student) => {
    return {
      rollNum: student.rollNum,
      name: student.name,
      id: student._id,
    };
  })

  const StudentsAttendanceButtonHaver = ({ row }) => {
    return (
      <ActionButtons>
        <ViewButton
          onClick={() => navigate("/Admin/students/student/" + row.id)}
          startIcon={<VisibilityIcon />}
        >
          View
        </ViewButton>
        <AttendanceButton
          onClick={() =>
            navigate(`/Admin/subject/student/attendance/${row.id}/${subjectID}`)
          }
          startIcon={<AssessmentIcon />}
        >
          Take Attendance
        </AttendanceButton>
      </ActionButtons>
    );
  };

  const StudentsMarksButtonHaver = ({ row }) => {
    return (
      <ActionButtons>
        <ViewButton
          onClick={() => navigate("/Admin/students/student/" + row.id)}
          startIcon={<VisibilityIcon />}
        >
          View
        </ViewButton>
        <MarksButton
          onClick={() => navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)}
          startIcon={<AssignmentIcon />}
        >
          Provide Marks
        </MarksButton>
      </ActionButtons>
    );
  };

  const SubjectStudentsSection = () => {
    return (
      <StudentsContainer>
        {getresponse ? (
          <EmptyStateCard>
            <EmptyStateIcon>
              <PeopleIcon />
            </EmptyStateIcon>
            <EmptyStateTitle>No Students Found</EmptyStateTitle>
            <EmptyStateSubtitle>
              This class doesn't have any students yet. Add students to start managing attendance and marks.
            </EmptyStateSubtitle>
            <AddStudentsButton
              onClick={() => navigate("/Admin/class/addstudents/" + classID)}
              startIcon={<PersonAddIcon />}
            >
              Add Students
            </AddStudentsButton>
          </EmptyStateCard>
        ) : (
          <>
            <SectionHeader>
              <SectionTitle>Students List</SectionTitle>
              <SectionSubtitle>Manage student attendance and marks for this subject</SectionSubtitle>
            </SectionHeader>

            <ContentCard>
              {selectedSection === 'attendance' &&
                <TableTemplate buttonHaver={StudentsAttendanceButtonHaver} columns={studentColumns} rows={studentRows} />
              }
              {selectedSection === 'marks' &&
                <TableTemplate buttonHaver={StudentsMarksButtonHaver} columns={studentColumns} rows={studentRows} />
              }
            </ContentCard>

            <StyledBottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
              <BottomNavigationAction
                label="Attendance"
                value="attendance"
                icon={selectedSection === 'attendance' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
              />
              <BottomNavigationAction
                label="Marks"
                value="marks"
                icon={selectedSection === 'marks' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
              />
            </StyledBottomNavigation>
          </>
        )}
      </StudentsContainer>
    )
  }

  const SubjectDetailsSection = () => {
    const numberOfStudents = sclassStudents.length;

    return (
      <DetailsContainer>
        <HeaderCard>
          <HeaderIcon>
            <SubjectIcon />
          </HeaderIcon>
          <HeaderContent>
            <HeaderTitle>Subject Details</HeaderTitle>
            <HeaderSubtitle>Comprehensive information about this subject</HeaderSubtitle>
          </HeaderContent>
        </HeaderCard>

        <DetailsGrid>
          <DetailCard>
            <DetailIcon>
              <SubjectIcon />
            </DetailIcon>
            <DetailContent>
              <DetailLabel>Subject Name</DetailLabel>
              <DetailValue>{subjectDetails && subjectDetails.subName}</DetailValue>
            </DetailContent>
          </DetailCard>

          <DetailCard>
            <DetailIcon>
              <AssignmentIcon />
            </DetailIcon>
            <DetailContent>
              <DetailLabel>Subject Code</DetailLabel>
              <DetailValue>{subjectDetails && subjectDetails.subCode}</DetailValue>
            </DetailContent>
          </DetailCard>

          <DetailCard>
            <DetailIcon>
              <AssessmentIcon />
            </DetailIcon>
            <DetailContent>
              <DetailLabel>Subject Sessions</DetailLabel>
              <DetailValue>{subjectDetails && subjectDetails.sessions}</DetailValue>
            </DetailContent>
          </DetailCard>

          <DetailCard>
            <DetailIcon>
              <PeopleIcon />
            </DetailIcon>
            <DetailContent>
              <DetailLabel>Number of Students</DetailLabel>
              <DetailValue>{numberOfStudents}</DetailValue>
            </DetailContent>
          </DetailCard>

          <DetailCard>
            <DetailIcon>
              <SubjectIcon />
            </DetailIcon>
            <DetailContent>
              <DetailLabel>Class Name</DetailLabel>
              <DetailValue>{subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}</DetailValue>
            </DetailContent>
          </DetailCard>

          {subjectDetails && subjectDetails.teacher ? (
            <DetailCard>
              <DetailIcon>
                <PeopleIcon />
              </DetailIcon>
              <DetailContent>
                <DetailLabel>Teacher Name</DetailLabel>
                <DetailValue>{subjectDetails.teacher.name}</DetailValue>
              </DetailContent>
            </DetailCard>
          ) : (
            <DetailCard>
              <DetailIcon>
                <AddIcon />
              </DetailIcon>
              <DetailContent>
                <DetailLabel>Teacher Assignment</DetailLabel>
                <AddTeacherButton
                  onClick={() => navigate("/Admin/teachers/addteacher/" + subjectDetails._id)}
                  startIcon={<AddIcon />}
                >
                  Add Subject Teacher
                </AddTeacherButton>
              </DetailContent>
            </DetailCard>
          )}
        </DetailsGrid>
      </DetailsContainer>
    );
  }

  return (
    <Container>
      {subloading ? (
        <LoadingCard>
          <LoadingText>Loading subject details...</LoadingText>
        </LoadingCard>
      ) : (
        <ContentWrapper>
          <StyledTabContext value={value}>
            <StyledTabList onChange={handleChange}>
              <StyledTab label="Details" value="1" />
              <StyledTab label="Students" value="2" />
            </StyledTabList>
            
            <TabPanelContainer>
              <StyledTabPanel value="1">
                <SubjectDetailsSection />
              </StyledTabPanel>
              <StyledTabPanel value="2">
                <SubjectStudentsSection />
              </StyledTabPanel>
            </TabPanelContainer>
          </StyledTabContext>
        </ContentWrapper>
      )}
    </Container>
  )
}

export default ViewSubject

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 24px;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const LoadingCard = styled(Card)`
  && {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 48px;
    text-align: center;
    margin: 0 auto;
    max-width: 400px;
  }
`;

const LoadingText = styled(Typography)`
  && {
    font-size: 18px;
    color: #64748b;
    font-weight: 500;
  }
`;

const StyledTabContext = styled(TabContext)`
  && {
    .MuiTabs-root {
      background: white;
      border-radius: 16px 16px 0 0;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
  }
`;

const StyledTabList = styled(TabList)`
  && {
    position: sticky;
    top: 0;
    z-index: 10;
    background: white;
    border-radius: 16px 16px 0 0;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    
    .MuiTab-root {
      font-weight: 600;
      text-transform: none;
      font-size: 16px;
      min-height: 64px;
      
      &.Mui-selected {
        color: #7f56da;
      }
    }
    
    .MuiTabs-indicator {
      background-color: #7f56da;
      height: 3px;
    }
  }
`;

const StyledTab = styled(Tab)`
  && {
    color: #64748b;
    font-weight: 600;
    text-transform: none;
    font-size: 16px;
    
    &.Mui-selected {
      color: #7f56da;
    }
  }
`;

const TabPanelContainer = styled.div`
  background: white;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const StyledTabPanel = styled(TabPanel)`
  && {
    padding: 32px;
  }
`;

const DetailsContainer = styled.div``;

const HeaderCard = styled(Card)`
  && {
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    color: white;
    border-radius: 16px;
    margin-bottom: 24px;
    overflow: hidden;
  }
`;

const HeaderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  
  .MuiSvgIcon-root {
    font-size: 28px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
`;

const HeaderTitle = styled(Typography)`
  && {
    font-size: 28px;
    font-weight: 700;
    color: white;
    margin-bottom: 8px;
  }
`;

const HeaderSubtitle = styled(Typography)`
  && {
    font-size: 16px;
    opacity: 0.9;
    color: white;
  }
`;

const DetailsGrid = styled(Grid)`
  && {
    gap: 16px;
  }
`;

const DetailCard = styled(Card)`
  && {
    background: #f8fafc;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
    
    &:hover {
      background: #f1f5f9;
      border-color: #cbd5e1;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
`;

const DetailIcon = styled.div`
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

const DetailContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
`;

const DetailLabel = styled(Typography)`
  && {
    font-size: 14px;
    color: #64748b;
    font-weight: 500;
    margin-bottom: 4px;
  }
`;

const DetailValue = styled(Typography)`
  && {
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
  }
`;

const AddTeacherButton = styled.button`
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 600;
  text-transform: none;
  font-size: 14px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(127, 86, 218, 0.3);
  }
`;

const StudentsContainer = styled.div``;

const SectionHeader = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled(Typography)`
  && {
    font-size: 24px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 8px;
  }
`;

const SectionSubtitle = styled(Typography)`
  && {
    font-size: 16px;
    color: #64748b;
  }
`;

const ContentCard = styled(Card)`
  && {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 80px;
  }
`;

const EmptyStateCard = styled(Card)`
  && {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 48px;
    text-align: center;
    max-width: 500px;
    margin: 0 auto;
  }
`;

const EmptyStateIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  color: white;
  margin: 0 auto 24px;
  
  .MuiSvgIcon-root {
    font-size: 40px;
  }
`;

const EmptyStateTitle = styled(Typography)`
  && {
    font-size: 24px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 12px;
  }
`;

const EmptyStateSubtitle = styled(Typography)`
  && {
    font-size: 16px;
    color: #64748b;
    margin-bottom: 32px;
    line-height: 1.6;
  }
`;

const AddStudentsButton = styled.button`
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 600;
  text-transform: none;
  font-size: 16px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(127, 86, 218, 0.3);
  }
`;

const StyledBottomNavigation = styled(BottomNavigation)`
  && {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 16px 16px 0 0;
    
    .MuiBottomNavigationAction-root {
      color: #64748b;
      
      &.Mui-selected {
        color: #7f56da;
      }
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ViewButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-weight: 600;
  text-transform: none;
  font-size: 12px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
`;

const AttendanceButton = styled.button`
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-weight: 600;
  text-transform: none;
  font-size: 12px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(127, 86, 218, 0.3);
  }
`;

const MarksButton = styled.button`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-weight: 600;
  text-transform: none;
  font-size: 12px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  }
`;