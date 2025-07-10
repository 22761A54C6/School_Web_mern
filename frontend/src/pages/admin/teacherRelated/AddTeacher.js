import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import Popup from '../../../components/Popup';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress, Typography, TextField, Button, Box, Card, CardContent, Chip } from '@mui/material';
import styled from 'styled-components';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SubjectIcon from '@mui/icons-material/Subject';
import SchoolIcon from '@mui/icons-material/School';

const AddTeacher = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const subjectID = params.id

  const { status, response, error } = useSelector(state => state.user);
  const { subjectDetails } = useSelector((state) => state.sclass);

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
  }, [dispatch, subjectID]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false)

  const role = "Teacher"
  const school = subjectDetails && subjectDetails.school
  const teachSubject = subjectDetails && subjectDetails._id
  const teachSclass = subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName._id

  const fields = { name, email, password, role, school, teachSubject, teachSclass }

  const submitHandler = (event) => {
    event.preventDefault()
    setLoader(true)
    dispatch(registerUser(fields, role))
  }

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl())
      navigate("/Admin/teachers")
    }
    else if (status === 'failed') {
      setMessage(response)
      setShowPopup(true)
      setLoader(false)
    }
    else if (status === 'error') {
      setMessage("Network Error")
      setShowPopup(true)
      setLoader(false)
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <Container>
      <StyledCard>
        <HeaderSection>
          <HeaderIcon>
            <PersonAddIcon />
          </HeaderIcon>
          <HeaderContent>
            <HeaderTitle>Add New Teacher</HeaderTitle>
            <HeaderSubtitle>Register a teacher for the selected subject</HeaderSubtitle>
          </HeaderContent>
        </HeaderSection>

        {subjectDetails && (
          <SubjectInfoSection>
            <SubjectCard>
              <SubjectIconWrapper>
                <SubjectIcon />
              </SubjectIconWrapper>
              <SubjectContent>
                <SubjectLabel>Subject</SubjectLabel>
                <SubjectValue>{subjectDetails.subName}</SubjectValue>
              </SubjectContent>
            </SubjectCard>
            
            <SubjectCard>
              <SubjectIconWrapper>
                <SchoolIcon />
              </SubjectIconWrapper>
              <SubjectContent>
                <SubjectLabel>Class</SubjectLabel>
                <SubjectValue>{subjectDetails.sclassName?.sclassName}</SubjectValue>
              </SubjectContent>
            </SubjectCard>
          </SubjectInfoSection>
        )}

        <FormSection>
          <form onSubmit={submitHandler}>
            <FormGrid>
              <StyledTextField
                label="Teacher Name"
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter teacher's full name..."
                autoComplete="name"
                required
                fullWidth
              />

              <StyledTextField
                label="Email Address"
                variant="outlined"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter teacher's email..."
                autoComplete="email"
                required
                fullWidth
              />

              <StyledTextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter teacher's password..."
                autoComplete="new-password"
                required
                fullWidth
              />

              <ButtonContainer>
                <SubmitButton
                  fullWidth
                  size="large"
                  variant="contained"
                  type="submit"
                  disabled={loader}
                >
                  {loader ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Add Teacher'
                  )}
                </SubmitButton>
                
                <CancelButton
                  variant="outlined"
                  onClick={() => navigate("/Admin/teachers")}
                  fullWidth
                >
                  Cancel
                </CancelButton>
              </ButtonContainer>
            </FormGrid>
          </form>
        </FormSection>
      </StyledCard>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Container>
  )
}

export default AddTeacher

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const StyledCard = styled(Card)`
  && {
    max-width: 600px;
    width: 100%;
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

const HeaderSection = styled.div`
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  color: white;
  padding: 32px 24px;
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
  background: rgba(255, 255, 255, 0.2);
  color: white;
  
  .MuiSvgIcon-root {
    font-size: 28px;
  }
`;

const HeaderContent = styled.div``;

const HeaderTitle = styled(Typography)`
  && {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 8px;
    color: white;
  }
`;

const HeaderSubtitle = styled(Typography)`
  && {
    font-size: 16px;
    opacity: 0.9;
    color: white;
  }
`;

const SubjectInfoSection = styled.div`
  padding: 24px;
  display: flex;
  gap: 16px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const SubjectCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  flex: 1;
`;

const SubjectIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  color: white;
  
  .MuiSvgIcon-root {
    font-size: 20px;
  }
`;

const SubjectContent = styled.div``;

const SubjectLabel = styled(Typography)`
  && {
    font-size: 12px;
    color: #64748b;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const SubjectValue = styled(Typography)`
  && {
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
  }
`;

const FormSection = styled.div`
  padding: 32px 24px;
`;

const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledTextField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      border-radius: 12px;
      transition: all 0.3s ease;
      
      &:hover {
        .MuiOutlinedInput-notchedOutline {
          border-color: #7f56da;
        }
      }
      
      &.Mui-focused {
        .MuiOutlinedInput-notchedOutline {
          border-color: #7f56da;
          border-width: 2px;
        }
      }
    }
    
    .MuiInputLabel-root {
      color: #6c757d;
      font-weight: 500;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
`;

const SubmitButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    border-radius: 12px;
    padding: 12px 24px;
    font-weight: 600;
    text-transform: none;
    font-size: 16px;
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(127, 86, 218, 0.3);
    }
    
    &:disabled {
      background: #e2e8f0;
      color: #94a3b8;
    }
  }
`;

const CancelButton = styled(Button)`
  && {
    border-radius: 12px;
    padding: 12px 24px;
    font-weight: 600;
    text-transform: none;
    font-size: 16px;
    border-color: #e2e8f0;
    color: #64748b;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: #cbd5e1;
      background-color: #f8fafc;
      color: #475569;
    }
  }
`;