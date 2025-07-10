import React, { useState } from 'react';
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip } from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const AccountMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const { currentRole, currentUser } = useSelector(state => state.user);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <GradientAvatar>
                            {String(currentUser.name).charAt(0)}
                        </GradientAvatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: styles.styledPaper,
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <StyledMenuItem>
                    <Avatar sx={{ mr: 1, bgcolor: '#e0c3fc', color: '#6d35a7', fontWeight: 700 }}>{String(currentUser.name).charAt(0)}</Avatar>
                    <StyledProfileLink to={`/${currentRole}/profile`}>
                        Profile
                    </StyledProfileLink>
                </StyledMenuItem>
                <Divider />
                <StyledMenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    <span>Settings</span>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <StyledProfileLink to="/logout">
                        Logout
                    </StyledProfileLink>
                </StyledMenuItem>
            </Menu>
        </>
    );
}

export default AccountMenu

const styles = {
    styledPaper: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    }
}

const GradientAvatar = styled(Avatar)`
  background: linear-gradient(135deg, #e0c3fc 0%, #6d35a7 100%);
  color: #fff;
  font-weight: 700;
  border: 2px solid #fff;
  box-shadow: 0 2px 8px rgba(85,0,128,0.10);
`;
const StyledMenuItem = styled(MenuItem)`
  padding: 12px 22px;
  border-radius: 12px;
  font-size: 1.08rem;
  font-weight: 500;
  color: #2c2143;
  transition: background 0.18s;
  &:hover {
    background: #f3eaff;
    color: #6d35a7;
  }
`;
const StyledProfileLink = styled(Link)`
  color: #6d35a7;
  font-weight: 700;
  text-decoration: none;
  padding: 4px 12px;
  border-radius: 8px;
  background: #e0c3fc;
  margin-left: 6px;
  transition: background 0.18s, color 0.18s;
  &:hover {
    background: #6d35a7;
    color: #fff;
    text-decoration: none;
  }
`;