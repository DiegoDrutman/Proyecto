import styled from 'styled-components';
import { Box, Typography } from '@mui/material';
import { colors, spacing } from '../../styles/Variables';

// Contenedor principal para el listado de negocios utilizando Flexbox
export const BusinessGridContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap; /* Permite que los elementos se envuelvan a la siguiente línea */
  justify-content: flex-start; /* Asegura que los elementos se alineen al inicio */
  gap: ${spacing.medium}; /* Espacio entre las tarjetas */
  width: 100%;
  padding: ${spacing.large} 0;
  margin: 0 auto;
  box-sizing: border-box;
`;

// Mensaje cuando no se encuentran negocios
export const NoBusinessesMessage = styled(Typography)`
  color: ${colors.secondary};
  text-align: center;
  margin-top: ${spacing.large};
`;
