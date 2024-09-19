import React from 'react';
import { CardContent, Typography, CardActionArea, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BusinessCardContainer } from './BusinessCard.styles';
import defaultImage from '../../assets/default-image.jpg';

const BusinessCard = ({ business }) => {
  const navigate = useNavigate();

  if (!business || !business.approved) return null;

  // Aquí usamos el logo directamente si está definido
  const logoUrl = business.logo || defaultImage;

  const handleCardClick = () => {
    if (business.id) {
      navigate(`/business/${business.id}`);
    }
  };

  return (
    <CardActionArea onClick={handleCardClick}>
      <BusinessCardContainer
        sx={{
          boxShadow: 3, // Añadir sombra a la tarjeta
          transition: 'transform 0.2s ease-in-out', // Transición suave para hover
          '&:hover': {
            transform: 'scale(1.05)', // Aumentar tamaño al pasar el cursor
          },
        }}
      >
        <CardMedia
          component="img"
          image={logoUrl}  // Usamos logoUrl directamente
          alt={business.name || 'Imagen del negocio'}
          title={business.name || 'Imagen del negocio'}
          sx={{ height: 140, objectFit: 'cover' }}  // Mantener la imagen centrada y con relación de aspecto
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {business.name || 'Nombre del negocio'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: '8px' }}>
            {business.description
              ? `${business.description.substring(0, 100)}...`  // Limitar a 100 caracteres
              : 'No hay descripción disponible'}
          </Typography>
        </CardContent>
      </BusinessCardContainer>
    </CardActionArea>
  );
};

export default BusinessCard;
