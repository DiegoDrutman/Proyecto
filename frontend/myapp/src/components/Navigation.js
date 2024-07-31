import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import styled from 'styled-components';
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

const NavLink = styled(Typography)`
  color: #FFFFFF;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  margin-right: 20px;
  font-size: 2rem;
`;

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    window.scrollTo({
      top: section.offsetTop - 70, // Ajustar el desplazamiento si el header está fijo
      behavior: 'smooth'
    });
  }
};

const Navigation = () => {
  return (
    <NavBar position="fixed">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Logo src={logo} alt="Logo" />
          <NavLink onClick={() => scrollToSection('home')}>
            MealMaker
          </NavLink>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <NavButton onClick={() => scrollToSection('home')}>
            Home
          </NavButton>
          <NavButton onClick={() => scrollToSection('top-recipes')}>
            Top Recipes
          </NavButton>
          <NavButton onClick={() => scrollToSection('all-recipes')}>
            All Recipes
          </NavButton>
        </Box>
      </Toolbar>
    </NavBar>
  );
};

export default Navigation;
