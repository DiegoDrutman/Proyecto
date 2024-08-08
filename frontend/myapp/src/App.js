// src/App.js
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  max-width: 800px;
  width: 100%;
  padding: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: -300px;
  margin-bottom: 0;
`;

const StyledAutocomplete = styled(Autocomplete)`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  .MuiOutlinedInput-root {
    background-color: ${colors.light};
    border-radius: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    &:hover {
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    }
  }
  .MuiInputLabel-outlined {
    color: ${colors.secondary};
  }
`;

const HeaderTypography = styled.h1`
  font-family: 'Lobster', cursive;
  color: ${colors.light};
  padding-top: 20px;
  font-size: 80px;
  @media (max-width: 600px) {
    font-size: ${fontSizes.medium};
  }
`;

const SubHeaderTypography = styled.h2`
  font-family: 'Open Sans', sans-serif;
  font-size: 40px;
  font-style: italic;
  color: ${colors.light};
  margin-bottom: 20px;
  @media (max-width: 600px) {
    font-size: ${fontSizes.medium};
  }
`;

const RecipesContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: -250px;
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
                    ReceTamos Juntos!
                  </HeaderTypography>
                  <SubHeaderTypography>
                    Encuentra y prepara tus platos favoritos
                  </SubHeaderTypography>
                  <StyledAutocomplete
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
