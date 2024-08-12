import styled from 'styled-components';
import { Card, CardMedia } from '@mui/material';
import { colors } from '../../styles/Variables';

// Contenedor de la tarjeta de receta
export const RecipeCardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  background-color: ${colors.warmBackground};
  color: ${colors.dark};
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 100%;
  max-width: 100%; 
  height: 400px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    height: 350px; /* Ajustar la altura en pantallas medianas */
  }

  @media (max-width: 480px) {
    height: 300px; /* Ajustar la altura en móviles */
  }
`;

// Estilo de la imagen en la tarjeta de receta
export const StyledCardMedia = styled(CardMedia)`
  height: 220px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 180px; /* Reducir altura de la imagen en pantallas medianas */
  }

  @media (max-width: 480px) {
    height: 150px; /* Reducir altura de la imagen en móviles */
  }
`;
