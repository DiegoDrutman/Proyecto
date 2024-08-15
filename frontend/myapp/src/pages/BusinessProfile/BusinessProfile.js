import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Alert, Avatar, Box } from '@mui/material';
import { getBusinessProfile } from '../../services/api'; // Cambia la función API para obtener el perfil de la empresa
import {
  FullScreenContainer,
  ContentWrapper,
} from './BusinessProfile.styles'; // Renombra los estilos según sea necesario

const BusinessProfilePage = () => {
  const [business, setBusiness] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorProfile, setErrorProfile] = useState('');

  useEffect(() => {
    const fetchBusinessProfile = async () => {
      try {
        setLoadingProfile(true);
        const businessData = await getBusinessProfile(); // Asegúrate de tener una función para obtener el perfil de la empresa
        setBusiness(businessData);
        setLoadingProfile(false);
      } catch (error) {
        console.error('Error fetching business profile:', error);
        setErrorProfile('Error al cargar el perfil de la empresa.');
        setLoadingProfile(false);
      }
    };

    fetchBusinessProfile();
  }, []);

  return (
    <FullScreenContainer>
      <ContentWrapper>
        <Typography variant="h3" gutterBottom>
          Mi Empresa
        </Typography>
        {loadingProfile ? (
          <CircularProgress />
        ) : errorProfile ? (
          <Alert severity="error">{errorProfile}</Alert>
        ) : (
          business && (
            <Box textAlign="center">
              <Avatar
                alt={business.name}
                src={business.image || 'https://via.placeholder.com/100'}
                sx={{ width: 100, height: 100, marginBottom: 2 }}
              />
              <Typography variant="h4" gutterBottom>
                {business.name}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Categoría: {business.category}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Dirección: {business.address}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Miembro desde: {new Date(business.created_at).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Horario de operación: {business.operating_hours}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Descripción: {business.description}
              </Typography>
            </Box>
          )
        )}
      </ContentWrapper>
    </FullScreenContainer>
  );
};

export default BusinessProfilePage;
