import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, Checkbox, FormControlLabel, TextField, IconButton, InputAdornment, CircularProgress, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LightPurpleButton } from '../../components/buttonStyles';
import { registerUser } from '../../redux/userRelated/userHandle';
import styled, { keyframes } from 'styled-components';
import Popup from '../../components/Popup';

const defaultTheme = createTheme();

const AdminRegisterPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);;

    const [toggle, setToggle] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [adminNameError, setAdminNameError] = useState(false);
    const [schoolNameError, setSchoolNameError] = useState(false);
    const role = "Admin"

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = event.target.adminName.value;
        const schoolName = event.target.schoolName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!name || !schoolName || !email || !password) {
            if (!name) setAdminNameError(true);
            if (!schoolName) setSchoolNameError(true);
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            return;
        }

        const fields = { name, email, password, role, schoolName }
        setLoader(true)
        dispatch(registerUser(fields, role))
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'adminName') setAdminNameError(false);
        if (name === 'schoolName') setSchoolNameError(false);
    };

    useEffect(() => {
        if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
            navigate('/Admin/dashboard');
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            console.log(error)
        }
    }, [status, currentUser, currentRole, navigate, error, response]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <FullScreenWrapper>
                <BackHomeWrapper>
                    <BackHomeLink to="/">
                        ← Back to Home
                    </BackHomeLink>
                </BackHomeWrapper>
                <CenteredCard elevation={6} square>
                    <AnimatedCardBox>
                        <AnimatedLogoHero>
                            <img src="/favicon.ico" alt="Logo" style={{ width: 60, marginBottom: 10, boxShadow: '0 2px 8px rgba(85,0,128,0.13)', borderRadius: 12 }} />
                        </AnimatedLogoHero>
                        <CardTitle>Admin Registration</CardTitle>
                        <CardSubtitle>Create your own school and start managing your educational institution.</CardSubtitle>
                        <MotivationalQuote>"The future of education is in your hands. Build something extraordinary."</MotivationalQuote>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="adminName"
                                label="Enter your name"
                                name="adminName"
                                autoComplete="name"
                                autoFocus
                                error={adminNameError}
                                helperText={adminNameError && 'Name is required'}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="schoolName"
                                label="Create your school name"
                                name="schoolName"
                                autoComplete="off"
                                error={schoolNameError}
                                helperText={schoolNameError && 'School name is required'}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Enter your email"
                                name="email"
                                autoComplete="email"
                                error={emailError}
                                helperText={emailError && 'Email is required'}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={toggle ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                error={passwordError}
                                helperText={passwordError && 'Password is required'}
                                onChange={handleInputChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <AnimatedIconButton onClick={() => setToggle(!toggle)}>
                                                {toggle ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </AnimatedIconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="I agree to the terms and conditions"
                                />
                            </Grid>
                            <StyledRegisterButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 3 }}
                            >
                                {loader ? <CircularProgress size={24} color="inherit"/> : "Create School"}
                            </StyledRegisterButton>
                            <Grid container justifyContent="center" alignItems="center">
                                <Grid item>
                                    <span style={{ color: '#888', fontSize: '1rem' }}>Already have an account?</span>
                                </Grid>
                                <Grid item sx={{ ml: 1 }}>
                                    <StyledLink to="/Adminlogin">
                                        Log in
                                    </StyledLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </AnimatedCardBox>
                </CenteredCard>
                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </FullScreenWrapper>
        </ThemeProvider>
    );
}

export default AdminRegisterPage

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

const bounceIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  60% {
    opacity: 1;
    transform: scale(1.08);
  }
  80% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
`;

const iconFade = keyframes`
  from {
    opacity: 0.5;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const BackHomeWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 24px;
  margin-left: 32px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`;

const BackHomeLink = styled(Link)`
  color: #6d35a7;
  font-weight: 700;
  font-size: 1.08rem;
  text-decoration: none;
  background: rgba(255,255,255,0.85);
  padding: 7px 18px;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(85,0,128,0.07);
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #e0c3fc;
    color: #550080;
    text-decoration: underline;
  }
`;

const FullScreenWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CenteredCard = styled(Paper)`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 48px 40px 40px 40px;
  border-radius: 32px;
  box-shadow: 0 16px 48px rgba(85,0,128,0.20), 0 2px 0 #e0c3fc;
  background: rgba(255,255,255,0.98);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AnimatedCardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 370px;
  margin: 0 auto;
  padding: 36px 0 24px 0;
  animation: ${fadeInUp} 0.7s cubic-bezier(0.23, 1, 0.32, 1);
`;

const AnimatedLogoHero = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${bounceIn} 0.9s cubic-bezier(0.23, 1, 0.32, 1);
`;

const AnimatedIconButton = styled(IconButton)`
  transition: color 0.2s, transform 0.2s;
  animation: ${iconFade} 0.4s;
  &:active {
    transform: scale(1.15);
    color: #6d35a7;
  }
`;

const CardTitle = styled.h1`
  font-size: 2.1rem;
  color: #550080;
  font-family: 'Montserrat', 'Manrope', Arial, sans-serif;
  font-weight: 900;
  margin-bottom: 8px;
  text-align: center;
  letter-spacing: 1.1px;
`;

const CardSubtitle = styled.div`
  font-size: 1.08rem;
  color: #6d35a7;
  font-weight: 500;
  margin-bottom: 8px;
  text-align: center;
`;

const MotivationalQuote = styled.div`
  font-size: 1.01rem;
  color: #888;
  margin: 16px 0 0 0;
  text-align: center;
  font-style: italic;
  letter-spacing: 0.2px;
`;

const StyledRegisterButton = styled(LightPurpleButton)`
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

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
  font-weight: 600;
  &:hover {
    color: #6d35a7;
    text-decoration: underline;
  }
`;
