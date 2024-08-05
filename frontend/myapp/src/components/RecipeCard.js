import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import styled from 'styled-components';

const RecipeCardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  background-color: #F5F5DC; /* Color de fondo beige claro */
  color: #654321; /* Texto marrón oscuro */
  border-radius: 10px; /* Bordes redondeados para un look moderno */
  overflow: hidden; /* Para que la imagen se ajuste correctamente */
  transition: transform 0.3s, box-shadow 0.3s; /* Transiciones suaves para hover */
  &:hover {
    transform: scale(1.05); /* Efecto de aumento en hover */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Sombra en hover */
  }
`;

const StyledCardContent = styled(CardContent)`
  padding: 16px; /* Espaciado uniforme dentro de la tarjeta */
  text-align: left; /* Alineación del texto a la izquierda */
  flex-grow: 1; /* Permitir que el contenido se expanda */
`;

const RecipeCard = ({ recipe }) => {
  if (!recipe) return null;
  const defaultImage = 'default-image.png';

  return (
    <RecipeCardContainer>
      <CardMedia
        component="img"
        height="180"
        image={recipe.image ? recipe.image : defaultImage}
        alt={recipe.name || 'Imagen de receta'}
      />
      <StyledCardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          {recipe.name || 'Nombre de receta'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: '8px' }}>
          {recipe.description ? `${recipe.description.substring(0, 100)}...` : 'No hay descripción disponible'} {/* Limitando la descripción a 100 caracteres */}
        </Typography>
        {recipe.preparationTime && (
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: '8px' }}>
            Tiempo de preparación: {recipe.preparationTime} minutos
          </Typography>
        )}
        {recipe.ingredients && (
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: '8px' }}>
            Ingredientes: {recipe.ingredients.join(', ')}
          </Typography>
        )}
      </StyledCardContent>
    </RecipeCardContainer>
  );
};

export default RecipeCard;
