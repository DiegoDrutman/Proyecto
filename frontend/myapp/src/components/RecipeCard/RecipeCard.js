// src/components/RecipeCard/RecipeCard.js
import React from 'react';
import { CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RecipeCardContainer, StyledCardMedia } from './RecipeCard.styles'; // Importar los estilos desde el archivo de estilos

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  if (!recipe) return null;
  const defaultImage = 'default-image.png';

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.id}`); // Redirige a la página de detalles de la receta
  };

  return (
    <CardActionArea onClick={handleCardClick}>
      <RecipeCardContainer>
        <StyledCardMedia
          component="img"
          image={recipe.image ? recipe.image : defaultImage}
          alt={recipe.name || 'Imagen de receta'}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {recipe.name || 'Nombre de receta'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: '8px' }}>
            {recipe.description
              ? `${recipe.description.substring(0, 50)}...` // Muestra solo 50 caracteres de la descripción
              : 'No hay descripción disponible'}
          </Typography>
        </CardContent>
      </RecipeCardContainer>
    </CardActionArea>
  );
};

export default RecipeCard;
