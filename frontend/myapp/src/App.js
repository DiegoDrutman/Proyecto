import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Box, TextField, Autocomplete, Container } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import Navigation from './components/Navigation/Navigation';
import { authenticateUser, getRecipes } from './services/api';
import Favorites from './pages/User/User';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import RecipeList from './components/RecipeList/RecipeList';
import GlobalStyle from './styles/GlobalStyle';
import { colors, fontSizes } from './styles/Variables';
import backgroundImage from './assets/wooden-table.webp';
import { createFilterOptions } from '@mui/material/Autocomplete';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FullScreenContainer = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  min-height: 100vh;
  text-align: center;
  background: url(${backgroundImage}) no-repeat center center;
  color: ${colors.light};
  background-size: cover;
  background-attachment: fixed;
  @media (max-width: 600px) {
    background-attachment: scroll;
  }
`;

const ContentWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  width: 50% !important;
  padding: 30px;
  animation: ${fadeIn} 0.5s ease-in-out;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  margin-top: 300px;
  margin-bottom: 50px;
  margin-right: 600px !important;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

const filterOptions = createFilterOptions({
  limit: 3, // Limitar el número de resultados a 3
});

const StyledAutocomplete = styled(Autocomplete)`
  width: 100%;
  max-width: 700px;
  margin: 20px auto;
  
  .MuiOutlinedInput-root {
    background-color: ${colors.light};
    border-radius: 20px;
    height: 70px;
    font-size: 24px !important;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease;
    &:hover {
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
    }
  }

  .MuiInputLabel-outlined {
    font-size: 18px;
    color: ${colors.secondary};
  }

  .MuiAutocomplete-popper {
    .MuiPaper-root {
      background-color: rgba(255, 239, 213, 0.9); /* Fondo suave, casi transparente */
      color: ${colors.dark}; /* Texto oscuro para contraste */
      border-radius: 12px;
      max-height: 180px;
      overflow-y: auto;
      box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.25); /* Sombra más prominente */
      padding: 8px 0; /* Padding extra alrededor de las opciones */
    }

    .MuiAutocomplete-option {
      font-size: 20px; /* Tamaño de fuente mayor para mejor legibilidad */
      padding: 12px 16px; /* Padding adicional para las opciones */
      transition: background-color 0.2s ease, color 0.2s ease;
      &:hover {
        background-color: ${colors.secondary};
        color: ${colors.light};
      }
    }
  }
`;

const HeaderTypography = styled.h1`
  font-family: 'Playfair Display', serif;
  color: ${colors.light};
  padding-top: 0px;
  font-size: 80px;
  margin-bottom: 10px;
  @media (max-width: 600px) {
    font-size: ${fontSizes.large};
  }
`;

const SubHeaderTypography = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 40px;
  font-style: normal;
  color: ${colors.light};
  margin-bottom: 30px;
  @media (max-width: 600px) {
    font-size: ${fontSizes.medium};
  }
`;

const RecipesContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 0px;
  padding: 20px 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const RecipeGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin-top: 0;
`;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        if (searchTerm) {
          const response = await getRecipes(searchTerm);
          setSuggestions(response.map((recipe) => ({ id: recipe.id, name: recipe.name })));
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
      localStorage.setItem('token', userData.token);
      setIsAuthenticated(true);
      setUserName(userData.username);
      navigate('/'); // Redirigir a la página principal después del login
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
    localStorage.removeItem('token');
    navigate('/login'); // Redirigir a la página de login después del logout
  };

  const handleSelectRecipe = (event, value) => {
    if (value) {
      navigate(`/recipe/${value.id}`);
    }
  };

  return (
    <>
      <GlobalStyle /> {/* Aplica estilos globales */}
      {location.pathname && (
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
                  <HeaderTypography>
                    Manos a la Obra!
                  </HeaderTypography>
                  <SubHeaderTypography>
                    Indicanos, ¿como se llama el plato?
                  </SubHeaderTypography>
                  <StyledAutocomplete
                    freeSolo
                    options={suggestions}
                    getOptionLabel={(option) => option.name}
                    filterOptions={filterOptions} // Limitar el número de resultados
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
                        InputLabelProps={{
                          style: { color: colors.secondary },
                        }}
                      />
                    )}
                  />
                </ContentWrapper>
              </FullScreenContainer>

              <RecipesContainer id="all-recipes">
                <RecipeGrid>
                  <RecipeList searchTerm={searchTerm} />
                </RecipeGrid>
              </RecipesContainer>
            </>
          }
        />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/favorites" element={isAuthenticated ? <Favorites /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </>
  );
};

export default App;
