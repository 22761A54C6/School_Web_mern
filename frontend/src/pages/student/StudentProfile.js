import React from 'react'
import styled from 'styled-components';
import { Card, Typography, Grid, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BadgeIcon from '@mui/icons-material/Badge';

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const sclassName = currentUser.sclassName
  const studentSchool = currentUser.school

  return (
    <PageContainer>
      <ProfileCard>
        <ProfileHeader>
          <ProfileAvatar>
            <Avatar alt="Student Avatar" sx={{ width: 120, height: 120, fontSize: '48px', boxShadow: '0 8px 25px rgba(127, 86, 218, 0.3)' }}>
              {String(currentUser.name).charAt(0)}
            </Avatar>
          </ProfileAvatar>
          <ProfileInfo>
            <ProfileName>{currentUser.name}</ProfileName>
            <ProfileRole>Student</ProfileRole>
            <ProfileStatus>Active Student</ProfileStatus>
          </ProfileInfo>
        </ProfileHeader>

        <ProfileDetails>
          <DetailsGrid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <DetailCard>
                <DetailIcon>
                  <BadgeIcon />
                </DetailIcon>
                <DetailContent>
                  <DetailLabel>Roll Number</DetailLabel>
                  <DetailValue>{currentUser.rollNum}</DetailValue>
                </DetailContent>
              </DetailCard>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <DetailCard>
                <DetailIcon>
                  <ClassIcon />
                </DetailIcon>
                <DetailContent>
                  <DetailLabel>Current Class</DetailLabel>
                  <DetailValue>{sclassName.sclassName}</DetailValue>
                </DetailContent>
              </DetailCard>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <DetailCard>
                <DetailIcon>
                  <SchoolIcon />
                </DetailIcon>
                <DetailContent>
                  <DetailLabel>School</DetailLabel>
                  <DetailValue>{studentSchool.schoolName}</DetailValue>
                </DetailContent>
              </DetailCard>
            </Grid>
          </DetailsGrid>
        </ProfileDetails>
      </ProfileCard>

      <PersonalInfoCard>
        <PersonalInfoHeader>
          <PersonalInfoIcon>
            <PersonIcon />
          </PersonalInfoIcon>
          <PersonalInfoTitle>Personal Information</PersonalInfoTitle>
        </PersonalInfoHeader>

        <PersonalInfoGrid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InfoItem>
              <InfoIcon>
                <CalendarTodayIcon />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Date of Birth</InfoLabel>
                <InfoValue>January 1, 2000</InfoValue>
              </InfoContent>
            </InfoItem>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InfoItem>
              <InfoIcon>
                <PersonIcon />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Gender</InfoLabel>
                <InfoValue>Male</InfoValue>
              </InfoContent>
            </InfoItem>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InfoItem>
              <InfoIcon>
                <EmailIcon />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Email</InfoLabel>
                <InfoValue>john.doe@example.com</InfoValue>
              </InfoContent>
            </InfoItem>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InfoItem>
              <InfoIcon>
                <PhoneIcon />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Phone</InfoLabel>
                <InfoValue>(123) 456-7890</InfoValue>
              </InfoContent>
            </InfoItem>
          </Grid>

          <Grid item xs={12}>
            <InfoItem>
              <InfoIcon>
                <LocationOnIcon />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Address</InfoLabel>
                <InfoValue>123 Main Street, City, Country</InfoValue>
              </InfoContent>
            </InfoItem>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InfoItem>
              <InfoIcon>
                <ContactPhoneIcon />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Emergency Contact</InfoLabel>
                <InfoValue>(987) 654-3210</InfoValue>
              </InfoContent>
            </InfoItem>
          </Grid>
        </PersonalInfoGrid>
      </PersonalInfoCard>
    </PageContainer>
  )
}

export default StudentProfile

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24px;
  animation: fadeIn 0.5s ease-in-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ProfileCard = styled(Card)`
  && {
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 24px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    }
  }
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  color: white;
  padding: 32px 24px;
  display: flex;
  align-items: center;
  gap: 24px;
`;

const ProfileAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileInfo = styled.div``;

const ProfileName = styled(Typography)`
  && {
    font-size: 32px;
    font-weight: 700;
    color: white;
    margin-bottom: 8px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const ProfileRole = styled(Typography)`
  && {
    font-size: 16px;
    opacity: 0.9;
    color: white;
    margin-bottom: 8px;
  }
`;

const ProfileStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  color: white;
`;

const ProfileDetails = styled.div`
  padding: 32px 24px;
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
    height: 100%;
    
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

const PersonalInfoCard = styled(Card)`
  && {
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    }
  }
`;

const PersonalInfoHeader = styled.div`
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  color: white;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const PersonalInfoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  
  .MuiSvgIcon-root {
    font-size: 24px;
  }
`;

const PersonalInfoTitle = styled(Typography)`
  && {
    font-size: 24px;
    font-weight: 700;
    color: white;
  }
`;

const PersonalInfoGrid = styled(Grid)`
  && {
    padding: 32px 24px;
  }
`;

const InfoItem = styled(Card)`
  && {
    background: #f8fafc;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
    height: 100%;
    
    &:hover {
      background: #f1f5f9;
      border-color: #cbd5e1;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
`;

const InfoIcon = styled.div`
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

const InfoContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
`;

const InfoLabel = styled(Typography)`
  && {
    font-size: 14px;
    color: #64748b;
    font-weight: 500;
    margin-bottom: 4px;
  }
`;

const InfoValue = styled(Typography)`
  && {
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
  }
`;