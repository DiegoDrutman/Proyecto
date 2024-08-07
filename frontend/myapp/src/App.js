import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Autocomplete, Container } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import Navigation from './components/Navigation/Navigation';
import { authenticateUser, getRecipes } from './services/api';

// Importación de páginas y componentes
import Favorites from './pages/Favorites/Favorites';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import RecipeList from './components/RecipeList/RecipeList';

// Importación de estilos y variables globales
import GlobalStyle from './styles/GlobalStyle';
import { colors, fontSizes } from './styles/Variables';
import backgroundImage from './assets/wooden-table.webp';

// Animación de entrada
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Estilos de contenedores y elementos
const FullScreenContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  text-align: center;
  padding: 20px;
  padding-top: 60px;
  background: url(${backgroundImage}) no-repeat center center; /* Usar el archivo importado */
  color: ${colors.light};
  background-size: cover; /* Asegura que la imagen cubra todo el fondo */
  background-attachment: fixed; /* Esto ayuda a mantener la imagen fija mientras se desplaza */
  @media (max-width: 600px) {
    background-attachment: scroll; /* Ajuste para dispositivos móviles */
  }
`;

const ContentWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  max-width: 1000px;
  width: 100%;
  padding: 40px;
  animation: ${fadeIn} 0.5s ease-in-out;
  background-color: rgba(0, 0, 0, 0.6); /* Cambia el color del overlay a un negro translúcido */
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const StyledAutocomplete = styled(Autocomplete)`
  width: 100%;
  max-width: 600px;
  margin: 0 auto; /* Asegura que el buscador esté centrado */
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

const StyledTypography = styled(Typography)`
  font-family: 'Poppins', sans-serif;
  color: ${colors.light};
  padding-top: 20px;
  @media (max-width: 600px) {
    font-size: ${fontSizes.medium}; /* Ajusta el tamaño de fuente para móviles */
  }
`;

const SectionTitle = styled(Typography)`
  margin-top: 20px;
  margin-bottom: 20px;
  color: ${colors.primary};
  font-size: ${fontSizes.large};
  font-weight: bold;
  text-transform: uppercase;
`;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  // Verificación del token de autenticación al iniciar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Función para buscar sugerencias de recetas
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

  // Manejo de inicio de sesión
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

  // Manejo de cierre de sesión
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
    localStorage.removeItem('token');
    navigate('/login'); // Redirigir a la página de login después del logout
  };

  // Selección de receta
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
                  <StyledTypography
                    variant="h2"
                    fontSize={80}
                    color={colors.light}
                    sx={{ marginBottom: 2 }}
                  >
                    ReceTamos Juntos!
                  </StyledTypography>
                  <StyledTypography
                    variant="h4"
                    fontSize={24}
                    fontStyle="italic"
                    sx={{ marginBottom: 4 }}
                  >
                    Encuentra y prepara tus platos favoritos
                  </StyledTypography>
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
        <Route path="/favorites" element={isAuthenticated ? <Favorites /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </>
  );
};

export default App;
