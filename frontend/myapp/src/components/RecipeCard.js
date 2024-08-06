// src/components/RecipeCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const RecipeCardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  background-color: #f5f5dc; /* Color de fondo beige claro */
  color: #654321; /* Texto marrón oscuro */
  border-radius: 10px; /* Bordes redondeados para un look moderno */
  overflow: hidden; /* Para que la imagen se ajuste correctamente */
  transition: transform 0.3s, box-shadow 0.3s; /* Transiciones suaves para hover */
  width: 300px; /* Ancho fijo para las tarjetas */
  height: 350px; /* Altura fija para las tarjetas */
  &:hover {
    transform: scale(1.05); /* Efecto de aumento en hover */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Sombra en hover */
  }
`;

const StyledCardMedia = styled(CardMedia)`
  height: 180px; /* Altura fija para la imagen */
  object-fit: cover; /* Ajusta la imagen para que ocupe todo el espacio sin distorsión */
`;

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
