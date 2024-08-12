import styled from 'styled-components';
import { Typography } from '@mui/material';
import { colors } from '../../styles/Variables';

export const NavBar = styled.div`
  background-color: ${({ scrolled }) => (scrolled ? `${colors.light}` : 'transparent')} !important; /* Color igual al fondo del buscador */
  backdrop-filter: ${({ scrolled }) => (scrolled ? 'blur(10px)' : 'none')};
  box-shadow: ${({ scrolled }) => (scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none')} !important;
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease;

  @media (max-width: 768px) {
    padding: 10px 15px; /* Añadir padding en pantallas pequeñas */
  }
`;

export const NavLink = styled(Typography)`
  color: ${colors.dark} !important; /* Color del texto */
  font-family: 'Lato', sans-serif !important; /* Nueva fuente */
  font-weight: bold !important;
  font-size: 0.8rem !important; /* Tamaño de la fuente */
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
    background: ${colors.dark} !important;
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
    color: ${colors.accent} !important;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem !important; /* Reducir el tamaño de fuente en pantallas más pequeñas */
    margin: 0 10px !important; /* Reducir margen entre enlaces en pantallas más pequeñas */
  }

  @media (max-width: 480px) {
    font-size: 0.8rem !important; /* Reducir más el tamaño en móviles */
    margin: 0 8px !important;
  }
`;

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

  @media (max-width: 768px) {
    padding: 8px 15px; /* Ajustar padding en pantallas más pequeñas */
    font-size: 0.9rem; /* Reducir el tamaño de fuente */
  }

  @media (max-width: 480px) {
    padding: 7px 12px; /* Reducir padding en móviles */
    font-size: 0.8rem; /* Reducir más el tamaño de fuente en móviles */
  }
`;
