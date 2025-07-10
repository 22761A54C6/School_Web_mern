import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { BottomNavigation, BottomNavigationAction, Typography, Card, CardContent, Grid } from '@mui/material';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart'
import styled from 'styled-components';
import SubjectIcon from '@mui/icons-material/Subject';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import GradeIcon from '@mui/icons-material/Grade';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

const StudentSubjects = () => {
    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id])

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails])

    useEffect(() => {
        if (subjectMarks.length === 0) {
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        }
    }, [subjectMarks, dispatch, currentUser.sclassName._id]);

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <MarksContainer>
                <SectionHeader>
                    <SectionIcon>
                        <GradeIcon />
                    </SectionIcon>
                    <SectionContent>
                        <SectionTitle>Subject Marks</SectionTitle>
                        <SectionSubtitle>View your performance across all subjects</SectionSubtitle>
                    </SectionContent>
                </SectionHeader>

                <MarksGrid>
                    {subjectMarks.map((result, index) => {
                        if (!result.subName || !result.marksObtained) {
                            return null;
                        }
                        return (
                            <MarkCard key={index}>
                                <MarkCardContent>
                                    <SubjectInfo>
                                        <SubjectIcon />
                                        <SubjectName>{result.subName.subName}</SubjectName>
                                    </SubjectInfo>
                                    <MarkValue>{result.marksObtained}%</MarkValue>
                                </MarkCardContent>
                            </MarkCard>
                        );
                    })}
                </MarksGrid>
            </MarksContainer>
        );
    };

    const renderChartSection = () => {
        return (
            <ChartContainer>
                <SectionHeader>
                    <SectionIcon>
                        <InsertChartIcon />
                    </SectionIcon>
                    <SectionContent>
                        <SectionTitle>Performance Chart</SectionTitle>
                        <SectionSubtitle>Visual representation of your marks</SectionSubtitle>
                    </SectionContent>
                </SectionHeader>
                <ChartWrapper>
                    <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
                </ChartWrapper>
            </ChartContainer>
        );
    };

    const renderClassDetailsSection = () => {
        return (
            <ClassDetailsContainer>
                <HeaderCard>
                    <HeaderIcon>
                        <SchoolIcon />
                    </HeaderIcon>
                    <HeaderContent>
                        <HeaderTitle>Class Information</HeaderTitle>
                        <HeaderSubtitle>Your current academic details</HeaderSubtitle>
                    </HeaderContent>
                </HeaderCard>

                <ClassInfoCard>
                    <ClassInfoContent>
                        <ClassInfoItem>
                            <ClassInfoIcon>
                                <SchoolIcon />
                            </ClassInfoIcon>
                            <ClassInfoText>
                                <ClassInfoLabel>Current Class</ClassInfoLabel>
                                <ClassInfoValue>Class {sclassDetails && sclassDetails.sclassName}</ClassInfoValue>
                            </ClassInfoText>
                        </ClassInfoItem>

                        <SubjectsSection>
                            <SubjectsTitle>Your Subjects</SubjectsTitle>
                            <SubjectsGrid>
                                {subjectsList && subjectsList.map((subject, index) => (
                                    <SubjectCard key={index}>
                                        <SubjectCardContent>
                                            <SubjectCardIcon>
                                                <SubjectIcon />
                                            </SubjectCardIcon>
                                            <SubjectCardText>
                                                <SubjectCardName>{subject.subName}</SubjectCardName>
                                                <SubjectCardCode>{subject.subCode}</SubjectCardCode>
                                            </SubjectCardText>
                                        </SubjectCardContent>
                                    </SubjectCard>
                                ))}
                            </SubjectsGrid>
                        </SubjectsSection>
                    </ClassInfoContent>
                </ClassInfoCard>
            </ClassDetailsContainer>
        );
    };

    return (
        <Container>
            {loading ? (
                <LoadingCard>
                    <LoadingText>Loading your subjects...</LoadingText>
                </LoadingCard>
            ) : (
                <ContentWrapper>
                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 ? (
                        <>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}

                            <StyledBottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
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
                            </StyledBottomNavigation>
                        </>
                    ) : (
                        renderClassDetailsSection()
                    )}
                </ContentWrapper>
            )}
        </Container>
    );
};

export default StudentSubjects;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

const MarksContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 32px;
  margin-bottom: 80px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;

const SectionIcon = styled.div`
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

const SectionContent = styled.div``;

const SectionTitle = styled(Typography)`
  && {
    font-size: 28px;
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

const MarksGrid = styled(Grid)`
  && {
    gap: 16px;
  }
`;

const MarkCard = styled(Card)`
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

const MarkCardContent = styled(CardContent)`
  && {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
  }
`;

const SubjectInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SubjectName = styled(Typography)`
  && {
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
  }
`;

const MarkValue = styled(Typography)`
  && {
    font-size: 24px;
    font-weight: 700;
    color: #10b981;
  }
`;

const ChartContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 32px;
  margin-bottom: 80px;
`;

const ChartWrapper = styled.div`
  margin-top: 24px;
`;

const ClassDetailsContainer = styled.div``;

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

const ClassInfoCard = styled(Card)`
  && {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
`;

const ClassInfoContent = styled(CardContent)`
  && {
    padding: 32px;
  }
`;

const ClassInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;

const ClassInfoIcon = styled.div`
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

const ClassInfoText = styled.div``;

const ClassInfoLabel = styled(Typography)`
  && {
    font-size: 14px;
    color: #64748b;
    font-weight: 500;
    margin-bottom: 4px;
  }
`;

const ClassInfoValue = styled(Typography)`
  && {
    font-size: 20px;
    font-weight: 600;
    color: #1e293b;
  }
`;

const SubjectsSection = styled.div`
  margin-top: 32px;
`;

const SubjectsTitle = styled(Typography)`
  && {
    font-size: 20px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 16px;
  }
`;

const SubjectsGrid = styled(Grid)`
  && {
    gap: 16px;
  }
`;

const SubjectCard = styled(Card)`
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

const SubjectCardContent = styled(CardContent)`
  && {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
  }
`;

const SubjectCardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  color: white;
  
  .MuiSvgIcon-root {
    font-size: 20px;
  }
`;

const SubjectCardText = styled.div``;

const SubjectCardName = styled(Typography)`
  && {
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 4px;
  }
`;

const SubjectCardCode = styled(Typography)`
  && {
    font-size: 14px;
    color: #64748b;
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