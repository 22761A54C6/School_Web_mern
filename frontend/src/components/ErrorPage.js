import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const ErrorPage = () => {
    return (
        <Container>
            <Overlay />
            <Content>
                <ErrorIcon>⚠️</ErrorIcon>
                <Heading>Oops! Something went wrong</Heading>
                <Text>
                    We apologize for the inconvenience. Our website is currently experiencing technical difficulties. 
                    Please check back later or contact support if the problem persists.
                </Text>
                <ActionButton onClick={() => window.location.reload()}>
                    Try Again
                </ActionButton>
                <BackButton onClick={() => window.history.back()}>
                    Go Back
                </BackButton>
            </Content>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  background-size: cover;
  background-position: center;
  opacity: 0.3;
  z-index: 1;
`;

const Content = styled.div`
  max-width: 600px;
  padding: 48px 32px;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: ${fadeInUp} 0.8s ease-out;
  z-index: 2;
  position: relative;
`;

const ErrorIcon = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const Heading = styled.h1`
  margin-bottom: 24px;
  font-size: 32px;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.5px;
`;

const Text = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 32px;
  font-weight: 400;
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #7f56da 0%, #6d35a7 100%);
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(127, 86, 218, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(127, 86, 218, 0.4);
    background: linear-gradient(135deg, #6d35a7 0%, #550080 100%);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 12px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin: 8px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export default ErrorPage;
