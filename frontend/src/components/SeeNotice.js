import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotices } from '../redux/noticeRelated/noticeHandle';
import { Paper, CircularProgress, Typography } from '@mui/material';
import TableViewTemplate from './TableViewTemplate';
import styled from 'styled-components';

const SeeNotice = () => {
    const dispatch = useDispatch();

    const { currentUser, currentRole } = useSelector(state => state.user);
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);

    useEffect(() => {
        if (currentUser && currentRole === "Admin") {
            dispatch(getAllNotices(currentUser._id, "Notice"));
        }
        else if (currentUser && currentUser.school) {
            dispatch(getAllNotices(currentUser.school._id, "Notice"));
        }
    }, [dispatch, currentRole, currentUser]);

    if (error) {
        console.log(error);
    }

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = (Array.isArray(noticesList) ? noticesList : []).filter(notice => notice && notice._id).map((notice) => {
        const date = new Date(notice.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            title: notice.title || '',
            details: notice.details || '',
            date: dateString,
            id: notice._id,
        };
    });

    return (
        <Container>
            {loading ? (
                <LoadingContainer>
                    <CircularProgress size={40} style={{ color: '#7f56da' }} />
                    <LoadingText>Loading notices...</LoadingText>
                </LoadingContainer>
            ) : response ? (
                <EmptyContainer>
                    <EmptyIcon>📢</EmptyIcon>
                    <EmptyTitle>No Notices Available</EmptyTitle>
                    <EmptyText>There are no notices to display at the moment. Check back later for updates.</EmptyText>
                </EmptyContainer>
            ) : (
                <>
                    <HeaderContainer>
                        <Title>Notices</Title>
                        <Subtitle>Stay updated with the latest announcements and important information</Subtitle>
                    </HeaderContainer>
                    <StyledPaper elevation={3}>
                        {Array.isArray(noticesList) && noticesList.length > 0 &&
                            <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
                        }
                    </StyledPaper>
                </>
            )}
        </Container>
    )
}

export default SeeNotice

const Container = styled.div`
  margin: 32px 24px;
  min-height: calc(100vh - 100px);
`;

const HeaderContainer = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #550080;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0;
  font-weight: 400;
`;

const StyledPaper = styled(Paper)`
  && {
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(127, 86, 218, 0.1);
    border: 1px solid rgba(127, 86, 218, 0.05);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 16px;
`;

const LoadingText = styled(Typography)`
  && {
    color: #6c757d;
    font-weight: 500;
    font-size: 16px;
  }
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  padding: 48px 24px;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
  opacity: 0.6;
`;

const EmptyTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #550080;
  margin: 0 0 12px 0;
`;

const EmptyText = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin: 0;
  max-width: 400px;
  line-height: 1.5;
`;