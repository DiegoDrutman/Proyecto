// src/pages/Favorites.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, CircularProgress, Alert } from '@mui/material';
import styled from 'styled-components';
import RecipeCard from '../components/RecipeCard';
import UserProfile from '../components/UserProfile'; 
import { getUserProfile, getFavoriteRecipes } from '../services/api'; // Importar funciones de API

// Estilos para el contenedor de la pantalla completa
const FullScreenContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
  padding: 20px;
  padding-top: 120px;
`;

// Estilos para el contenedor del contenido
const ContentWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  padding: 20px;
`;

const Favorites = () => {
  const [user, setUser] = useState(null); // Inicializar como null
  const [favorites, setFavorites] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [errorProfile, setErrorProfile] = useState('');
  const [errorFavorites, setErrorFavorites] = useState('');

  // Obtener perfil del usuario
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoadingProfile(true);
        const userData = await getUserProfile(); // Llamar a la función de la API
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

  // Obtener recetas favoritas
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

        <Typography variant="h3" gutterBottom>
          Mis Recetas Favoritas
        </Typography>
        {loadingFavorites ? (
          <CircularProgress />
        ) : errorFavorites ? (
          <Alert severity="error">{errorFavorites}</Alert>
        ) : (
          <Grid container spacing={2} justifyContent="center">
            {favorites.map((recipe) => (
              <Grid item key={recipe.id} xs={12} sm={6} md={4}>
                <RecipeCard recipe={recipe} />
              </Grid>
            ))}
          </Grid>
        )}
      </ContentWrapper>
    </FullScreenContainer>
  );
};

export default Favorites;
