// src/components/RecipeCard/RecipeCard.styles.js
import styled from 'styled-components';
import { Card, CardMedia } from '@mui/material';
import { colors } from '../../styles/Variables'; // Asegúrate de usar "V" mayúscula para Variables.js

// Contenedor de la tarjeta de receta
export const RecipeCardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  background-color: ${colors.warmBackground}; /* Color de fondo beige claro */
  color: ${colors.dark}; /* Texto marrón oscuro */
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

// Estilo de la imagen en la tarjeta de receta
export const StyledCardMedia = styled(CardMedia)`
  height: 180px; /* Altura fija para la imagen */
  object-fit: cover; /* Ajusta la imagen para que ocupe todo el espacio sin distorsión */
`;
