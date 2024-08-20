// src/components/BusinessCard/BusinessCard.styles.js
import styled from 'styled-components';
import { Card, CardMedia } from '@mui/material';
import { colors } from '../../styles/Variables';

// Contenedor de la tarjeta de negocio
export const BusinessCardContainer = styled(Card)`
  flex: 0 1 calc(33.333% - 40px); /* Asegura que cada tarjeta ocupe 1/3 del contenedor con espacio entre ellas */
  margin: 20px; /* Añade un margen entre las tarjetas */
  background-color: ${colors.warmBackground};
  color: ${colors.dark};
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 350px;
  border: 3px solid ${colors.primary};

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

// Estilo de la imagen en la tarjeta de negocio
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
