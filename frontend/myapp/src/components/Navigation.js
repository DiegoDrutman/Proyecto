import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import styled from 'styled-components';
import logo from '../assets/logo.png';

const NavBar = styled(AppBar)`
  background-color: #DAA520;
  box-shadow: none;
  color: #FFFFFF;
`;

const Logo = styled.img`
  height: 70px;
  margin-right: 20px;
`;

const NavButton = styled(Button)`
  color: #654321 !important;
  background-color: #FFF8DC !important;
  border-radius: 20px !important;
  padding: 10px 20px !important;
  font-size: 0.8rem !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.3s;
  &:hover {
    background-color: #FFFAF0 !important;
    transform: translateY(-2px);
  }
`;

const Navigation = () => {
  return (
    <NavBar position="fixed">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Logo src={logo} alt="Logo" />
          <Typography component={RouterLink} to="/" variant="h4" style={{ color: '#FFF', fontWeight: 'bold', textDecoration: 'none', cursor: 'pointer' }}>
            MealMaker
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <NavButton component={RouterLink} to="/">
            Home
          </NavButton>
          <NavButton component={RouterLink} to="/top-recipes">
            Top Recipes
          </NavButton>
          <NavButton component={RouterLink} to="/all-recipes">
            All Recipes
          </NavButton>
        </Box>
      </Toolbar>
    </NavBar>
  );
};

export default Navigation;
