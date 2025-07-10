import { useEffect, useState } from 'react';
import { CircularProgress, Stack, TextField, Typography, Card } from '@mui/material';
import Popup from '../../components/Popup';
import { addStuff } from '../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ReportIcon from '@mui/icons-material/Report';
import SendIcon from '@mui/icons-material/Send';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

const StudentComplain = () => {
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState("");

    const dispatch = useDispatch()

    const { status, currentUser, error } = useSelector(state => state.user);

    const user = currentUser._id
    const school = currentUser.school._id
    const address = "Complain"

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        user,
        date,
        complaint,
        school,
    };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === "added") {
            setLoader(false)
            setShowPopup(true)
            setMessage("Complaint submitted successfully!")
        }
        else if (error) {
            setLoader(false)
            setShowPopup(true)
            setMessage("Network Error")
        }
    }, [status, error])

    return (
        <PageContainer>
            <ComplaintCard>
                <HeaderSection>
                    <HeaderIcon>
                        <ReportIcon />
                    </HeaderIcon>
                    <HeaderContent>
                        <HeaderTitle>Submit a Complaint</HeaderTitle>
                        <HeaderSubtitle>Share your concerns with the school administration</HeaderSubtitle>
                    </HeaderContent>
                </HeaderSection>

                <InfoSection>
                    <InfoSectionIcon>
                        <InfoIcon />
                    </InfoSectionIcon>
                    <InfoText>
                        <InfoTitle>Important Information</InfoTitle>
                        <InfoDescription>
                            Please provide detailed information about your complaint. This helps us address your concerns more effectively.
                        </InfoDescription>
                    </InfoText>
                </InfoSection>

                <FormSection>
                    <form onSubmit={submitHandler}>
                        <FormStack>
                            <DateFieldContainer>
                                <DateFieldLabel>
                                    <CalendarTodayIcon />
                                    <span>Select Date</span>
                                </DateFieldLabel>
                                <StyledTextField
                                    fullWidth
                                    type="date"
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)}
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </DateFieldContainer>

                            <ComplaintFieldContainer>
                                <ComplaintFieldLabel>
                                    <EditIcon />
                                    <span>Write your complaint</span>
                                </ComplaintFieldLabel>
                                <StyledTextField
                                    fullWidth
                                    variant="outlined"
                                    value={complaint}
                                    onChange={(event) => {
                                        setComplaint(event.target.value);
                                    }}
                                    required
                                    multiline
                                    rows={6}
                                    placeholder="Please describe your complaint in detail. Include specific incidents, dates, and any relevant information that will help us understand and address your concern..."
                                />
                                <CharacterCount>
                                    {complaint.length}/1000 characters
                                </CharacterCount>
                            </ComplaintFieldContainer>

                            <SubmitButton
                                fullWidth
                                size="large"
                                variant="contained"
                                type="submit"
                                disabled={loader || !date || !complaint.trim()}
                                startIcon={loader ? <CircularProgress size={20} /> : <SendIcon />}
                            >
                                {loader ? 'Submitting...' : 'Submit Complaint'}
                            </SubmitButton>
                        </FormStack>
                    </form>
                </FormSection>
            </ComplaintCard>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </PageContainer>
    );
};

export default StudentComplain;

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  animation: fadeIn 0.5s ease-in-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ComplaintCard = styled(Card)`
  && {
    max-width: 700px;
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
  box-shadow: 0 8px 25px rgba(127, 86, 218, 0.3);
  
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

const InfoSection = styled.div`
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-left: 4px solid #7f56da;
  padding: 16px 24px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const InfoSectionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  color: white;
  flex-shrink: 0;
  
  .MuiSvgIcon-root {
    font-size: 18px;
  }
`;

const InfoText = styled.div``;

const InfoTitle = styled(Typography)`
  && {
    font-size: 14px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 4px;
  }
`;

const InfoDescription = styled(Typography)`
  && {
    font-size: 13px;
    color: #64748b;
    line-height: 1.4;
  }
`;

const FormSection = styled.div`
  padding: 32px 24px;
`;

const FormStack = styled(Stack)`
  && {
    gap: 24px;
  }
`;

const DateFieldContainer = styled.div``;

const DateFieldLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-weight: 600;
  color: #374151;
  font-size: 14px;
  
  .MuiSvgIcon-root {
    font-size: 18px;
    color: #7f56da;
  }
`;

const ComplaintFieldContainer = styled.div``;

const ComplaintFieldLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-weight: 600;
  color: #374151;
  font-size: 14px;
  
  .MuiSvgIcon-root {
    font-size: 18px;
    color: #7f56da;
  }
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

const CharacterCount = styled.div`
  font-size: 12px;
  color: #64748b;
  text-align: right;
  margin-top: 4px;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-weight: 600;
  text-transform: none;
  font-size: 16px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(127, 86, 218, 0.3);
  }
  
  &:disabled {
    background: #e2e8f0;
    color: #94a3b8;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;