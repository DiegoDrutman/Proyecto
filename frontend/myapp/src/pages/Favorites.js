// src/pages/Favorites.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, CircularProgress, Alert } from '@mui/material';
import styled from 'styled-components';
import RecipeCard from '../components/RecipeCard';
import UserProfile from '../components/UserProfile'; // Importar el componente UserProfile
import { getUserProfile, getFavoriteRecipes } from '../services/api'; // Importar correctamente

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
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const profileData = await getUserProfile(); // Llama a la función API para obtener el perfil del usuario
        setUser(profileData);
      } catch (err) {
        setError('Error al cargar el perfil del usuario.');
      } finally {
        setLoading(false);
      }
    };

    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const favoriteRecipes = await getFavoriteRecipes(); // Llama a la función API para obtener recetas favoritas
        setFavorites(favoriteRecipes);
      } catch (err) {
        setError('Error al cargar las recetas favoritas.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
    fetchFavorites();
  }, []);

  return (
    <FullScreenContainer>
      <ContentWrapper>
        <Typography variant="h3" gutterBottom>
          Mi Perfil
        </Typography>
        {/* Información del Perfil del Usuario */}
        {user ? (
          <UserProfile user={user} />
        ) : (
          <CircularProgress />
        )}

        <Typography variant="h3" gutterBottom>
          Mis Recetas Favoritas
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
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
