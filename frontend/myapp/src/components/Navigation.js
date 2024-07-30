// src/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import styled from 'styled-components';
import logo from '../assets/logo.png';

const NavBar = styled(AppBar)`
  background-color: #FFFFFF;  // Cambiado a blanco
  box-shadow: none;
  color: #333;  // Asegura visibilidad del texto
`;

const Logo = styled('img')`
  height: 70px;
  margin-right: 20px;  // Ajustado para separación visual
`;

const NavButton = styled(Button)`
  color: #FFFFFF !important;  // Texto blanco
  background-color: #004080 !important;  // Fondo azul
  border-radius: 20px !important;
  padding: 10px 20px !important;  // Ajustado el padding para mejor estética
  font-size: 1rem !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.3s;
  &:hover {
    background-color: #0059b2 !important;  // Un azul ligeramente más claro en hover
    transform: translateY(-2px);
  }
`;

const Navigation = () => {
  return (
    <NavBar position="static">
      <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Logo src={logo} alt="DocumentFlow Logo" />
          <Typography component={Link} to="/" variant="h4" sx={{ color: '#004080', fontWeight: 'bold', textDecoration: 'none' }}>
            TaskWave
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <NavButton component={Link} to="/document-upload">
            Subir Documento
          </NavButton>
          <NavButton component={Link} to="/document-list">
            Mis Documentos
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
