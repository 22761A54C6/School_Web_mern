import React from 'react'
import { SpeedDial, SpeedDialAction, styled } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

const SpeedDialTemplate = ({ actions }) => {
    return (
        <CustomSpeedDial
            ariaLabel="SpeedDial playground example"
            icon={<TuneIcon />}
            direction="left"
            FabProps={{
                size: 'medium',
            }}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.action}
                    sx={{
                        '& .MuiSpeedDialAction-fab': {
                            backgroundColor: '#7f56da',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#6d35a7',
                                transform: 'scale(1.1)',
                            },
                        },
                    }}
                />
            ))}
        </CustomSpeedDial>
    )
}

export default SpeedDialTemplate

const CustomSpeedDial = styled(SpeedDial)`
  .MuiSpeedDial-fab {
    background: linear-gradient(135deg, #7f56da 0%, #6d35a7 100%);
    color: white;
    box-shadow: 0 4px 16px rgba(127, 86, 218, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      background: linear-gradient(135deg, #6d35a7 0%, #550080 100%);
      box-shadow: 0 6px 20px rgba(127, 86, 218, 0.4);
      transform: scale(1.05);
    }
    
    &:active {
      transform: scale(0.95);
    }
  }
  
  .MuiSpeedDial-actions {
    padding: 8px;
  }
  
  .MuiSpeedDialAction-staticTooltip {
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    color: #550080;
    font-weight: 600;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(127, 86, 218, 0.1);
  }
`;