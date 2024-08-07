// src/components/Navigation/Navigation.styles.js

import styled from 'styled-components';
import { Typography } from '@mui/material';
import { colors } from '../../styles/Variables';

export const NavBar = styled.div`
  background-color: ${colors.warmBackground};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
`;

export const NavLink = styled(Typography)`
  color: ${colors.dark};
  font-weight: bold;
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease, transform 0.3s ease;
  padding-bottom: 5px;
  text-transform: uppercase;

  &:after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: ${colors.dark};
    transition: width 0.3s;

    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  &:hover:after {
    width: 100%;
  }

  &:hover {
    color: ${colors.accent};
    transform: scale(1.05);
  }
`;

// Componente específico para el botón "Ingresar"
export const IngresarLink = styled(NavLink)`
  border: 1px solid ${colors.dark};
  border-radius: 5px;
  padding: 10px 20px;
  margin-left: 10px; // Margen para separarlo de los otros enlaces

  &:after {
    // Remover la línea inferior
    display: none;
  }

  &:hover {
    background-color: ${colors.accent};
    color: ${colors.light};
    transform: scale(1.05);
  }
`;
