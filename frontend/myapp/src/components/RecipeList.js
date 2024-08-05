// src/pages/RecipeList.js
import React, { useState, useEffect } from 'react';
import { CircularProgress, Alert, Grid } from '@mui/material';
import { getRecipes } from '../services/api';  // Importa correctamente desde api.js
import RecipeCard from '../components/RecipeCard';

const RecipeList = ({ searchTerm }) => { // Recibe searchTerm como prop
  const [recipes, setRecipes] = useState([]); // Estado para recetas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes(searchTerm); // Llama a la API con el término de búsqueda
        setRecipes(data); // Actualiza el estado de recetas
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las recetas');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [searchTerm]); // Añade searchTerm como dependencia para la búsqueda dinámica

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Grid container spacing={2} justifyContent="center">
      {recipes.map((recipe) => (
        <Grid item key={recipe.id} xs={12} sm={6} md={4}>
          <RecipeCard recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RecipeList;
