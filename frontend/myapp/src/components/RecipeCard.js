import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import styled from 'styled-components';

// Estilos personalizados para el contenedor de la tarjeta
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

// Estilos personalizados para el contenido de la tarjeta
const StyledCardContent = styled(CardContent)`
  padding: 16px; /* Espaciado uniforme dentro de la tarjeta */
  text-align: left; /* Alineación del texto a la izquierda */
  flex-grow: 1; /* Permitir que el contenido se expanda */
`;

// Componente RecipeCard
const RecipeCard = ({ recipe }) => {
  if (!recipe) return null; // Manejo básico si no se pasa ninguna receta

  // Usa una imagen predeterminada si no hay imagen proporcionada
  const defaultImage = 'default-image.png'; // Ruta a la imagen predeterminada

  return (
    <RecipeCardContainer>
      <CardMedia
        component="img"
        height="180" // Altura ajustada para mejor presentación
        image={recipe.image ? recipe.image : defaultImage} // Imágen predeterminada si no hay imagen
        alt={recipe.name || 'Imagen de receta'} // Texto alternativo
      />
      <StyledCardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          {recipe.name || 'Nombre de receta'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: '8px' }}>
          {recipe.description ? `${recipe.description.substring(0, 100)}...` : 'No hay descripción disponible'} {/* Limitando la descripción a 100 caracteres */}
        </Typography>
        {/* Puedes añadir más detalles aquí si es necesario */}
        {recipe.preparationTime && (
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: '8px' }}>
            Tiempo de preparación: {recipe.preparationTime} minutos
          </Typography>
        )}
        {recipe.ingredients && (
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: '8px' }}>
            Ingredientes: {recipe.ingredients.join(', ')} {/* Supongo que ingredients es un array */}
          </Typography>
        )}
      </StyledCardContent>
    </RecipeCardContainer>
  );
};

export default RecipeCard;
