// src/pages/RecipeDetails/RecipeDetails.styles.js
import styled from 'styled-components';
import { Box } from '@mui/material';
import { colors, spacing } from '../../styles/Variables'; // Asegúrate de usar "V" mayúscula para Variables.js

// Contenedor de los detalles de la receta
export const DetailsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${spacing.medium};
  background-color: ${colors.light};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 150px auto;
`;

// Imagen de la receta
export const RecipeImage = styled(Box)`
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  margin-bottom: ${spacing.medium};
`;

// Lista de ingredientes
export const IngredientList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// Elemento de ingrediente
export const IngredientItem = styled.li`
  margin-bottom: ${spacing.small};
  color: ${colors.dark};

  strong {
    color: ${colors.primary};
  }
`;
