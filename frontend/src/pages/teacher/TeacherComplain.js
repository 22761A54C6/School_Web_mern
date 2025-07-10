import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Box,
  Alert,
  Snackbar
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ReportIcon from '@mui/icons-material/Report';

const TeacherComplain = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle complain submission logic here
    console.log('Complain submitted:', formData);
    setShowSuccess(true);
    setFormData({ subject: '', message: '', priority: 'medium' });
  };

  return (
    <ComplainContainer>
      <HeaderSection>
        <HeaderIcon>
          <ReportIcon />
        </HeaderIcon>
        <HeaderText>
          <HeaderTitle>Submit a Complaint</HeaderTitle>
          <HeaderSubtitle>Report issues or concerns to the administration</HeaderSubtitle>
        </HeaderText>
      </HeaderSection>

      <ComplainCard>
        <CardHeader>
          <Typography variant="h5" component="h2" sx={{ 
            fontWeight: 600, 
            color: '#1a1a1a',
            mb: 1
          }}>
            New Complaint
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Please provide detailed information about your concern
          </Typography>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FormSection>
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#7f56da',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#7f56da',
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                multiline
                rows={6}
                variant="outlined"
                placeholder="Describe your complaint in detail..."
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#7f56da',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#7f56da',
                    },
                  },
                }}
              />

              <PrioritySection>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#1a1a1a' }}>
                  Priority Level
                </Typography>
                <PriorityButtons>
                  <PriorityButton
                    type="button"
                    selected={formData.priority === 'low'}
                    onClick={() => setFormData({ ...formData, priority: 'low' })}
                  >
                    Low
                  </PriorityButton>
                  <PriorityButton
                    type="button"
                    selected={formData.priority === 'medium'}
                    onClick={() => setFormData({ ...formData, priority: 'medium' })}
                  >
                    Medium
                  </PriorityButton>
                  <PriorityButton
                    type="button"
                    selected={formData.priority === 'high'}
                    onClick={() => setFormData({ ...formData, priority: 'high' })}
                  >
                    High
                  </PriorityButton>
                </PriorityButtons>
              </PrioritySection>

              <SubmitSection>
                <SubmitButton
                  type="submit"
                  variant="contained"
                  startIcon={<SendIcon />}
                  fullWidth
                >
                  Submit Complaint
                </SubmitButton>
              </SubmitSection>
            </FormSection>
          </form>
        </CardContent>
      </ComplainCard>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Complaint submitted successfully!
        </Alert>
      </Snackbar>
    </ComplainContainer>
  );
};

export default TeacherComplain;

const ComplainContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 24px;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const HeaderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  color: white;
  box-shadow: 0 8px 32px rgba(127, 86, 218, 0.3);
  
  .MuiSvgIcon-root {
    font-size: 40px;
  }
`;

const HeaderText = styled.div`
  text-align: center;
`;

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeaderSubtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin: 0;
  font-weight: 500;
`;

const ComplainCard = styled(Card)`
  && {
    max-width: 800px;
    margin: 0 auto;
    border-radius: 16px;
    background: white;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(127, 86, 218, 0.1);
    overflow: hidden;
  }
`;

const CardHeader = styled(CardContent)`
  && {
    padding: 32px 32px 24px;
    text-align: center;
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    color: white;
    
    .MuiTypography-h5 {
      color: white;
    }
    
    .MuiTypography-body2 {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;

const FormSection = styled.div`
  padding: 0;
`;

const PrioritySection = styled.div`
  margin-bottom: 24px;
`;

const PriorityButtons = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const PriorityButton = styled.button`
  flex: 1;
  padding: 12px 24px;
  border: 2px solid ${props => props.selected ? '#7f56da' : '#e0e0e0'};
  border-radius: 8px;
  background: ${props => props.selected ? '#7f56da' : 'transparent'};
  color: ${props => props.selected ? 'white' : '#666'};
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #7f56da;
    background: ${props => props.selected ? '#7f56da' : 'rgba(127, 86, 218, 0.1)'};
    color: ${props => props.selected ? 'white' : '#7f56da'};
  }
`;

const SubmitSection = styled.div`
  margin-top: 32px;
`;

const SubmitButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
    color: white;
    padding: 12px 32px;
    border-radius: 8px;
    font-weight: 600;
    text-transform: none;
    font-size: 16px;
    box-shadow: 0 4px 12px rgba(127, 86, 218, 0.3);
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(135deg, #6b46c1 0%, #8b5cf6 100%);
      box-shadow: 0 6px 20px rgba(127, 86, 218, 0.4);
      transform: translateY(-2px);
    }
  }
`;