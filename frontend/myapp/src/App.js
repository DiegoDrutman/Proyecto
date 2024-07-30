import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, CircularProgress, Alert } from '@mui/material';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import RecipeSearchBar from './components/RecipeSearchBar';
import RecipeCard from './components/RecipeCard';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import { getRecipes } from './services/api';

// Animaciones
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const colors = {
  primary: '#8B4513',
  secondary: '#FFD700',
  light: '#FFFACD',
  dark: '#654321',
  accent: '#DAA520',
  warmBackground: '#FFF8DC',
};

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', 'Open Sans', sans-serif;
    background-color: ${colors.warmBackground};
    color: ${colors.dark};
  }
`;

const FullScreenContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
  padding: 20px;
  padding-top: 80px;
`;

const ContentWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  padding: 40px 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const FeatureGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  width: 100%;
  justify-items: center;
`;

const FeaturePaper = styled(Box)`
  background-color: ${colors.light};
  padding: 30px;
  border-radius: 10px;
  color: ${colors.dark};
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${fadeIn} 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const StyledTypography = styled(Typography)`
  font-family: 'Roboto', 'Open Sans', sans-serif;
  color: ${colors.dark};
`;

const Image = styled('img')`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const SectionTitle = styled(Typography)`
  margin-top: 40px;
  margin-bottom: 20px;
  color: ${colors.primary};
`;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [topRatedRecipes, setTopRatedRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getRecipes();
        setRecipes(response);
        setFilteredRecipes(response);
        setTopRatedRecipes(response.slice(0, 5)); // Obtener las 5 recetas más valoradas
        setLoading(false);
      } catch (error) {
        setError('Failed to load recipes.');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleFilterChange = (filters) => {
    const filtered = recipes.filter(recipe => {
      return (filters.category === 'all' || recipe.category === filters.category) &&
             (filters.difficulty === 'all' || recipe.difficulty === filters.difficulty);
    });
    setFilteredRecipes(filtered);
  };

  if (!isAuthenticated) {
    return (
      <>
        <GlobalStyle />
        <Navigation />
        <Login setIsAuthenticated={setIsAuthenticated} />
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      <Navigation />
      <FullScreenContainer id="home">
        <ContentWrapper>
          <RecipeSearchBar onFilterChange={handleFilterChange} />
          <StyledTypography
            variant="h2"
            fontSize={50}
            color={colors.secondary}
            sx={{ marginBottom: 1 }}
          >
            Deliciosas Recetas
          </StyledTypography>
          <StyledTypography
            variant="h4"
            fontSize={30}
            fontStyle="italic"
            sx={{ marginBottom: 4 }}
          >
            Encuentra y prepara tus platos favoritos
          </StyledTypography>
          <FeatureGrid>
            <FeaturePaper>
              <Image src={require('./assets/recipe_book_icon.webp')} alt="Favorite Recipes" />
              <StyledTypography variant="h4" gutterBottom color={colors.primary}>
                Recetas Populares
              </StyledTypography>
              <StyledTypography variant="body1">
                Descubre las recetas más amadas por nuestra comunidad.
              </StyledTypography>
            </FeaturePaper>

            <FeaturePaper>
              <Image src={require('./assets/fresh_ingredients_icon.webp')} alt="Ingredients" />
              <StyledTypography variant="h4" gutterBottom color={colors.primary}>
                Ingredientes Frescos
              </StyledTypography>
              <StyledTypography variant="body1">
                Agrega ingredientes directamente a tu carrito de compras.
              </StyledTypography>
            </FeaturePaper>

            <FeaturePaper>
              <Image src={require('./assets/chef_tips_icon.webp')} alt="Master Chef" />
              <StyledTypography variant="h4" gutterBottom color={colors.primary}>
                Consejos de Chef
              </StyledTypography>
              <StyledTypography variant="body1">
                Aprende trucos y técnicas de cocina de chefs profesionales.
              </StyledTypography>
            </FeaturePaper>
          </FeatureGrid>
        </ContentWrapper>
      </FullScreenContainer>
      
      <FullScreenContainer id="top-recipes">
        <ContentWrapper>
          <SectionTitle variant="h3">Top 5 Recetas Más Valoradas</SectionTitle>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Grid container spacing={3} justifyContent="center">
              {topRatedRecipes.map((recipe) => (
                <Grid item key={recipe.id} xs={12} sm={6} md={4}>
                  <RecipeCard recipe={recipe} />
                </Grid>
              ))}
            </Grid>
          )}
        </ContentWrapper>
      </FullScreenContainer>
    </>
  );
};

export default App;
