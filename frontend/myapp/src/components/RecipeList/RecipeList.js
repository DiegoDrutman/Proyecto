// src/pages/RecipeList/RecipeList.js
import React, { useState, useEffect } from 'react';
import { CircularProgress, Alert } from '@mui/material';
import { getRecipes } from '../../services/api'; // Importa correctamente desde api.js
import RecipeCard from '../../components/RecipeCard/RecipeCard'; // Asegúrate de importar el componente correctamente
import { RecipeGridContainer, NoRecipesMessage } from './RecipeList.styles'; // Importar los estilos desde el archivo de estilos

const RecipeList = ({ searchTerm }) => {
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
    <RecipeGridContainer>
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
      ) : (
        <NoRecipesMessage variant="h6">
          No se encontraron recetas.
        </NoRecipesMessage>
      )}
    </RecipeGridContainer>
  );
};

export default RecipeList;
