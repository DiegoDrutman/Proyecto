// src/pages/Favorites.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, CircularProgress, Alert } from '@mui/material';
import styled from 'styled-components';
import RecipeCard from '../components/RecipeCard';
import UserProfile from '../components/UserProfile'; // Importar el componente UserProfile

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
  const [user, setUser] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    avatar: 'avatar.jpg', // Imagen de avatar (ruta o URL)
    joinedDate: '2023-01-15', // Fecha de registro
    // Otros detalles del usuario
  });

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        setError('');

        // Realiza una llamada a la API aquí
        // Ejemplo: const response = await fetch('URL_DE_TU_API');
        // const data = await response.json();

        // Temporizador para simular la carga (solo para fines de demostración)
        setTimeout(() => {
          // Simular respuesta de API (elimina esto cuando tengas la API real)
          const data = [
            { id: 1, name: 'Tacos al Pastor', image: 'tacos.jpg', rating: 4.5 },
            { id: 2, name: 'Paella Valenciana', image: 'paella.jpg', rating: 4.7 },
            { id: 3, name: 'Sushi', image: 'sushi.jpg', rating: 4.8 },
          ];

          setFavorites(data);
          setLoading(false);
        }, 1000);

        // Cuando tengas la API real, elimina el código de simulación y usa lo siguiente:
        // setFavorites(data);
        // setLoading(false);

      } catch (err) {
        setError('Error al cargar las recetas favoritas.');
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <FullScreenContainer>
      <ContentWrapper>
        <Typography variant="h3" gutterBottom>
          Mi Perfil
        </Typography>
        {/* Información del Perfil del Usuario */}
        <UserProfile user={user} />

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
