import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import Navigation from './components/Navigation/Navigation';
import BusinessProfile from './pages/BusinessProfile/BusinessProfile';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import BusinessDetails from './pages/BusinessDetails/BusinessDetails';
import BusinessList from './components/BusinessList/BusinessList';
import GlobalStyle from './styles/GlobalStyle';
import { getBusinessProfile, authenticateBusiness } from './services/api';
import PropTypes from 'prop-types';  // Importación de PropTypes
import {
  FullScreenContainer,
  ContentWrapper,
  StyledAutocomplete,
  HeaderTypography,
  SubHeaderTypography,
  BusinessesContainer,
  BusinessGrid,
  LocationButtonPrimary,
  LocationButtonSecondary,
} from './App.styles';

const App = ({ predefinedLocations = [] }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Modificar verificación del token para no redirigir al login al cargar la página
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const data = await getBusinessProfile();
          setIsAuthenticated(true);
          setBusinessName(data.name);
        } catch (error) {
          console.error('Token inválido o negocio no aprobado:', error);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, [location.pathname]);

  // Proteger manualmente la ruta del perfil
  const handleLogin = async (credentials) => {
    try {
      const businessData = await authenticateBusiness(credentials);
      localStorage.setItem('token', businessData.token);
      setIsAuthenticated(true);
      setBusinessName(businessData.name);
      setLoginError(null);
      navigate('/profile');
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setBusinessName('');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
        {/* Página principal y rutas públicas */}
        <Route
          path="/"
          element={(
            <>
              <FullScreenContainer id="home">
                <ContentWrapper>
                  <HeaderTypography>¿Qué producto o negocio estás buscando?</HeaderTypography>
                  <SubHeaderTypography>
                    {selectedLocation ? `Estás buscando en: ${selectedLocation} 📍` : 'Selecciona una ubicación para comenzar a buscar'}
                    <Button variant="outlined" color="secondary" onClick={handleOpenDialog} sx={{ marginLeft: 2 }}>
                      Cambiar Ubicación
                    </Button>
                  </SubHeaderTypography>
                  <StyledAutocomplete placeholder="Buscar Negocios o Productos" variant="outlined" fullWidth />
                </ContentWrapper>
              </FullScreenContainer>

              <BusinessesContainer id="all-businesses">
                <BusinessGrid>
                  <BusinessList searchTerm={selectedLocation} />
                </BusinessGrid>
              </BusinessesContainer>
            </>
          )}
        />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} error={loginError} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} predefinedLocations={predefinedLocations} />} />

        {/* Redirigir manualmente si no está autenticado */}
        <Route
          path="/profile"
          element={
            isAuthenticated ? <BusinessProfile onLogout={handleLogout} /> : <Login setIsAuthenticated={setIsAuthenticated} />
          }
        />

        <Route path="/business/:id" element={<BusinessDetails />} />
      </Routes>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Selecciona tu ubicación</DialogTitle>
        <DialogContent sx={{ padding: '20px' }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            {predefinedLocations.map((location, index) => (
              index % 2 === 0 ? (
                <LocationButtonPrimary key={location} onClick={() => handleSelectLocation(location)}>
                  {location}
                </LocationButtonPrimary>
              ) : (
                <LocationButtonSecondary key={location} onClick={() => handleSelectLocation(location)}>
                  {location}
                </LocationButtonSecondary>
              )
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Añadir PropTypes para validar las props
App.propTypes = {
  predefinedLocations: PropTypes.arrayOf(PropTypes.string),
};

export default App;
