import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Box, TextField, Autocomplete, Container, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import Navigation from './components/Navigation/Navigation';
import UserProfile from './pages/UserProfile/UserProfile';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import BusinessDetails from './pages/BusinessDetails/BusinessDetails';
import BusinessList from './components/BusinessList/BusinessList';
import GlobalStyle from './styles/GlobalStyle';
import { colors, fontSizes } from './styles/Variables';
import backgroundImage from './assets/new-background.jpg';
import { authenticateBusiness } from './services/api';


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
  margin-top: -100px;
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
  padding: 20px 10px;
  margin: 20px 0;
  background-color: transparent;
`;

const BusinessGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 10px;
`;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const predefinedLocations = ['Hurlingham', 'Moron', 'Ituzaingo', 'Palomar'];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

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
      setSelectedLocation(value);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSelectAndClose = () => {
    handleCloseDialog();
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
                  <HeaderTypography>¿Qué producto estás buscando?</HeaderTypography>
                  
                  <SubHeaderTypography>
                    {selectedLocation ? `Estás buscando en: ${selectedLocation} 📍` : 'Selecciona una ubicación para comenzar a buscar'}
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      onClick={handleOpenDialog}
                      sx={{ marginLeft: 2 }}
                    >
                      Más opciones
                    </Button>
                  </SubHeaderTypography>
                  
                  <StyledAutocomplete
                    options={predefinedLocations}
                    getOptionLabel={(option) => option}
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
                  <BusinessList searchTerm={selectedLocation} />
                </BusinessGrid>
              </BusinessesContainer>
            </>
          }
        />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} predefinedLocations={predefinedLocations} />} />
        <Route path="/profile" element={isAuthenticated ? <UserProfile onLogout={handleLogout} /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/business/:id" element={<BusinessDetails />} />
      </Routes>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Cambiar búsqueda</DialogTitle>
        <DialogContent sx={{ padding: '20px' }}>
          <Autocomplete
            options={predefinedLocations}
            getOptionLabel={(option) => option}
            onChange={(event, value) => setSelectedLocation(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buscar por ubicación"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2, fontSize: '1.2rem' }}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSelectAndClose} color="primary">
            Seleccionar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default App;
