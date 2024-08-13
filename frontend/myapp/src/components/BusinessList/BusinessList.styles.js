// src/pages/BusinessList/BusinessList.styles.js
import styled from 'styled-components';
import { Box, Typography } from '@mui/material';
import { colors, spacing } from '../../styles/Variables';

// Contenedor principal para el listado de negocios
export const BusinessGridContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Ajuste el tamaño mínimo de las columnas */
  gap: ${spacing.medium};
  padding: ${spacing.large} 0; /* Padding superior e inferior */
  width: 100%; /* Asegura que ocupe todo el ancho de la ventana */
  margin: 0 auto; /* Centra el contenedor horizontalmente */
  box-sizing: border-box; /* Asegura que el padding esté incluido en el ancho total */

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Ajusta el tamaño mínimo en pantallas medianas */
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Ajusta el tamaño mínimo en móviles */
  }
`;

// Mensaje cuando no se encuentran negocios
export const NoBusinessesMessage = styled(Typography)`
  color: ${colors.dark};
  text-align: center;
  margin-top: ${spacing.large};
`;
