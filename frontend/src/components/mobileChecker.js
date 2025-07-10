import React, { useState, useEffect } from 'react';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import styled from 'styled-components';

// Custom hook for mobile detection
export const useMobileChecker = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
            setIsMobile(isMobileDevice);
        };
        
        window.addEventListener("resize", handleResize);
        handleResize(); // Initialize the value on the first render
        
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return isMobile;
};

// Mobile Action Menu Component
export const MobileActionMenu = ({ actions, row }) => {
    return (
        <ActionMenuContainer>
            {actions.map((action) => (
                <ActionButton
                    key={action.name}
                    onClick={() => action.action(row)}
                    variant="outlined"
                    size="small"
                >
                    {action.icon}
                    <ActionText>{action.name}</ActionText>
                </ActionButton>
            ))}
        </ActionMenuContainer>
    );
};

// Desktop Speed Dial Component
export const DesktopSpeedDial = ({ actions, row }) => {
    return (
        <StyledSpeedDial
            ariaLabel="SpeedDial playground example"
            icon={<SpeedDialIcon />}
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
                    onClick={() => action.action(row)}
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
        </StyledSpeedDial>
    );
};

// Main Responsive Action Component
export const ResponsiveActions = ({ actions, row }) => {
    const isMobile = useMobileChecker();

    return (
        <>
            {isMobile ? (
                <MobileActionMenu actions={actions} row={row} />
            ) : (
                <DesktopSpeedDial actions={actions} row={row} />
            )}
        </>
    );
};

// Styled Components
const ActionMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(127, 86, 218, 0.1);
  backdrop-filter: blur(10px);
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: linear-gradient(135deg, #7f56da 0%, #6d35a7 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(127, 86, 218, 0.2);
  
  &:hover {
    background: linear-gradient(135deg, #6d35a7 0%, #550080 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(127, 86, 218, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    font-size: 16px;
  }
`;

const ActionText = styled.span`
  font-size: 12px;
  font-weight: 600;
`;

const StyledSpeedDial = styled(SpeedDial)`
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

export default ResponsiveActions;