// src/components/Navigation/Navigation.styles.js
import styled from 'styled-components';
import { AppBar, Typography } from '@mui/material';
import { colors } from '../../styles/Variables'; // Asegúrate de importar Variables.js con "V" mayúscula

// Estilos del componente AppBar (barra de navegación)
export const NavBar = styled(AppBar)`
  background-color: ${colors.primary}33; /* Usando color primario con opacidad */
  box-shadow: none;
  backdrop-filter: blur(5px);
  color: ${colors.dark};
  padding: 5px 0;
  transition: background-color 0.3s ease;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1100;
`;

// Estilos para los enlaces de navegación
export const NavLink = styled(Typography)`
  text-decoration: none;
  color: ${colors.dark};
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.secondary};
    transform: scale(1.05);
  }
`;

