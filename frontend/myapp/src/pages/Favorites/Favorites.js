// src/pages/Favorites/Favorites.js
import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Alert } from '@mui/material';
import UserProfile from '../../components/UserProfile/UserProfile'; 
import { getUserProfile } from '../../services/api';
import {
  FullScreenContainer,
  ContentWrapper,
} from './Favorites.styles'; // Importar los estilos desde el archivo de estilos

const Favorites = () => {
  const [user, setUser] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorProfile, setErrorProfile] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoadingProfile(true);
        const userData = await getUserProfile();
        setUser(userData);
        setLoadingProfile(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setErrorProfile('Error al cargar el perfil del usuario.');
        setLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <FullScreenContainer>
      <ContentWrapper>
        <Typography variant="h3" gutterBottom>
          Mi Perfil
        </Typography>
        {loadingProfile ? (
          <CircularProgress />
        ) : errorProfile ? (
          <Alert severity="error">{errorProfile}</Alert>
        ) : (
          user && <UserProfile user={user} />
        )}
      </ContentWrapper>
    </FullScreenContainer>
  );
};

export default Favorites;
