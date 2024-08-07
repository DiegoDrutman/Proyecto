// src/pages/RecipeList/RecipeList.styles.js
import styled from 'styled-components';
import { Grid, Typography } from '@mui/material';
import { colors, spacing } from '../../styles/Variables'; // Asegúrate de usar "V" mayúscula para Variables.js

// Contenedor principal para el listado de recetas
export const RecipeGridContainer = styled(Grid)`
  padding: ${spacing.large};
  justify-content: center;
`;

// Mensaje cuando no se encuentran recetas
export const NoRecipesMessage = styled(Typography)`
  color: ${colors.dark};
  text-align: center;
  margin-top: ${spacing.large};
`;
