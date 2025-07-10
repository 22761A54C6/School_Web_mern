import React, { useEffect, useState } from "react";
import { Button, TextField, Typography, CircularProgress, Card } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Popup from '../../../components/Popup';
import styled from 'styled-components';
import SubjectIcon from '@mui/icons-material/Subject';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from '@mui/icons-material/Save';

const SubjectForm = () => {
    const [subjects, setSubjects] = useState([{ subName: "", subCode: "", sessions: "" }]);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;

    const sclassName = params.id
    const adminID = currentUser._id
    const address = "Subject"

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    const handleSubjectNameChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subName = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSubjectCodeChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subCode = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSessionsChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].sessions = event.target.value || 0;
        setSubjects(newSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { subName: "", subCode: "", sessions: "" }]);
    };

    const handleRemoveSubject = (index) => () => {
        const newSubjects = [...subjects];
        newSubjects.splice(index, 1);
        setSubjects(newSubjects);
    };

    const fields = {
        sclassName,
        subjects: subjects.map((subject) => ({
            subName: subject.subName,
            subCode: subject.subCode,
            sessions: subject.sessions,
        })),
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === 'added') {
            navigate("/Admin/subjects");
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
    }, [status, navigate, error, response, dispatch]);

    return (
        <Container>
            <StyledCard>
                <HeaderSection>
                    <HeaderIcon>
                        <SubjectIcon />
                    </HeaderIcon>
                    <HeaderContent>
                        <HeaderTitle>Add Subjects</HeaderTitle>
                        <HeaderSubtitle>Create new subjects for your class curriculum</HeaderSubtitle>
                    </HeaderContent>
                </HeaderSection>

                <FormSection>
                    <form onSubmit={submitHandler}>
                        <FormGrid>
                            {subjects.map((subject, index) => (
                                <SubjectCard key={index}>
                                    <SubjectCardHeader>
                                        <SubjectNumber>Subject {index + 1}</SubjectNumber>
                                        {index > 0 && (
                                            <RemoveButton
                                                variant="outlined"
                                                color="error"
                                                onClick={handleRemoveSubject(index)}
                                                startIcon={<RemoveIcon />}
                                            >
                                                Remove
                                            </RemoveButton>
                                        )}
                                    </SubjectCardHeader>
                                    
                                    <SubjectFields>
                                        <StyledTextField
                                            fullWidth
                                            label="Subject Name"
                                            variant="outlined"
                                            value={subject.subName}
                                            onChange={handleSubjectNameChange(index)}
                                            required
                                        />
                                        <StyledTextField
                                            fullWidth
                                            label="Subject Code"
                                            variant="outlined"
                                            value={subject.subCode}
                                            onChange={handleSubjectCodeChange(index)}
                                            required
                                        />
                                        <StyledTextField
                                            fullWidth
                                            label="Sessions"
                                            variant="outlined"
                                            type="number"
                                            inputProps={{ min: 0 }}
                                            value={subject.sessions}
                                            onChange={handleSessionsChange(index)}
                                            required
                                        />
                                    </SubjectFields>
                                </SubjectCard>
                            ))}
                            
                            <AddSubjectSection>
                                <AddSubjectButton
                                    variant="outlined"
                                    onClick={handleAddSubject}
                                    startIcon={<AddIcon />}
                                >
                                    Add Another Subject
                                </AddSubjectButton>
                            </AddSubjectSection>

                            <SubmitSection>
                                <SubmitButton
                                    variant="contained"
                                    type="submit"
                                    disabled={loader}
                                    startIcon={loader ? <CircularProgress size={20} /> : <SaveIcon />}
                                >
                                    {loader ? 'Saving...' : 'Save Subjects'}
                                </SubmitButton>
                            </SubmitSection>
                        </FormGrid>
                    </form>
                </FormSection>
            </StyledCard>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
}

export default SubjectForm

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
    max-width: 800px;
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

const SubjectCard = styled(Card)`
  && {
    background: #f8fafc;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    overflow: hidden;
    transition: all 0.3s ease;
    
    &:hover {
      background: #f1f5f9;
      border-color: #cbd5e1;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
`;

const SubjectCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
`;

const SubjectNumber = styled(Typography)`
  && {
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
  }
`;

const RemoveButton = styled(Button)`
  && {
    border-radius: 8px;
    padding: 6px 12px;
    font-weight: 600;
    text-transform: none;
    font-size: 14px;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #fef2f2;
      border-color: #ef4444;
      color: #dc2626;
    }
  }
`;

const SubjectFields = styled.div`
  padding: 20px;
  display: grid;
  gap: 16px;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;

const StyledTextField = styled(TextField)`
  && {
    .MuiOutlinedInput-root {
      border-radius: 8px;
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

const AddSubjectSection = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
`;

const AddSubjectButton = styled(Button)`
  && {
    border-radius: 12px;
    padding: 12px 24px;
    font-weight: 600;
    text-transform: none;
    font-size: 16px;
    border-color: #7f56da;
    color: #7f56da;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: #6b46c1;
      background-color: #f8fafc;
      color: #6b46c1;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(127, 86, 218, 0.2);
    }
  }
`;

const SubmitSection = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
`;

const SubmitButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    border-radius: 12px;
    padding: 12px 32px;
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