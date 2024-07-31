import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, CircularProgress, Alert, TextField, Button, MenuItem, Pagination } from '@mui/material';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import RecipeCard from './components/RecipeCard';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import { getRecipes } from './services/api';
import { Element } from 'react-scroll';

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
  padding-top: 120px;
`;

const ContentWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  padding: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const FeatureGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  justify-items: center;
`;

const FeaturePaper = styled(Box)`
  background-color: ${colors.light};
  padding: 20px;
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
  padding-top: 20px;
`;

const Image = styled('img')`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const SectionTitle = styled(Typography)`
  margin-top: 20px;
  margin-bottom: 20px;
  color: ${colors.primary};
`;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [topRatedRecipes, setTopRatedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ category: 'all', difficulty: 'all' });
  const recipesPerPage = 10;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getRecipes();
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

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    const filtered = filteredRecipes.filter(recipe => {
      return (filters.category === 'all' || recipe.category === filters.category) &&
             (filters.difficulty === 'all' || recipe.difficulty === filters.difficulty);
    });
    setFilteredRecipes(filtered);
  };

  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      <GlobalStyle />
      <Navigation isAuthenticated={isAuthenticated} onLogin={handleLogin} onLogout={handleLogout} />
      <Element name="home">
        <FullScreenContainer id="home">
          <ContentWrapper>
            <StyledTypography
              variant="h2"
              fontSize={80}
              color={colors.secondary}
              sx={{ marginBottom: 2 }}
            >
              Deliciosas Recetas
            </StyledTypography>
            <StyledTypography
              variant="h4"
              fontSize={24}
              fontStyle="italic"
              sx={{ marginBottom: 2 }}
            >
              Encuentra y prepara tus platos favoritos
            </StyledTypography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, marginBottom: 3, padding: 10 }}>
              <TextField
                label="Search Recipes"
                variant="outlined"
                sx={{ marginRight: 2 }}
              />
              <TextField
                select
                label="Category"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="category1">Category 1</MenuItem>
                <MenuItem value="category2">Category 2</MenuItem>
              </TextField>
              <TextField
                select
                label="Difficulty"
                name="difficulty"
                value={filters.difficulty}
                onChange={handleFilterChange}
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </TextField>
              <Button variant="contained" color="primary" onClick={handleSearch}>Filter</Button>
            </Box>
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
                <Image src={require('./assets/social_media_icon.webp')} alt="Social Media" />
                <StyledTypography variant="h4" gutterBottom color={colors.primary}>
                  Redes Sociales
                </StyledTypography>
                <StyledTypography variant="body1">
                  Sigue nuestras redes sociales para más consejos y recetas.
                </StyledTypography>
              </FeaturePaper>
            </FeatureGrid>
          </ContentWrapper>
        </FullScreenContainer>
      </Element>
      <Element name="top-recipes">
        <FullScreenContainer id="top-recipes">
          <ContentWrapper>
            <SectionTitle variant="h3">Top 5 Recetas Más Valoradas</SectionTitle>
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <Grid container spacing={2} justifyContent="center">
                {topRatedRecipes.map((recipe) => (
                  <Grid item key={recipe.id} xs={12} sm={6} md={4}>
                    <RecipeCard recipe={recipe} />
                  </Grid>
                ))}
              </Grid>
            )}
          </ContentWrapper>
        </FullScreenContainer>
      </Element>
      <Element name="all-recipes">
        <FullScreenContainer id="all-recipes">
          <ContentWrapper>
            <SectionTitle variant="h3">Todas las Recetas</SectionTitle>
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                <Grid container spacing={2} justifyContent="center">
                  {currentRecipes.map((recipe) => (
                    <Grid item key={recipe.id} xs={12} sm={6} md={4}>
                      <RecipeCard recipe={recipe} />
                    </Grid>
                  ))}
                </Grid>
                <Pagination
                  count={Math.ceil(filteredRecipes.length / recipesPerPage)}
                  page={currentPage}
                  onChange={paginate}
                  color="primary"
                  sx={{ marginTop: 4 }}
                />
              </>
            )}
          </ContentWrapper>
        </FullScreenContainer>
      </Element>
      {isAuthenticated && (
        <Element name="my-favourites">
          <FullScreenContainer id="my-favourites">
            <ContentWrapper>
              {/* Contenido de My Favourites */}
            </ContentWrapper>
          </FullScreenContainer>
        </Element>
      )}
      <Element name="login">
        <FullScreenContainer id="login">
          <ContentWrapper>
            <Login setIsAuthenticated={setIsAuthenticated} />
          </ContentWrapper>
        </FullScreenContainer>
      </Element>
    </>
  );
};

export default App;
