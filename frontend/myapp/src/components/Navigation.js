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
  color: #222222 !important; /* Asegurarse de que el color se aplique */  
  border-radius: 5px !important; /* Añade bordes redondeados para un mejor diseño */
  padding: 8px 16px !important; /* Ajusta el padding para que sean más grandes */
  &:hover {
    background-color: rgba(255, 255, 255, 0.9) !important; /* Fondo más claro en hover */
  }
`;

const NavM = styled(Button)`
  color: #004080 !important; /* Asegurarse de que el color se aplique */
  border-radius: 5px !important; /* Añade bordes redondeados para un mejor diseño */
  padding: 8px 16px !important; /* Ajusta el padding para que sean más grandes */
  &:hover {
    background-color: rgba(255, 255, 255, 0.9) !important; /* Fondo más claro en hover */
  }
`;

const Navigation = () => {
  return (
    <NavBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Logo src={logo} alt="TaskWave Logo" />
          <NavM component={Link} to="/">
          <Typography variant="h4" sx={{ color: '#004080' }}>
            TaskWave
          </Typography>
          </NavM>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <NavButton component={Link} to="/projects/add" >
            Get Started
          </NavButton>
          <NavButton component={Link} to="/login">
            Login
          </NavButton>
        </Box>
      </Toolbar>
    </NavBar>
  );
};

export default Navigation;
