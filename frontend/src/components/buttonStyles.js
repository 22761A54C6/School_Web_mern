import styled from 'styled-components';
import { Button } from '@mui/material';

export const RedButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #ff4757 0%, #ff3742 100%);
    color: white;
    margin-left: 4px;
    border-radius: 8px;
    font-weight: 600;
    text-transform: none;
    padding: 10px 20px;
    box-shadow: 0 2px 8px rgba(255, 71, 87, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
      background: linear-gradient(135deg, #ff3742 0%, #ff2e3a 100%);
      box-shadow: 0 4px 16px rgba(255, 71, 87, 0.4);
      transform: translateY(-1px);
    }
    &:active {
      transform: translateY(0);
    }
  }
`;

export const BlackButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    color: white;
    margin-left: 4px;
    border-radius: 8px;
    font-weight: 600;
    text-transform: none;
    padding: 10px 20px;
    box-shadow: 0 2px 8px rgba(44, 62, 80, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
      background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
      box-shadow: 0 4px 16px rgba(44, 62, 80, 0.4);
      transform: translateY(-1px);
    }
    &:active {
      transform: translateY(0);
    }
  }
`;

export const DarkRedButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
    color: white;
    border-radius: 8px;
    font-weight: 600;
    text-transform: none;
    padding: 10px 20px;
    box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
      background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
      box-shadow: 0 4px 16px rgba(231, 76, 60, 0.4);
      transform: translateY(-1px);
    }
    &:active {
      transform: translateY(0);
    }
  }
`;

export const BlueButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
    color: white;
    border-radius: 8px;
    font-weight: 600;
    text-transform: none;
    padding: 10px 20px;
    box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
      background: linear-gradient(135deg, #2980b9 0%, #3498db 100%);
      box-shadow: 0 4px 16px rgba(52, 152, 219, 0.4);
      transform: translateY(-1px);
    }
    &:active {
      transform: translateY(0);
    }
  }
`;

export const PurpleButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
    color: white;
    border-radius: 8px;
    font-weight: 600;
    text-transform: none;
    padding: 10px 20px;
    box-shadow: 0 2px 8px rgba(155, 89, 182, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
      background: linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%);
      box-shadow: 0 4px 16px rgba(155, 89, 182, 0.4);
      transform: translateY(-1px);
    }
    &:active {
      transform: translateY(0);
    }
  }
`;

export const LightPurpleButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #7f56da 0%, #6d35a7 100%);
    color: white;
    border-radius: 8px;
    font-weight: 600;
    text-transform: none;
    padding: 10px 20px;
    box-shadow: 0 2px 8px rgba(127, 86, 218, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
      background: linear-gradient(135deg, #6d35a7 0%, #7f56da 100%);
      box-shadow: 0 4px 16px rgba(127, 86, 218, 0.4);
      transform: translateY(-1px);
    }
    &:active {
      transform: translateY(0);
    }
  }
`;

export const GreenButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
    color: white;
    border-radius: 8px;
    font-weight: 600;
    text-transform: none;
    padding: 10px 20px;
    box-shadow: 0 2px 8px rgba(39, 174, 96, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
      background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
      box-shadow: 0 4px 16px rgba(39, 174, 96, 0.4);
      transform: translateY(-1px);
    }
    &:active {
      transform: translateY(0);
    }
  }
`;

export const BrownButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #d35400 0%, #e67e22 100%);
    color: white;
    border-radius: 8px;
    font-weight: 600;
    text-transform: none;
    padding: 10px 20px;
    box-shadow: 0 2px 8px rgba(211, 84, 0, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
      background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
      box-shadow: 0 4px 16px rgba(211, 84, 0, 0.4);
      transform: translateY(-1px);
    }
    &:active {
      transform: translateY(0);
    }
  }
`;

export const IndigoButton = styled(Button)`
  && {
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    color: white;
    border-radius: 8px;
    font-weight: 600;
    text-transform: none;
    padding: 10px 20px;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
      background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
      box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
      transform: translateY(-1px);
    }
    &:active {
      transform: translateY(0);
    }
  }
`;
