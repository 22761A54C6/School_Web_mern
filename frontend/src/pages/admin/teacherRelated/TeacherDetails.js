import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, Card, CardContent, Avatar, Chip } from '@mui/material';
import styled from 'styled-components';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import SubjectIcon from '@mui/icons-material/Subject';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <PageContainer>
            <HeaderSection>
                <BackButton onClick={() => navigate("/Admin/teachers")}>
                    <ArrowBackIcon />
                    Back to Teachers
                </BackButton>
                
                <HeaderContent>
                    <HeaderIcon>
                        <PersonIcon />
                    </HeaderIcon>
                    <HeaderText>
                        <HeaderTitle>Teacher Details</HeaderTitle>
                        <HeaderSubtitle>View and manage teacher information</HeaderSubtitle>
                    </HeaderText>
                </HeaderContent>
            </HeaderSection>

            {loading ? (
                <LoadingCard>
                    <LoadingText>Loading teacher details...</LoadingText>
                </LoadingCard>
            ) : (
                <DetailsCard>
                    <CardContent>
                        <TeacherHeader>
                            <TeacherAvatar>
                                <PersonIcon />
                            </TeacherAvatar>
                            <TeacherInfo>
                                <TeacherName>{teacherDetails?.name}</TeacherName>
                                <TeacherRole>Teaching Staff</TeacherRole>
                            </TeacherInfo>
                        </TeacherHeader>

                        <DetailsGrid>
                            <DetailCard>
                                <DetailIcon>
                                    <SchoolIcon />
                                </DetailIcon>
                                <DetailContent>
                                    <DetailLabel>Class Assignment</DetailLabel>
                                    <DetailValue>{teacherDetails?.teachSclass?.sclassName}</DetailValue>
                                </DetailContent>
                            </DetailCard>

                            {isSubjectNamePresent ? (
                                <>
                                    <DetailCard>
                                        <DetailIcon>
                                            <SubjectIcon />
                                        </DetailIcon>
                                        <DetailContent>
                                            <DetailLabel>Subject Teaching</DetailLabel>
                                            <DetailValue>{teacherDetails?.teachSubject?.subName}</DetailValue>
                                        </DetailContent>
                                    </DetailCard>

                                    <DetailCard>
                                        <DetailIcon>
                                            <SubjectIcon />
                                        </DetailIcon>
                                        <DetailContent>
                                            <DetailLabel>Subject Sessions</DetailLabel>
                                            <DetailValue>{teacherDetails?.teachSubject?.sessions}</DetailValue>
                                        </DetailContent>
                                    </DetailCard>
                                </>
                            ) : (
                                <NoSubjectCard>
                                    <NoSubjectIcon>
                                        <SubjectIcon />
                                    </NoSubjectIcon>
                                    <NoSubjectContent>
                                        <NoSubjectTitle>No Subject Assigned</NoSubjectTitle>
                                        <NoSubjectSubtitle>
                                            This teacher doesn't have a subject assigned yet.
                                        </NoSubjectSubtitle>
                                        <AddSubjectButton
                                            variant="contained"
                                            onClick={handleAddSubject}
                                            startIcon={<AddIcon />}
                                        >
                                            Assign Subject
                                        </AddSubjectButton>
                                    </NoSubjectContent>
                                </NoSubjectCard>
                            )}
                        </DetailsGrid>
                    </CardContent>
                </DetailsCard>
            )}
        </PageContainer>
    );
};

export default TeacherDetails;

const PageContainer = styled.div`
  padding: 24px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const HeaderSection = styled.div`
  margin-bottom: 32px;
`;

const BackButton = styled(Button)`
  && {
    color: #64748b;
    font-weight: 600;
    text-transform: none;
    font-size: 16px;
    margin-bottom: 16px;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #f8fafc;
      color: #475569;
    }
  }
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

const LoadingCard = styled(Card)`
  && {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 48px;
    text-align: center;
  }
`;

const LoadingText = styled(Typography)`
  && {
    font-size: 18px;
    color: #64748b;
    font-weight: 500;
  }
`;

const DetailsCard = styled(Card)`
  && {
    background: white;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
`;

const TeacherHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 32px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid #e2e8f0;
`;

const TeacherAvatar = styled(Avatar)`
  && {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    font-size: 40px;
  }
`;

const TeacherInfo = styled.div``;

const TeacherName = styled(Typography)`
  && {
    font-size: 28px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 8px;
  }
`;

const TeacherRole = styled(Chip)`
  && {
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    color: white;
    font-weight: 600;
    padding: 4px 12px;
  }
`;

const DetailsGrid = styled.div`
  padding: 32px;
  display: grid;
  gap: 24px;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

const DetailCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
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
  flex: 1;
`;

const DetailLabel = styled(Typography)`
  && {
    font-size: 14px;
    color: #64748b;
    font-weight: 500;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const DetailValue = styled(Typography)`
  && {
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
  }
`;

const NoSubjectCard = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 32px;
  background: #fef3c7;
  border-radius: 12px;
  border: 1px solid #f59e0b;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const NoSubjectIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  
  .MuiSvgIcon-root {
    font-size: 30px;
  }
`;

const NoSubjectContent = styled.div`
  flex: 1;
`;

const NoSubjectTitle = styled(Typography)`
  && {
    font-size: 20px;
    font-weight: 700;
    color: #92400e;
    margin-bottom: 8px;
  }
`;

const NoSubjectSubtitle = styled(Typography)`
  && {
    font-size: 16px;
    color: #a16207;
    margin-bottom: 16px;
  }
`;

const AddSubjectButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    border-radius: 8px;
    padding: 8px 16px;
    font-weight: 600;
    text-transform: none;
    font-size: 14px;
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
    }
  }
`;