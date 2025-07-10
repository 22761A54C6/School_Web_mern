import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';

const StudentSideBar = () => {
    const location = useLocation();
    
    const isActive = (path) => {
        if (path === "/") {
            return location.pathname === "/" || location.pathname === "/Student/dashboard";
        }
        return location.pathname.startsWith(path);
    };

    return (
        <SidebarContainer>
            <SidebarHeader>
                <HeaderIcon>
                    <DashboardIcon />
                </HeaderIcon>
                <HeaderText>
                    <HeaderTitle>Student</HeaderTitle>
                    <HeaderSubtitle>Dashboard</HeaderSubtitle>
                </HeaderText>
            </SidebarHeader>

            <NavigationSection>
                <SectionLabel>Navigation</SectionLabel>
                
                <NavItem 
                    component={Link} 
                    to="/"
                    active={isActive("/")}
                >
                    <NavIcon active={isActive("/")}>
                        <HomeIcon />
                    </NavIcon>
                    <NavText active={isActive("/")}>Home</NavText>
                    <ActiveIndicator active={isActive("/")} />
                </NavItem>
                
                <NavItem 
                    component={Link} 
                    to="/Student/subjects"
                    active={isActive("/Student/subjects")}
                >
                    <NavIcon active={isActive("/Student/subjects")}>
                        <AssignmentIcon />
                    </NavIcon>
                    <NavText active={isActive("/Student/subjects")}>Subjects</NavText>
                    <ActiveIndicator active={isActive("/Student/subjects")} />
                </NavItem>
                
                <NavItem 
                    component={Link} 
                    to="/Student/attendance"
                    active={isActive("/Student/attendance")}
                >
                    <NavIcon active={isActive("/Student/attendance")}>
                        <ClassOutlinedIcon />
                    </NavIcon>
                    <NavText active={isActive("/Student/attendance")}>Attendance</NavText>
                    <ActiveIndicator active={isActive("/Student/attendance")} />
                </NavItem>
                
                <NavItem 
                    component={Link} 
                    to="/Student/complain"
                    active={isActive("/Student/complain")}
                >
                    <NavIcon active={isActive("/Student/complain")}>
                        <AnnouncementOutlinedIcon />
                    </NavIcon>
                    <NavText active={isActive("/Student/complain")}>Complain</NavText>
                    <ActiveIndicator active={isActive("/Student/complain")} />
                </NavItem>
            </NavigationSection>
            
            <Divider sx={{ 
                my: 2, 
                borderColor: 'rgba(255, 255, 255, 0.1)',
                opacity: 0.3 
            }} />
            
            <UserSection>
                <SectionLabel>Account</SectionLabel>
                
                <NavItem 
                    component={Link} 
                    to="/Student/profile"
                    active={isActive("/Student/profile")}
                >
                    <NavIcon active={isActive("/Student/profile")}>
                        <AccountCircleOutlinedIcon />
                    </NavIcon>
                    <NavText active={isActive("/Student/profile")}>Profile</NavText>
                    <ActiveIndicator active={isActive("/Student/profile")} />
                </NavItem>
                
                <NavItem 
                    component={Link} 
                    to="/logout"
                    active={isActive("/logout")}
                    className="logout-item"
                >
                    <NavIcon active={isActive("/logout")}>
                        <ExitToAppIcon />
                    </NavIcon>
                    <NavText active={isActive("/logout")}>Logout</NavText>
                    <ActiveIndicator active={isActive("/logout")} />
                </NavItem>
            </UserSection>
        </SidebarContainer>
    )
}

export default StudentSideBar

const SidebarContainer = styled.div`
  padding: 16px 0;
  height: 100vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #2d115c 0%, #4b2067 100%);
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px 24px;
  margin-bottom: 8px;
`;

const HeaderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(127, 86, 218, 0.3);
  
  .MuiSvgIcon-root {
    font-size: 20px;
  }
`;

const HeaderText = styled.div``;

const HeaderTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 2px;
`;

const HeaderSubtitle = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
`;

const NavigationSection = styled.div`
  margin-bottom: 16px;
  flex: 0 0 auto;
`;

const UserSection = styled.div`
  margin-top: auto;
  flex-shrink: 0;
  padding-bottom: 24px;
`;

const SectionLabel = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 24px 8px;
  margin-bottom: 8px;
`;

const NavItem = styled(ListItemButton)`
  && {
    margin: 4px 8px;
    border-radius: 12px;
    padding: 12px 16px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
    position: relative;
    overflow: hidden;
    
    &:hover {
      background: rgba(255, 255, 255, 0.08);
      transform: translateX(4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    &.Mui-selected {
      background: rgba(255, 255, 255, 0.1);
    }
    
    &.logout-item {
      margin-top: 16px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      
      &:hover {
        background: rgba(239, 68, 68, 0.1);
        border-color: rgba(239, 68, 68, 0.3);
      }
    }
  }
`;

const NavIcon = styled(ListItemIcon)`
  && {
    min-width: 40px;
    color: ${props => props.active ? '#7f56da' : 'rgba(255, 255, 255, 0.7)'};
    transition: all 0.3s ease;
    
    .MuiSvgIcon-root {
      font-size: 20px;
      filter: ${props => props.active ? 'drop-shadow(0 2px 4px rgba(127, 86, 218, 0.3))' : 'none'};
    }
  }
`;

const NavText = styled(ListItemText)`
  && {
    .MuiListItemText-primary {
      color: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.92)'};
      font-weight: ${props => props.active ? '600' : '500'};
      font-size: 14px;
      transition: all 0.3s ease;
      text-shadow: ${props => props.active ? '0 1px 2px rgba(0, 0, 0, 0.15)' : 'none'};
    }
  }
`;

const ActiveIndicator = styled.div`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 20px;
  background: linear-gradient(135deg, #7f56da 0%, #9c6ade 100%);
  border-radius: 2px;
  opacity: ${props => props.active ? 1 : 0};
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(127, 86, 218, 0.3);
`;