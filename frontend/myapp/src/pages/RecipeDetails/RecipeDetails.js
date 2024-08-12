import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, CircularProgress, Alert } from '@mui/material';
import { getRecipeById } from '../../services/api';
import {
  RecipeWrapper,
  IngredientsContainer,
  PreparationContainer,
  IngredientList,
  IngredientItem,
  SectionTitle,
  PreparationSteps,
  PreparationStep,
  HeaderContainer,
  RecipeImage,
  TextContainer,
  TimeTag,
  RecipeTitle
} from './RecipeDetails.styles';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
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

  const ingredients = recipe.ingredients ? Object.entries(recipe.ingredients) : [];
  const steps = recipe.steps && Array.isArray(recipe.steps) ? recipe.steps : [];

  return (
    <>
      <HeaderContainer>
        <TextContainer style={{ fontSize: '1.4rem' }}>
          <TimeTag>{recipe.preparation_time} min</TimeTag>
          <RecipeTitle style={{ fontSize: '2.5rem' }}>{recipe.name}</RecipeTitle>
          <Typography variant="body1" style={{ fontSize: '1.4rem' }}>{recipe.description}</Typography>
        </TextContainer>
        <RecipeImage component="img" src={recipe.image} alt={recipe.name} />
      </HeaderContainer>
      
      <RecipeWrapper>
        <IngredientsContainer>
          <SectionTitle variant="h4">Ingredientes</SectionTitle>
          <IngredientList>
            {ingredients.map(([key, value], index) => (
              <IngredientItem key={index}>
                <strong>{key}:</strong> {value}
              </IngredientItem>
            ))}
          </IngredientList>
        </IngredientsContainer>

        {/* Sección de Preparación */}
        {steps.length > 0 && (
          <PreparationContainer>
            <SectionTitle variant="h4">Preparación</SectionTitle>
            <PreparationSteps>
              {steps.map((step, index) => (
                <PreparationStep key={index}>
                  <Typography variant="body1" style={{ marginLeft: '0.5rem' }}>{step}</Typography>
                </PreparationStep>
              ))}
            </PreparationSteps>
          </PreparationContainer>
        )}
      </RecipeWrapper>
    </>
  );
};

export default RecipeDetails;