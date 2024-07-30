import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import styled from 'styled-components';

const RecipeCardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  background-color: #FFFACD; // Fondo claro
  color: #654321; // Texto marrón oscuro
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const RecipeCard = ({ recipe }) => {
  if (!recipe) return null; // Manejo básico si no se pasa ninguna receta

  return (
    <RecipeCardContainer>
      <CardMedia
        component="img"
        height="140"
        image={recipe.image || 'default-image.png'} // Imágen predeterminada en caso de no haber URL
        alt={recipe.name || 'Recipe Image'} // Texto alternativo predeterminado
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {recipe.name || 'Recipe Name'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {recipe.description || 'No description available'}
        </Typography>
      </CardContent>
    </RecipeCardContainer>
  );
};

export default RecipeCard;
