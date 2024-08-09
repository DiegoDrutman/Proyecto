// src/pages/RecipeList/RecipeList.styles.js
import styled from 'styled-components';
import { Box, Typography } from '@mui/material';
import { colors, spacing } from '../../styles/Variables';

// Contenedor principal para el listado de recetas
export const RecipeGridContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Ajuste el tamaño mínimo de las columnas */
  gap: ${spacing.medium};
  padding: ${spacing.large} 0; /* Padding superior e inferior */
  width: 90vw; /* Asegura que ocupe todo el ancho de la ventana */
  margin-left: -325px; /* Centra el contenedor */
  overflow: hidden; /* Elimina el scroll horizontal */
  box-sizing: border-box; /* Asegura que el padding esté incluido en el ancho total */
`;

// Mensaje cuando no se encuentran recetas
export const NoRecipesMessage = styled(Typography)`
  color: ${colors.dark};
  text-align: center;
  margin-top: ${spacing.large};
`;
