import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Autocomplete } from '@mui/material';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import Navigation from './components/Navigation';
import { authenticateUser, getRecipes } from './services/api';

import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import RecipeDetails from './components/RecipeDetails';
import RecipeList from './components/RecipeList'; // Importa la página de detalles de recetas

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
  secondary: '#A0522D',
  light: '#FFF8E1',
  dark: '#5C4033',
  accent: '#DAA520',
  warmBackground: '#FFF8DC',
};

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', 'Open Sans', sans-serif;
    background-color: ${colors.warmBackground};
    color: ${colors.dark};
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

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

const ContentWrapper = styled(Box)`
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

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
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
  const [userName, setUserName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        if (searchTerm) {
          const response = await getRecipes(searchTerm);
          setSuggestions(response.map(recipe => ({ id: recipe.id, name: recipe.name })));
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching recipe suggestions:', error);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  const handleLogin = async (credentials) => {
    try {
      const userData = await authenticateUser(credentials);
      setIsAuthenticated(true);
      setUserName(userData.username);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
    localStorage.removeItem('token');
  };

  const handleSelectRecipe = (event, value) => {
    if (value) {
      navigate(`/recipe/${value.id}`);
    }
  };

  return (
    <>
      <GlobalStyle />
      {location.pathname !== '/login' && (
        <Navigation
          isAuthenticated={isAuthenticated}
          userName={userName}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <FullScreenContainer id="home">
                <ContentWrapper>
                  <StyledTypography
                    variant="h2"
                    fontSize={80}
                    color={colors.secondary}
                    sx={{ marginBottom: 2 }}
                  >
                    ReceTamos Juntos!
                  </StyledTypography>
                  <StyledTypography
                    variant="h4"
                    fontSize={24}
                    fontStyle="italic"
                    sx={{ marginBottom: 2 }}
                  >
                    Encuentra y prepara tus platos favoritos
                  </StyledTypography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'left',
                      alignItems: 'center',
                      width: '100%', // Asegura que el contenedor sea ancho completo
                      gap: 2,
                      flexWrap: 'wrap',
                      marginBottom: 3,
                      padding: 10,
                    }}
                  >
                    <Autocomplete
                      freeSolo
                      options={suggestions}
                      getOptionLabel={(option) => option.name}
                      onInputChange={(event, newInputValue) => {
                        setSearchTerm(newInputValue);
                      }}
                      onChange={handleSelectRecipe}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Buscar Recetas"
                          variant="outlined"
                          fullWidth
                          sx={{
                            width: '2000%', // Asegura que el TextField ocupe todo el ancho del contenedor
                            maxWidth: '1000px', // Limita el ancho máximo si es necesario
                            input: {
                              padding: '20px 20px', // Ajuste de padding interno
                            },
                          }}
                        />
                      )}
                    />
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

              <FullScreenContainer id="top-recipes">
                <ContentWrapper>
                  <SectionTitle variant="h3">Top 5 Recetas Más Valoradas</SectionTitle>
                </ContentWrapper>
              </FullScreenContainer>

              <FullScreenContainer id="all-recipes">
              <ContentWrapper>
                  <SectionTitle variant="h3">Todas las Recetas</SectionTitle>
                  <RecipeList searchTerm={searchTerm} />
                </ContentWrapper>
              </FullScreenContainer>
            </>
          }
        />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} /> {/* Añadir ruta de detalles */}
      </Routes>
    </>
  );
};

export default App;
