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
  color: #004080 !important; /* Texto principal */
  background-color: #ffffff !important; /* Fondo blanco */
  border-radius: 20px !important; /* Bordes redondeados */
  padding: 5px 20px !important; /* Ajusta el padding para que sean más grandes */
  font-size: 0.8rem !important; /* Tamaño de fuente */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra ligera */
  transition: background-color 0.3s, transform 0.3s; /* Transiciones suaves */
  &:hover {
    background-color: #f0f0f0 !important; /* Fondo más claro en hover */
    transform: translateY(-2px); /* Efecto de elevación en hover */
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
