import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Box, TextField, Autocomplete, Container } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import Navigation from './components/Navigation/Navigation';
import { authenticateBusiness, getBusinesses } from './services/api';
import BusinessProfilePage from './pages/BusinessProfile/BusinessProfile'; // Cambié el nombre de Favorites a BusinessProfile
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import BusinessDetails from './pages/BusinessDetails/BusinessDetails';
import BusinessList from './components/BusinessList/BusinessList';
import GlobalStyle from './styles/GlobalStyle';
import { colors, fontSizes } from './styles/Variables';
import backgroundImage from './assets/background.jpg';
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
  background: linear-gradient(
      rgba(0, 0, 0, 0.5), 
      rgba(0, 0, 0, 0.5)
    ),
    url(${backgroundImage}) no-repeat center center;  // Imagen de fondo
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
  margin-top: 150px; /* Reducir la distancia al top para que quede más abajo */
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
  font-size: 20px;
  font-style: normal;
  color: ${colors.light};
  margin-bottom: 30px;
  @media (max-width: 600px) {
    font-size: ${fontSizes.medium};
  }
`;

const BusinessesContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0;
  margin-top: 50px; /* Ajuste para bajar la posición del contenedor */
  background-color: rgba(0, 0, 0, 0.6);
`;

const BusinessGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [businessName, setBusinessName] = useState(''); // Cambié userName a businessName
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
          const response = await getBusinesses(searchTerm);
          setSuggestions(response.map((business) => ({ id: business.id, name: business.name })));
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching business suggestions:', error);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  const handleLogin = async (credentials) => {
    try {
      const businessData = await authenticateBusiness(credentials); // Cambié authenticateUser a authenticateBusiness
      localStorage.setItem('token', businessData.token);
      setIsAuthenticated(true);
      setBusinessName(businessData.name); // Cambié userName a businessName
      navigate('/'); // Redirigir a la página principal después del login
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setBusinessName(''); // Cambié userName a businessName
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSelectBusiness = (event, value) => {
    if (value) {
      navigate(`/business/${value.id}`);
    }
  };

  return (
    <>
      <GlobalStyle /> {/* Aplica estilos globales */}
      {location.pathname && (
        <Navigation
          isAuthenticated={isAuthenticated}
          businessName={businessName} // Cambié userName a businessName
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
                    Bienvenido a BizWave!
                  </HeaderTypography>
                  <SubHeaderTypography>
                    ¿Qué negocio estás buscando?
                  </SubHeaderTypography>
                  <StyledAutocomplete
                    freeSolo
                    options={suggestions}
                    getOptionLabel={(option) => option.name}
                    filterOptions={filterOptions}
                    onInputChange={(event, newInputValue) => {
                      setSearchTerm(newInputValue);
                    }}
                    onChange={handleSelectBusiness}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Buscar Negocios"
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

              <BusinessesContainer id="all-businesses">
                <BusinessGrid>
                  <BusinessList searchTerm={searchTerm} />
                </BusinessGrid>
              </BusinessesContainer>
            </>
          }
        />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/profile" element={isAuthenticated ? <BusinessProfilePage /> : <Login setIsAuthenticated={setIsAuthenticated} />} /> {/* Cambié de /favorites a /profile */}
        <Route path="/business/:id" element={<BusinessDetails />} />
      </Routes>
    </>
  );
};

export default App;
