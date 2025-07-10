import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LightPurpleButton } from '../components/buttonStyles';
import SchoolIcon from '@mui/icons-material/School';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

const Homepage = () => {
    return (
        <FullScreenWrapper>
            <HeroSection>
                <LogoHero>
                    <img src="/favicon.ico" alt="Logo" style={{ width: 90, marginBottom: 12, boxShadow: '0 4px 16px rgba(85,0,128,0.13)', borderRadius: 16 }} />
                </LogoHero>
                <HeroTitle>Welcome to Your Digital Campus</HeroTitle>
                <HeroSubtitle>Empowering Schools, Teachers, and Students</HeroSubtitle>
            </HeroSection>
            <FeaturesRow>
                <FeatureCard>
                    <AdminPanelSettingsIcon style={{ fontSize: 44, color: '#6d35a7', marginBottom: 8 }} />
                    <FeatureTitle>Admin</FeatureTitle>
                    <FeatureList>
                        <li>Add/manage students, teachers, classes, subjects</li>
                        <li>Track attendance & marks</li>
                        <li>Oversee all school data</li>
                    </FeatureList>
                </FeatureCard>
                <FeatureCard>
                    <EmojiPeopleIcon style={{ fontSize: 44, color: '#6d35a7', marginBottom: 8 }} />
                    <FeatureTitle>Teacher</FeatureTitle>
                    <FeatureList>
                        <li>Manage marks & attendance</li>
                        <li>Post notices & feedback</li>
                        <li>View/update class info</li>
                    </FeatureList>
                </FeatureCard>
                <FeatureCard>
                    <SchoolIcon style={{ fontSize: 44, color: '#6d35a7', marginBottom: 8 }} />
                    <FeatureTitle>Student</FeatureTitle>
                    <FeatureList>
                        <li>View marks, attendance, notices</li>
                        <li>Submit feedback & complaints</li>
                        <li>Access academic records</li>
                    </FeatureList>
                </FeatureCard>
            </FeaturesRow>
            <CTASection>
                <StyledLink to="/choose">
                    <ProfessionalButton variant="contained" fullWidth>
                        Login
                    </ProfessionalButton>
                </StyledLink>
                <CTAText>
                    Don't have an account?{' '}
                    <Link to="/Adminregister" style={{color:"#550080", fontWeight:600}}>
                        Sign up
                    </Link>
                </CTAText>
            </CTASection>
            <AboutBlurb>
                <AboutIcon>🌟</AboutIcon>
                <AboutTitle>All-in-one platform for seamless school management, real-time collaboration, and student success.</AboutTitle>
            </AboutBlurb>
            <WaveSVG viewBox="0 0 1440 180" preserveAspectRatio="none">
                <path d="M0,96L60,101.3C120,107,240,117,360,117.3C480,117,600,107,720,117.3C840,128,960,160,1080,154.7C1200,149,1320,107,1380,85.3L1440,64L1440,180L1380,180C1320,180,1200,180,1080,180C960,180,840,180,720,180C600,180,480,180,360,180C240,180,120,180,60,180L0,180Z" fill="#fff" fillOpacity="0.8" />
            </WaveSVG>
            <Footer>
                <FooterTagline>Study is Food &mdash; Learn. Grow. Succeed.</FooterTagline>
                <FooterCopyright>&copy; {new Date().getFullYear()} Tumati Bhanu Prakash. All rights reserved.</FooterCopyright>
            </Footer>
        </FullScreenWrapper>
    );
};

export default Homepage;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 18px;
`;
const LogoHero = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const HeroTitle = styled.h1`
  font-size: 2.7rem;
  color: #550080;
  font-family: 'Montserrat', 'Manrope', Arial, sans-serif;
  font-weight: 900;
  margin-bottom: 8px;
  text-align: center;
  letter-spacing: 1.2px;
`;
const HeroSubtitle = styled.div`
  font-size: 1.25rem;
  color: #6d35a7;
  font-weight: 600;
  margin-bottom: 8px;
  text-align: center;
`;
const FeaturesRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin: 32px 0 18px 0;
  flex-wrap: wrap;
`;
const FeatureCard = styled.div`
  background: rgba(255,255,255,0.97);
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(85,0,128,0.10);
  padding: 28px 32px 22px 32px;
  min-width: 220px;
  max-width: 270px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;
`;
const FeatureTitle = styled.div`
  font-size: 1.18rem;
  font-weight: 700;
  color: #550080;
  margin-bottom: 6px;
`;
const FeatureList = styled.ul`
  margin: 0 0 0 18px;
  padding: 0;
  color: #444;
  font-size: 1rem;
  line-height: 1.7;
  list-style: disc inside;
`;
const CTASection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 18px 0 0 0;
`;
const CTAText = styled.div`
  color: #888;
  font-size: 1.05rem;
  text-align: center;
  margin-top: 10px;
`;
const AboutBlurb = styled.div`
  margin-top: 32px;
  background: rgba(255,255,255,0.92);
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(85,0,128,0.09);
  padding: 18px 32px;
  max-width: 600px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AboutIcon = styled.div`
  font-size: 2.1rem;
  margin-bottom: 6px;
`;
const AboutTitle = styled.div`
  font-size: 1.18rem;
  font-weight: 700;
  color: #6d35a7;
  margin-bottom: 2px;
`;
const FullScreenWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  min-width: 100vw;
  overflow: hidden;
  background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

const ProfessionalButton = styled(LightPurpleButton)`
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(85,0,128,0.10);
  transition: background 0.2s, box-shadow 0.2s;
  &:hover {
    background: #6d35a7;
    box-shadow: 0 4px 16px rgba(85,0,128,0.18);
  }
`;

const WaveSVG = styled.svg`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 180px;
  z-index: 1;
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px 0;
  text-align: center;
  z-index: 2;
`;

const FooterTagline = styled.p`
  font-size: 1.1rem;
  color: #550080;
  font-weight: 600;
  margin-bottom: 4px;
`;

const FooterCopyright = styled.p`
  font-size: 0.9rem;
  color: #888;
`;
