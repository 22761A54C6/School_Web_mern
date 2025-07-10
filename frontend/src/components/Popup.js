import * as React from 'react';
import { useDispatch } from 'react-redux';
import { underControl } from '../redux/userRelated/userSlice';
import { underStudentControl } from '../redux/studentRelated/studentSlice';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import styled from 'styled-components';

const Popup = ({ message, setShowPopup, showPopup }) => {
    const dispatch = useDispatch();

    const vertical = "top"
    const horizontal = "right"

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowPopup(false);
        dispatch(underControl())
        dispatch(underStudentControl())
    };

    return (
        <>
            <StyledSnackbar 
                open={showPopup} 
                autoHideDuration={3000} 
                onClose={handleClose} 
                anchorOrigin={{ vertical, horizontal }}
                key={vertical + horizontal}
            >
                {
                    (message === "Done Successfully") ?
                        <StyledAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            {message}
                        </StyledAlert>
                        :
                        <StyledAlert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            {message}
                        </StyledAlert>
                }
            </StyledSnackbar>
        </>
    );
};

export default Popup;

const StyledSnackbar = styled(Snackbar)`
  .MuiSnackbar-root {
    z-index: 9999;
  }
`;

const StyledAlert = styled(MuiAlert)`
  && {
    border-radius: 12px;
    font-weight: 600;
    font-size: 14px;
    padding: 12px 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    &.MuiAlert-standardSuccess {
      background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
      color: white;
      border: 1px solid rgba(39, 174, 96, 0.2);
    }
    
    &.MuiAlert-standardError {
      background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
      color: white;
      border: 1px solid rgba(231, 76, 60, 0.2);
    }
    
    &.MuiAlert-filledSuccess {
      background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
      color: white;
      border: 1px solid rgba(39, 174, 96, 0.2);
    }
    
    &.MuiAlert-filledError {
      background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
      color: white;
      border: 1px solid rgba(231, 76, 60, 0.2);
    }
    
    .MuiAlert-icon {
      color: white;
    }
    
    .MuiAlert-message {
      color: white;
      font-weight: 600;
    }
    
    .MuiAlert-action {
      color: white;
    }
  }
`;
