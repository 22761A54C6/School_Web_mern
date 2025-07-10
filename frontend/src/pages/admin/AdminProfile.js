import { useSelector } from 'react-redux';
import { Typography, Card, CardContent, Avatar, Box, Grid, Chip } from '@mui/material';
import styled from 'styled-components';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const AdminProfile = () => {
        const { currentUser } = useSelector((state) => state.user);

    return (
        <Container>
            <HeaderSection>
                <HeaderContent>
                    <HeaderIcon>
                        <AdminPanelSettingsIcon />
                    </HeaderIcon>
                    <HeaderText>
                        <HeaderTitle>Admin Profile</HeaderTitle>
                        <HeaderSubtitle>Manage your account information</HeaderSubtitle>
                    </HeaderText>
                </HeaderContent>
            </HeaderSection>

            <ProfileCard>
                <CardContent>
                    <ProfileHeader>
                        <AvatarSection>
                            <StyledAvatar>
                                <PersonIcon />
                            </StyledAvatar>
                            <RoleChip label="Administrator" color="primary" />
                        </AvatarSection>
                        
                        <ProfileInfo>
                            <InfoGrid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <InfoCard>
                                        <InfoIcon>
                                            <PersonIcon />
                                        </InfoIcon>
                                        <InfoContent>
                                            <InfoLabel>Full Name</InfoLabel>
                                            <InfoValue>{currentUser.name}</InfoValue>
                                        </InfoContent>
                                    </InfoCard>
                                </Grid>
                                
                                <Grid item xs={12} md={6}>
                                    <InfoCard>
                                        <InfoIcon>
                                            <EmailIcon />
                                        </InfoIcon>
                                        <InfoContent>
                                            <InfoLabel>Email Address</InfoLabel>
                                            <InfoValue>{currentUser.email}</InfoValue>
                                        </InfoContent>
                                    </InfoCard>
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <InfoCard>
                                        <InfoIcon>
                                            <SchoolIcon />
                                        </InfoIcon>
                                        <InfoContent>
                                            <InfoLabel>School Name</InfoLabel>
                                            <InfoValue>{currentUser.schoolName}</InfoValue>
                                        </InfoContent>
                                    </InfoCard>
                                </Grid>
                            </InfoGrid>
                        </ProfileInfo>
                    </ProfileHeader>
                </CardContent>
            </ProfileCard>
        </Container>
    )
}

export default AdminProfile

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

const ProfileCard = styled(Card)`
  && {
    background: white;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
`;

const ProfileHeader = styled.div`
  padding: 32px;
`;

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;

const StyledAvatar = styled(Avatar)`
  && {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    font-size: 40px;
  }
`;

const RoleChip = styled(Chip)`
  && {
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    color: white;
    font-weight: 600;
    padding: 8px 16px;
  }
`;

const ProfileInfo = styled.div``;

const InfoGrid = styled(Grid)`
  && {
    margin-top: 16px;
  }
`;

const InfoCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
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

const InfoIcon = styled.div`
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

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled(Typography)`
  && {
    font-size: 14px;
    color: #64748b;
    font-weight: 500;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const InfoValue = styled(Typography)`
  && {
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
  }
`;