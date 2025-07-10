import React from 'react'
import styled from 'styled-components';
import { Card, CardContent, Typography, Avatar, Box, Chip } from '@mui/material';
import { useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import ClassIcon from '@mui/icons-material/Class';
import SubjectIcon from '@mui/icons-material/Subject';
import SchoolIcon from '@mui/icons-material/School';

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const teachSclass = currentUser.teachSclass
  const teachSubject = currentUser.teachSubject
  const teachSchool = currentUser.school

  return (
    <ProfileContainer>
      <ProfileHeader>
        <AvatarSection>
          <ProfileAvatar>
            <PersonIcon />
          </ProfileAvatar>
          <TeacherInfo>
            <TeacherName>{currentUser.name}</TeacherName>
            <TeacherRole>Teacher</TeacherRole>
          </TeacherInfo>
        </AvatarSection>
      </ProfileHeader>

      <ProfileCard>
        <CardHeader>
          <Typography variant="h5" component="h2" sx={{ 
            fontWeight: 600, 
            color: '#1a1a1a',
            mb: 1
          }}>
            Profile Information
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Your teaching details and preferences
          </Typography>
        </CardHeader>

        <ProfileDetails>
          <DetailItem>
            <DetailIcon>
              <EmailIcon />
            </DetailIcon>
            <DetailContent>
              <DetailLabel>Email Address</DetailLabel>
              <DetailValue>{currentUser.email}</DetailValue>
            </DetailContent>
          </DetailItem>

          <DetailItem>
            <DetailIcon>
              <ClassIcon />
            </DetailIcon>
            <DetailContent>
              <DetailLabel>Assigned Class</DetailLabel>
              <DetailValue>
                {teachSclass?.sclassName || 'Not Assigned'}
                <ClassChip label="Active" color="primary" size="small" />
              </DetailValue>
            </DetailContent>
          </DetailItem>

          <DetailItem>
            <DetailIcon>
              <SubjectIcon />
            </DetailIcon>
            <DetailContent>
              <DetailLabel>Teaching Subject</DetailLabel>
              <DetailValue>
                {teachSubject?.subName || 'Not Assigned'}
                <SubjectChip label="Primary" color="secondary" size="small" />
              </DetailValue>
            </DetailContent>
          </DetailItem>

          <DetailItem>
            <DetailIcon>
              <SchoolIcon />
            </DetailIcon>
            <DetailContent>
              <DetailLabel>School</DetailLabel>
              <DetailValue>{teachSchool?.schoolName || 'Not Assigned'}</DetailValue>
            </DetailContent>
          </DetailItem>
        </ProfileDetails>
      </ProfileCard>
    </ProfileContainer>
  )
}

export default TeacherProfile

const ProfileContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 24px;
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const ProfileAvatar = styled(Avatar)`
  && {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    font-size: 48px;
    box-shadow: 0 8px 32px rgba(127, 86, 218, 0.3);
  }
`;

const TeacherInfo = styled.div`
  text-align: center;
`;

const TeacherName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 4px 0;
`;

const TeacherRole = styled.p`
  font-size: 1.1rem;
  color: #7f56da;
  font-weight: 600;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProfileCard = styled(Card)`
  && {
    max-width: 600px;
    margin: 0 auto;
    border-radius: 16px;
    background: white;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(127, 86, 218, 0.1);
    overflow: hidden;
  }
`;

const CardHeader = styled(CardContent)`
  && {
    padding: 32px 32px 24px;
    text-align: center;
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    color: white;
    
    .MuiTypography-h5 {
      color: white;
    }
    
    .MuiTypography-body2 {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;

const ProfileDetails = styled(CardContent)`
  && {
    padding: 32px;
  }
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  
  &:first-child {
    padding-top: 0;
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
  flex-shrink: 0;
  
  .MuiSvgIcon-root {
    font-size: 24px;
  }
`;

const DetailContent = styled.div`
  flex: 1;
`;

const DetailLabel = styled(Typography)`
  && {
    font-size: 0.875rem;
    color: #666;
    font-weight: 500;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const DetailValue = styled(Typography)`
  && {
    font-size: 1.125rem;
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

const SubjectChip = styled(Chip)`
  && {
    background: linear-gradient(135deg, #9c6ade 0%, #b794f4 100%);
    color: white;
    font-weight: 600;
    height: 24px;
  }
`;