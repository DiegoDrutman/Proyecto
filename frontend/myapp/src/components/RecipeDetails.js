// src/pages/RecipeDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import styled from 'styled-components';
import { getRecipeById } from '../services/api';

const colors = {
  primary: '#8B4513',
  secondary: '#A0522D',
  light: '#FFF8E1',
  dark: '#5C4033',
  accent: '#DAA520',
  warmBackground: '#FFF8DC',
};

const DetailsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${colors.light};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 150px auto;
`;

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id);
        setRecipe(data); // Aquí se asigna la receta completa
      } catch (error) {
        setError('Error al cargar los detalles de la receta.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!recipe) return <Typography>No se encontró la receta.</Typography>;

  return (
    <DetailsContainer>
      <Typography variant="h3" color={colors.primary} gutterBottom>
        {recipe.name}
      </Typography>
      <Typography variant="h5" color={colors.secondary} gutterBottom>
        {recipe.description}
      </Typography>
      <Box
        component="img"
        src={recipe.image}
        alt={recipe.name}
        sx={{ width: '100%', maxWidth: '600px', borderRadius: '10px', marginBottom: '20px' }}
      />
      <Typography variant="body1" color={colors.dark} gutterBottom>
        <strong>Ingredientes:</strong>
      </Typography>
      <ul>
        {Object.entries(recipe.ingredients).map(([key, value], index) => (
          <li key={index}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
      <Typography variant="body1" color={colors.dark} gutterBottom>
        <strong>Tiempo de preparación:</strong> {recipe.preparation_time} minutos
      </Typography>
    </DetailsContainer>
  );
};

export default RecipeDetails;
