// src/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import styled from 'styled-components';
import logo from '../assets/logo.png';

const NavBar = styled(AppBar)`
  background-color: #E5E4E2;
  box-shadow: none;
`;

const Logo = styled('img')`
  height: 50px;
  margin-right: 10px;
`;

const NavButton = styled(Button)`
  color: #004080 !important;
  background-color: #ffffff !important;
  border-radius: 20px !important;
  padding: 5px 20px !important;
  font-size: 0.8rem !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.3s;
  &:hover {
    background-color: #f0f0f0 !important;
    transform: translateY(-2px);
  }
`;

const NavM = styled(Button)`
  color: #004080 !important;
  border-radius: 5px !important;
  padding: 8px 16px !important;
  &:hover {
    background-color: rgba(255, 255, 255, 0.9) !important;
  }
`;

const Navigation = () => {
  return (
    <NavBar position="static">
      <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Logo src={logo} alt="TaskWave Logo" />
          <NavM component={Link} to="/">
            <Typography variant="h4" sx={{ color: '#004080', '@media (max-width: 600px)': { fontSize: '1.5rem' } }}>
              TaskWave
            </Typography>
          </NavM>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, '@media (max-width: 600px)': { flexDirection: 'column', alignItems: 'center', gap: 1, width: '100%' } }}>
          <NavButton component={Link} to="/login" sx={{ '@media (max-width: 600px)': { width: '100%' } }}>
            Login
          </NavButton>
        </Box>
      </Toolbar>
    </NavBar>
  );
};

export default Navigation;
