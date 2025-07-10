import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    Paper, Box, IconButton, Typography, Card, CardContent
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllNotices } from '../../../redux/noticeRelated/noticeHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import TableTemplate from '../../../components/TableTemplate';
import { GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import styled from 'styled-components';
import NotificationsIcon from '@mui/icons-material/Notifications';

const ShowNotices = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllNotices(currentUser._id, "Notice"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getAllNotices(currentUser._id, "Notice"));
            })
    }

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = noticesList && noticesList.length > 0 && noticesList.map((notice) => {
        const date = new Date(notice.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            title: notice.title,
            details: notice.details,
            date: dateString,
            id: notice._id,
        };
    });

    const NoticeButtonHaver = ({ row }) => {
        return (
            <ActionButtons>
                <IconButton onClick={() => deleteHandler(row.id, "Notice")}>
                    <DeleteIcon color="error" />
                </IconButton>
            </ActionButtons>
        );
    };

    const actions = [
        {
            icon: <NoteAddIcon color="primary" />, name: 'Add New Notice',
            action: () => navigate("/Admin/addnotice")
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Notices',
            action: () => deleteHandler(currentUser._id, "Notices")
        }
    ];

    return (
        <Container>
            {loading ? (
                <LoadingContainer>
                    <LoadingSpinner />
                    <LoadingText>Loading notices...</LoadingText>
                </LoadingContainer>
            ) : (
                <>
                    {response ? (
                        <EmptyState>
                            <EmptyIcon>📢</EmptyIcon>
                            <EmptyTitle>No Notices Available</EmptyTitle>
                            <EmptyText>You haven't published any notices yet. Start by creating your first notice.</EmptyText>
                            <GreenButton variant="contained" onClick={() => navigate("/Admin/addnotice")}>
                                Add Notice
                            </GreenButton>
                        </EmptyState>
                    ) : (
                        <>
                            <HeaderSection>
                                <HeaderContent>
                                    <HeaderIcon>
                                        <NotificationsIcon />
                                    </HeaderIcon>
                                    <HeaderText>
                                        <HeaderTitle>Notices Management</HeaderTitle>
                                        <HeaderSubtitle>Manage all published notices</HeaderSubtitle>
                                    </HeaderText>
                                </HeaderContent>
                                <StatsCard>
                                    <StatsContent>
                                        <StatNumber>{noticesList?.length || 0}</StatNumber>
                                        <StatLabel>Total Notices</StatLabel>
                                    </StatsContent>
                                </StatsCard>
                            </HeaderSection>

                            <ContentSection>
                                {Array.isArray(noticesList) && noticesList.length > 0 && (
                                    <TableContainer>
                                        <TableTemplate buttonHaver={NoticeButtonHaver} columns={noticeColumns} rows={noticeRows} />
                                    </TableContainer>
                                )}
                                <SpeedDialTemplate actions={actions} />
                            </ContentSection>
                        </>
                    )}
                </>
            )}
        </Container>
    );
};

export default ShowNotices;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 24px;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  gap: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
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
    font-size: 28px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 4px;
  }
`;

const HeaderSubtitle = styled(Typography)`
  && {
    font-size: 16px;
    color: #64748b;
  }
`;

const StatsCard = styled(Card)`
  && {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    min-width: 120px;
  }
`;

const StatsContent = styled(CardContent)`
  && {
    text-align: center;
    padding: 16px 24px;
  }
`;

const StatNumber = styled(Typography)`
  && {
    font-size: 32px;
    font-weight: 700;
    color: #7f56da;
    margin-bottom: 4px;
  }
`;

const StatLabel = styled(Typography)`
  && {
    font-size: 14px;
    color: #64748b;
    font-weight: 500;
  }
`;

const ContentSection = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableContainer = styled.div`
  padding: 24px;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 64px 24px;
`;

const EmptyIcon = styled.div`
  font-size: 80px;
  margin-bottom: 24px;
  opacity: 0.6;
`;

const EmptyTitle = styled(Typography)`
  && {
    font-size: 28px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 12px;
  }
`;

const EmptyText = styled(Typography)`
  && {
    font-size: 16px;
    color: #64748b;
    margin-bottom: 32px;
    max-width: 400px;
    line-height: 1.5;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 16px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #7f56da;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled(Typography)`
  && {
    color: #64748b;
    font-weight: 500;
    font-size: 16px;
  }
`;