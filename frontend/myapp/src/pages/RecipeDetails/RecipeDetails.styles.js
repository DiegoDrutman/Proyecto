import styled from 'styled-components';
import { Box, Typography } from '@mui/material';
import { colors, spacing } from '../../styles/Variables';

// Wrapper para la receta, estilo de dos columnas
export const RecipeWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 40px auto;
  padding: ${spacing.medium};

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 20px auto;
  }
`;

// Contenedor para los ingredientes
export const IngredientsContainer = styled(Box)`
  flex: 1;
  background-color: ${colors.light};
  padding: ${spacing.medium};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-right: ${spacing.large};

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: ${spacing.large};
  }
`;

// Contenedor para la preparación
export const PreparationContainer = styled(Box)`
  flex: 2;
  background-color: ${colors.light};
  padding: ${spacing.medium};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

// Sección superior de la receta
export const HeaderContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.primary};
  padding: ${spacing.large};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  max-width: 1200px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Contenedor para el texto en la sección superior
export const TextContainer = styled(Box)`
  flex: 1;
  color: ${colors.light};
  margin-right: ${spacing.large};

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: ${spacing.large};
    text-align: center;
  }
`;

// Imagen de la receta en la sección superior
export const RecipeImage = styled(Box)`
  width: 100%;
  max-width: 400px;
  border-radius: 8px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

// Estilo para la etiqueta del tiempo
export const TimeTag = styled(Box)`
  background-color: ${colors.secondary};
  color: ${colors.light};
  padding: ${spacing.small} ${spacing.medium};
  border-radius: 4px;
  font-weight: bold;
  display: inline-block;
  margin-bottom: ${spacing.small};
`;

// Título de la receta en la sección superior
export const RecipeTitle = styled(Typography)`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${colors.light};
  margin-bottom: ${spacing.medium};

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

// Lista de ingredientes
export const IngredientList = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${spacing.medium} 0;
`;

// Item de ingrediente
export const IngredientItem = styled.li`
  margin-bottom: ${spacing.small};
  color: ${colors.dark};
  font-size: 1rem;
  border-bottom: 1px solid ${colors.light};
  padding-bottom: ${spacing.small};

  &:last-child {
    border-bottom: none;
  }
`;

// Título de las secciones
export const SectionTitle = styled(Typography)`
  margin-bottom: ${spacing.medium};
  font-weight: bold;
  color: ${colors.primary};
`;

// Lista de pasos de preparación
export const PreparationSteps = styled.ol`
  list-style-position: outside;
  padding-left: ${spacing.medium};
`;

// Paso individual de preparación
export const PreparationStep = styled.li`
  margin-bottom: ${spacing.medium};
  color: ${colors.dark};
  font-size: 1rem;
  padding-left: 0.5rem; /* Ajuste para alinear el texto con el número */
`;