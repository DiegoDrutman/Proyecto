import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Box, TextField, Autocomplete, Container } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import Navigation from './components/Navigation/Navigation';
import { authenticateBusiness, getBusinesses } from './services/api';
import UserProfile from './pages/UserProfile/UserProfile';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import BusinessDetails from './pages/BusinessDetails/BusinessDetails';
import BusinessList from './components/BusinessList/BusinessList';
import GlobalStyle from './styles/GlobalStyle';
import { colors, fontSizes } from './styles/Variables';
import backgroundImage from './assets/new-background.jpg'; // Imagen de fondo actualizada
import { createFilterOptions } from '@mui/material/Autocomplete';


const filterOptions = createFilterOptions({
  limit: 3,
});

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
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  text-align: center;
  background: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url(${backgroundImage}) no-repeat center center;
  color: ${colors.light};
  background-size: cover;
  background-attachment: fixed;
`;

const ContentWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  width: 100%;
  padding: 40px;
  animation: ${fadeIn} 0.5s ease-in-out;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  margin-top: -100px; /* Ajustar según sea necesario */
`;

const StyledAutocomplete = styled(Autocomplete)`
  width: 100%;
  margin: 20px auto;
  
  .MuiOutlinedInput-root {
    background-color: ${colors.light};
    border-radius: 12px;
    height: 60px;
    font-size: 18px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s ease;
    &:hover {
      box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
    }
  }

  .MuiInputLabel-outlined {
    font-size: 16px;
    color: ${colors.secondary};
  }

  .MuiAutocomplete-popper {
    .MuiPaper-root {
      background-color: rgba(255, 255, 255, 0.95);
      color: ${colors.dark};
      border-radius: 8px;
      max-height: 150px;
      overflow-y: auto;
      box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3);
      padding: 10px 0;
    }

    .MuiAutocomplete-option {
      font-size: 16px;
      padding: 10px 20px;
      transition: background-color 0.2s ease, color 0.2s ease;
      &:hover {
        background-color: ${colors.primary};
        color: ${colors.light};
      }
    }
  }
`;

const HeaderTypography = styled.h1`
  font-family: 'Montserrat', sans-serif;
  color: ${colors.dark};
  font-size: 64px;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    font-size: ${fontSizes.xlarge};
  }
`;

const SubHeaderTypography = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-weight: 400;
  color: ${colors.secondary};
  margin-bottom: 30px;
  @media (max-width: 600px) {
    font-size: ${fontSizes.medium};
  }
`;

const BusinessesContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px 10px; /* Reduced padding on the sides */
  margin: 20px 0; /* Reduced margin on top and bottom */
  background-color: transparent;
`;

const BusinessGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px; /* Reduced gap between cards */
  width: 100%;
  max-width: 100%; /* Allows cards to stretch closer to the edges */
  margin: 0 auto;
  padding: 0 10px; /* Reduced padding inside the grid */
`;


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [businessName, setBusinessName] = useState('');
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
      const businessData = await authenticateBusiness(credentials);
      localStorage.setItem('token', businessData.token);
      setIsAuthenticated(true);
      setBusinessName(businessData.name);
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setBusinessName('');
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
      <GlobalStyle />
      {location.pathname && (
        <Navigation
          isAuthenticated={isAuthenticated}
          businessName={businessName}
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
                  <HeaderTypography>Bienvenido a BizWave</HeaderTypography>
                  <SubHeaderTypography>Encuentra los mejores negocios en tu área</SubHeaderTypography>
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
        <Route path="/profile" element={isAuthenticated ? <UserProfile onLogout={handleLogout} /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/business/:id" element={<BusinessDetails />} />
      </Routes>
    </>
  );
};

export default App;
