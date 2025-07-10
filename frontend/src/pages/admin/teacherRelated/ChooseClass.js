import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, Card } from '@mui/material'
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate } from 'react-router-dom';
import TableTemplate from '../../../components/TableTemplate';
import styled from 'styled-components';
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ChooseClass = ({ situation }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllSclasses(currentUser._id, "Sclass"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error)
    }

    const navigateHandler = (classID) => {
        if (situation === "Teacher") {
            navigate("/Admin/teachers/choosesubject/" + classID)
        }
        else if (situation === "Subject") {
            navigate("/Admin/addsubject/" + classID)
        }
    }

    const sclassColumns = [
        { id: 'name', label: 'Class Name', minWidth: 170 },
    ]

    const sclassRows = sclassesList && sclassesList.length > 0 && sclassesList.map((sclass) => {
        return {
            name: sclass.sclassName,
            id: sclass._id,
        };
    })

    const SclassButtonHaver = ({ row }) => {
        return (
            <ChooseButton
                variant="contained"
                onClick={() => navigateHandler(row.id)}
                endIcon={<ArrowForwardIcon />}
            >
                Choose
            </ChooseButton>
        );
    };

    return (
        <Container>
            <HeaderSection>
                <HeaderContent>
                    <HeaderIcon>
                        <SchoolIcon />
                    </HeaderIcon>
                    <HeaderText>
                        <HeaderTitle>Choose a Class</HeaderTitle>
                        <HeaderSubtitle>
                            {situation === "Teacher" 
                                ? "Select a class to assign a teacher" 
                                : "Select a class to add subjects"}
                        </HeaderSubtitle>
                    </HeaderText>
                </HeaderContent>
            </HeaderSection>

            {loading ? (
                <LoadingCard>
                    <LoadingText>Loading classes...</LoadingText>
                </LoadingCard>
            ) : (
                <>
                    {getresponse ? (
                        <EmptyStateCard>
                            <EmptyStateIcon>
                                <SchoolIcon />
                            </EmptyStateIcon>
                            <EmptyStateTitle>No Classes Found</EmptyStateTitle>
                            <EmptyStateSubtitle>
                                You haven't created any classes yet. Create your first class to get started.
                            </EmptyStateSubtitle>
                            <AddClassButton
                                variant="contained"
                                onClick={() => navigate("/Admin/addclass")}
                                startIcon={<AddIcon />}
                            >
                                Add Class
                            </AddClassButton>
                        </EmptyStateCard>
                    ) : (
                        <>
                            {Array.isArray(sclassesList) && sclassesList.length > 0 ? (
                                <ContentCard>
                                    <TableTemplate 
                                        buttonHaver={SclassButtonHaver} 
                                        columns={sclassColumns} 
                                        rows={sclassRows} 
                                    />
                                </ContentCard>
                            ) : (
                                <EmptyStateCard>
                                    <EmptyStateIcon>
                                        <SchoolIcon />
                                    </EmptyStateIcon>
                                    <EmptyStateTitle>No Classes Available</EmptyStateTitle>
                                    <EmptyStateSubtitle>
                                        Create your first class to start managing your school.
                                    </EmptyStateSubtitle>
                                    <AddClassButton
                                        variant="contained"
                                        onClick={() => navigate("/Admin/addclass")}
                                        startIcon={<AddIcon />}
                                    >
                                        Add Class
                                    </AddClassButton>
                                </EmptyStateCard>
                            )}
                        </>
                    )}
                </>
            )}
        </Container>
    )
}

export default ChooseClass

const Container = styled.div`
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

const ContentCard = styled(Card)`
  && {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    overflow: hidden;
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

const AddClassButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    border-radius: 12px;
    padding: 12px 24px;
    font-weight: 600;
    text-transform: none;
    font-size: 16px;
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(127, 86, 218, 0.3);
    }
  }
`;

const ChooseButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    border-radius: 8px;
    padding: 8px 16px;
    font-weight: 600;
    text-transform: none;
    font-size: 14px;
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(127, 86, 218, 0.3);
    }
  }
`;