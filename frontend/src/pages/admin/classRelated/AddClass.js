import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { BlueButton } from "../../../components/buttonStyles";
import Popup from "../../../components/Popup";
import Classroom from "../../../assets/classroom.png";
import styled from "styled-components";

const AddClass = () => {
    const [sclassName, setSclassName] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error, tempDetails } = userState;

    const adminID = currentUser._id
    const address = "Sclass"

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        sclassName,
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === 'added' && tempDetails) {
            navigate("/Admin/classes/class/" + tempDetails._id)
            dispatch(underControl())
            setLoader(false)
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
    }, [status, navigate, error, response, dispatch, tempDetails]);
    
    return (
        <>
            <StyledContainer>
                <StyledCard>
                    <HeaderSection>
                        <Title>Create New Class</Title>
                        <Subtitle>Add a new class to your school management system</Subtitle>
                    </HeaderSection>
                    
                    <ImageSection>
                        <StyledImage
                            src={Classroom}
                            alt="classroom"
                        />
                    </ImageSection>
                    
                    <FormSection>
                        <form onSubmit={submitHandler}>
                            <Stack spacing={3}>
                                <StyledTextField
                                    label="Class Name"
                                    variant="outlined"
                                    value={sclassName}
                                    onChange={(event) => {
                                        setSclassName(event.target.value);
                                    }}
                                    placeholder="Enter class name (e.g., Class 10A)"
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
                                            "Create Class"
                                        )}
                                    </SubmitButton>
                                    
                                    <BackButton 
                                        variant="outlined" 
                                        onClick={() => navigate(-1)}
                                        fullWidth
                                    >
                                        Go Back
                                    </BackButton>
                                </ButtonContainer>
                            </Stack>
                        </form>
                    </FormSection>
                </StyledCard>
            </StyledContainer>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    )
}

export default AddClass

const StyledContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const StyledCard = styled(Box)`
  max-width: 500px;
  width: 100%;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
`;

const HeaderSection = styled.div`
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  color: white;
  padding: 32px 24px;
  text-align: center;
`;

const Title = styled(Typography)`
  && {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 8px;
    color: white;
  }
`;

const Subtitle = styled(Typography)`
  && {
    font-size: 16px;
    opacity: 0.9;
    color: white;
  }
`;

const ImageSection = styled.div`
  padding: 32px 24px 16px;
  display: flex;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: 80%;
  max-width: 300px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const FormSection = styled.div`
  padding: 24px;
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

const BackButton = styled(Button)`
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