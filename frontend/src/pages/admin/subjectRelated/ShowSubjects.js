import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
    Paper, IconButton, Typography, Card
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import TableTemplate from '../../../components/TableTemplate';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';
import styled from 'styled-components';
import SubjectIcon from '@mui/icons-material/Subject';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ShowSubjects = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getSubjectList(currentUser._id, "AllSubjects"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true)

        // dispatch(deleteUser(deleteID, address))
        //     .then(() => {
        //         dispatch(getSubjectList(currentUser._id, "AllSubjects"));
        //     })
    }

    const subjectColumns = [
        { id: 'subName', label: 'Subject Name', minWidth: 170 },
        { id: 'sessions', label: 'Sessions', minWidth: 170 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ]

    const subjectRows = subjectsList.map((subject) => {
        return {
            subName: subject.subName,
            sessions: subject.sessions,
            sclassName: subject.sclassName.sclassName,
            sclassID: subject.sclassName._id,
            id: subject._id,
        };
    })

    const SubjectsButtonHaver = ({ row }) => {
        return (
            <ActionButtons>
                <DeleteButton onClick={() => deleteHandler(row.id, "Subject")}>
                    <DeleteIcon />
                </DeleteButton>
                <ViewButton
                    variant="contained"
                    onClick={() => navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)}
                    startIcon={<VisibilityIcon />}
                >
                    View
                </ViewButton>
            </ActionButtons>
        );
    };

    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate("/Admin/subjects/chooseclass")
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
            action: () => deleteHandler(currentUser._id, "Subjects")
        }
    ];

    return (
        <Container>
            <HeaderSection>
                <HeaderContent>
                    <HeaderIcon>
                        <SubjectIcon />
                    </HeaderIcon>
                    <HeaderText>
                        <HeaderTitle>Subjects Management</HeaderTitle>
                        <HeaderSubtitle>Manage your school subjects and their details</HeaderSubtitle>
                    </HeaderText>
                </HeaderContent>
            </HeaderSection>

            {loading ? (
                <LoadingCard>
                    <LoadingText>Loading subjects...</LoadingText>
                </LoadingCard>
            ) : (
                <>
                    {response ? (
                        <EmptyStateCard>
                            <EmptyStateIcon>
                                <SubjectIcon />
                            </EmptyStateIcon>
                            <EmptyStateTitle>No Subjects Found</EmptyStateTitle>
                            <EmptyStateSubtitle>
                                You haven't added any subjects yet. Add your first subject to get started.
                            </EmptyStateSubtitle>
                            <AddSubjectButton
                                variant="contained"
                                onClick={() => navigate("/Admin/subjects/chooseclass")}
                                startIcon={<AddIcon />}
                            >
                                Add Subjects
                            </AddSubjectButton>
                        </EmptyStateCard>
                    ) : (
                        <>
                            {Array.isArray(subjectsList) && subjectsList.length > 0 ? (
                                <ContentCard>
                                    <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                                </ContentCard>
                            ) : (
                                <EmptyStateCard>
                                    <EmptyStateIcon>
                                        <SubjectIcon />
                                    </EmptyStateIcon>
                                    <EmptyStateTitle>No Subjects Available</EmptyStateTitle>
                                    <EmptyStateSubtitle>
                                        Create your first subject to start managing your curriculum.
                                    </EmptyStateSubtitle>
                                    <AddSubjectButton
                                        variant="contained"
                                        onClick={() => navigate("/Admin/subjects/chooseclass")}
                                        startIcon={<AddIcon />}
                                    >
                                        Add Subjects
                                    </AddSubjectButton>
                                </EmptyStateCard>
                            )}
                        </>
                    )}
                </>
            )}
            <SpeedDialTemplate actions={actions} />
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

export default ShowSubjects;

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

const ContentCard = styled(Paper)`
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

const AddSubjectButton = styled.button`
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

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DeleteButton = styled(IconButton)`
  && {
    color: #ef4444;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #fef2f2;
      transform: scale(1.1);
    }
  }
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