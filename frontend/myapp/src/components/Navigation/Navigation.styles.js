import styled from 'styled-components';
import { Typography } from '@mui/material';
import { colors } from '../../styles/Variables';

export const NavBar = styled.div`
  background-color: transparent !important; /* Fondo transparente */
  box-shadow: none !important; /* Sin sombra */
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
`;

export const NavLink = styled(Typography)`
  color: ${colors.dark}; /* Color del texto */
  font-family: 'Lato', sans-serif; /* Nueva fuente */
  font-weight: bold;
  font-size: 1rem; /* Tamaño de la fuente reducido */
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease, transform 0.3s ease;
  padding-bottom: 5px;
  text-transform: uppercase;
  margin: 0 15px; /* Espacio entre las opciones */

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
  margin-left: 10px; /* Margen para separarlo de los otros enlaces */

  &:after {
    /* Remover la línea inferior */
    display: none;
  }

  &:hover {
    background-color: ${colors.accent};
    color: ${colors.light};
    transform: scale(1.05);
  }
`;
