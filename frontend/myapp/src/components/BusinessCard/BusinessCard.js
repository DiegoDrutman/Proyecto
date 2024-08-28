import React from 'react';
import { CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BusinessCardContainer, StyledCardMedia } from './BusinessCard.styles';
import defaultImage from '../../assets/default-business-image.png'

const BusinessCard = ({ business }) => {
  const navigate = useNavigate();

  if (!business || !business.approved) return null; // Asegurarse de que solo se muestran negocios aprobados

  const handleCardClick = () => {
    if (business.id) {
      navigate(`/business/${business.id}`); // Redirige a la página de detalles del negocio
    }
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
