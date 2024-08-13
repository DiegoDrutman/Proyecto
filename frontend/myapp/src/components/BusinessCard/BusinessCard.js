// src/components/BusinessCard/BusinessCard.js
import React from 'react';
import { CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BusinessCardContainer, StyledCardMedia } from './BusinessCard.styles'; // Asegúrate de que estás importando desde BusinessCard.styles

const BusinessCard = ({ business }) => {
  const navigate = useNavigate();

  if (!business) return null;
  const defaultImage = 'default-business-image.png';

  const handleCardClick = () => {
    navigate(`/business/${business.id}`); // Redirige a la página de detalles del negocio
  };

  return (
    <CardActionArea onClick={handleCardClick}>
      <BusinessCardContainer>
        <StyledCardMedia
          component="img"
          image={business.image ? business.image : defaultImage}
          alt={business.name || 'Imagen del negocio'}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {business.name || 'Nombre del negocio'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: '8px' }}>
            {business.description
              ? `${business.description.substring(0, 50)}...` // Muestra solo 50 caracteres de la descripción
              : 'No hay descripción disponible'}
          </Typography>
        </CardContent>
      </BusinessCardContainer>
    </CardActionArea>
  );
};

export default BusinessCard;
