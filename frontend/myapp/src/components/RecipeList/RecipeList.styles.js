// src/pages/RecipeList/RecipeList.styles.js
import styled from 'styled-components';
import { Box, Typography } from '@mui/material';
import { colors, spacing } from '../../styles/Variables'; // Asegúrate de usar "V" mayúscula para Variables.js

// Contenedor principal para el listado de recetas
export const RecipeGridContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${spacing.large};
  padding: ${spacing.large};
  width: 100%;
  max-width: 100%;
  margin: auto;
`;

// Mensaje cuando no se encuentran recetas
export const NoRecipesMessage = styled(Typography)`
  color: ${colors.dark};
  text-align: center;
  margin-top: ${spacing.large};
`;
