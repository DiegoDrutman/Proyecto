// src/pages/RecipeDetails/RecipeDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, CircularProgress, Alert } from '@mui/material';
import { getRecipeById } from '../../services/api';
import {
  DetailsContainer,
  RecipeImage,
  IngredientList,
  IngredientItem
} from './RecipeDetails.styles'; // Importar los estilos desde el archivo de estilos

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
      <Typography variant="h3" color="primary" gutterBottom>
        {recipe.name}
      </Typography>
      <Typography variant="h5" color="secondary" gutterBottom>
        {recipe.description}
      </Typography>
      <RecipeImage
        component="img"
        src={recipe.image}
        alt={recipe.name}
      />
      <Typography variant="body1" color="text.secondary" gutterBottom>
        <strong>Ingredientes:</strong>
      </Typography>
      <IngredientList>
        {Object.entries(recipe.ingredients).map(([key, value], index) => (
          <IngredientItem key={index}>
            <strong>{key}:</strong> {value}
          </IngredientItem>
        ))}
      </IngredientList>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        <strong>Tiempo de preparación:</strong> {recipe.preparation_time} minutos
      </Typography>
    </DetailsContainer>
  );
};

export default RecipeDetails;
