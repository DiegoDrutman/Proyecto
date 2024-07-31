import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import styled from 'styled-components';
import { Link as ScrollLink } from 'react-scroll'; // Importar Link de react-scroll
import logo from '../assets/logo.png';

const NavBar = styled(AppBar)`
  background-color: #DAA520;
  box-shadow: none;
  color: #FFFFFF;
  padding: 10px 0;
`;

const Logo = styled.img`
  height: 60px;
  margin-right: 20px;
`;

const NavButton = styled(Button)`
  color: #654321 !important;
  background-color: #FFF8DC !important;
  border-radius: 20px !important;
  padding: 10px 20px !important;
  font-size: 1rem !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.3s;
  &:hover {
    background-color: #FFFAF0 !important;
    transform: translateY(-2px);
  }
`;

const Navigation = ({ isAuthenticated, onLogin, onLogout }) => {
  return (
    <NavBar position="fixed">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Logo src={logo} alt="Logo" />
          <ScrollLink to="home" smooth={true} duration={500}>
            <Typography variant="h4" component="div" sx={{ color: '#FFFFFF', fontWeight: 'bold', cursor: 'pointer' }}>
              MealMaker
            </Typography>
          </ScrollLink>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <ScrollLink to="home" smooth={true} duration={500}>
            <NavButton>Home</NavButton>
          </ScrollLink>
          <ScrollLink to="top-recipes" smooth={true} duration={500}>
            <NavButton>Top Recipes</NavButton>
          </ScrollLink>
          <ScrollLink to="all-recipes" smooth={true} duration={500}>
            <NavButton>All Recipes</NavButton>
          </ScrollLink>
          {isAuthenticated && (
            <ScrollLink to="my-favourites" smooth={true} duration={500}>
              <NavButton>My Favourites</NavButton>
            </ScrollLink>
          )}
          {isAuthenticated ? (
            <NavButton onClick={onLogout}>Logout</NavButton>
          ) : (
            <ScrollLink to="login" smooth={true} duration={500}>
              <NavButton>Login</NavButton>
            </ScrollLink>
          )}
        </Box>
      </Toolbar>
    </NavBar>
  );
};

export default Navigation;
