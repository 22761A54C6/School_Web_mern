import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { CircularProgress, Typography, TextField, Button, Box, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import styled from 'styled-components';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const AddStudent = ({ situation }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList } = useSelector((state) => state.sclass);

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('')
    const [className, setClassName] = useState('')
    const [sclassName, setSclassName] = useState('')

    const adminID = currentUser._id
    const role = "Student"
    const attendance = []

    useEffect(() => {
        if (situation === "Class") {
            setSclassName(params.id);
        }
    }, [params.id, situation]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);

    const changeHandler = (event) => {
        if (event.target.value === 'Select Class') {
            setClassName('Select Class');
            setSclassName('');
        } else {
            const selectedClass = sclassesList.find(
                (classItem) => classItem.sclassName === event.target.value
            );
            setClassName(selectedClass.sclassName);
            setSclassName(selectedClass._id);
        }
    }

    const fields = { name, rollNum, password, sclassName, adminID, role, attendance }

    const submitHandler = (event) => {
        event.preventDefault()
        if (sclassName === "") {
            setMessage("Please select a classname")
            setShowPopup(true)
        }
        else {
            setLoader(true)
            dispatch(registerUser(fields, role))
        }
    }

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl())
            navigate(-1)
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
                        <HeaderTitle>Add New Student</HeaderTitle>
                        <HeaderSubtitle>Register a new student to the school system</HeaderSubtitle>
                    </HeaderContent>
                </HeaderSection>

                <FormSection>
                    <form onSubmit={submitHandler}>
                        <FormGrid>
                            <StyledTextField
                                label="Student Name"
                                variant="outlined"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Enter student's full name..."
                                autoComplete="name"
                                required
                                fullWidth
                            />

                            {situation === "Student" && (
                                <StyledFormControl fullWidth>
                                    <InputLabel>Select Class</InputLabel>
                                    <StyledSelect
                                        value={className}
                                        onChange={changeHandler}
                                        label="Select Class"
                                        required
                                    >
                                        <MenuItem value="Select Class">Select Class</MenuItem>
                                        {sclassesList.map((classItem, index) => (
                                            <MenuItem key={index} value={classItem.sclassName}>
                                                {classItem.sclassName}
                                            </MenuItem>
                                        ))}
                                    </StyledSelect>
                                </StyledFormControl>
                            )}

                            <StyledTextField
                                label="Roll Number"
                                variant="outlined"
                                type="number"
                                value={rollNum}
                                onChange={(event) => setRollNum(event.target.value)}
                                placeholder="Enter student's roll number..."
                                required
                                fullWidth
                            />

                            <StyledTextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Enter student's password..."
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
                                        'Add Student'
                                    )}
                                </SubmitButton>
                                
                                <CancelButton
                                    variant="outlined"
                                    onClick={() => navigate(-1)}
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

export default AddStudent

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

const StyledFormControl = styled(FormControl)`
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

const StyledSelect = styled(Select)`
  && {
    .MuiSelect-select {
      border-radius: 12px;
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