import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const password = "zxc"

  const { status, currentUser, currentRole } = useSelector(state => state.user);;

  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Adminlogin');
      }
    }

    else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1"
        const studentName = "Dipesh Awasthi"
        const fields = { rollNum, studentName, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Studentlogin');
      }
    }

    else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Teacherlogin');
      }
    }
  }

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      }
      else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    }
    else if (status === 'error') {
      setLoader(false)
      setMessage("Network Error")
      setShowPopup(true)
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <PageWrapper>
      <HeroSection>
        <HeroTitle>Choose Your Role</HeroTitle>
        <HeroSubtitle>Select how you want to log in and access the platform.</HeroSubtitle>
      </HeroSection>
      <CardsRow>
        <RoleCard onClick={() => navigateHandler("Admin")}>
          <IconCircle color="#6d35a7"><AccountCircle fontSize="inherit" /></IconCircle>
          <RoleTitle>Admin</RoleTitle>
          <RoleDesc>Manage users, classes, subjects, and oversee all school data.</RoleDesc>
        </RoleCard>
        <RoleCard onClick={() => navigateHandler("Student")}> 
          <IconCircle color="#19118b"><School fontSize="inherit" /></IconCircle>
          <RoleTitle>Student</RoleTitle>
          <RoleDesc>Access your courses, assignments, marks, and feedback.</RoleDesc>
        </RoleCard>
        <RoleCard onClick={() => navigateHandler("Teacher")}> 
          <IconCircle color="#411d70"><Group fontSize="inherit" /></IconCircle>
          <RoleTitle>Teacher</RoleTitle>
          <RoleDesc>Create assignments, manage attendance, and track student progress.</RoleDesc>
        </RoleCard>
      </CardsRow>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </PageWrapper>
  );
};

export default ChooseUser;

const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 40px;
`;
const HeroSection = styled.div`
  margin-top: 48px;
  margin-bottom: 32px;
  text-align: center;
`;
const HeroTitle = styled.h1`
  font-size: 2.4rem;
  color: #550080;
  font-family: 'Montserrat', 'Manrope', Arial, sans-serif;
  font-weight: 900;
  margin-bottom: 8px;
  letter-spacing: 1.1px;
`;
const HeroSubtitle = styled.div`
  font-size: 1.15rem;
  color: #6d35a7;
  font-weight: 500;
`;
const CardsRow = styled.div`
  display: flex;
  gap: 36px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 32px;
`;
const RoleCard = styled.div`
  background: rgba(255,255,255,0.97);
  border-radius: 20px;
  box-shadow: 0 2px 16px rgba(85,0,128,0.10);
  padding: 36px 32px 28px 32px;
  min-width: 240px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s, background 0.2s;
  &:hover {
    box-shadow: 0 8px 32px rgba(85,0,128,0.18);
    background: #f3eaff;
    transform: translateY(-4px) scale(1.03);
  }
`;
const IconCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({color}) => color || '#6d35a7'}22;
  color: ${({color}) => color || '#6d35a7'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin-bottom: 18px;
`;
const RoleTitle = styled.div`
  font-size: 1.22rem;
  font-weight: 700;
  color: #550080;
  margin-bottom: 8px;
`;
const RoleDesc = styled.div`
  color: #444;
  font-size: 1.05rem;
  text-align: center;
  line-height: 1.6;
`;