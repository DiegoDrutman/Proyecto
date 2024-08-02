import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Importar useLocation
import { Link as ScrollLink, scroller } from 'react-scroll'; // Importar scroller de react-scroll
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

// Colores personalizados
const themeColors = {
  primary: 'rgba(255, 255, 255, 0.3)', // Fondo transparente
  hover: '#A0522D', // Sienna (hover)
  text: '#8B4513', // Marrón claro
};

// Estilos para el AppBar sin sombra y con transparencia
const NavBar = styled(AppBar)`
  background-color: ${themeColors.primary};
  box-shadow: none;
  backdrop-filter: blur(5px);
  color: ${themeColors.text};
  padding: 5px 0;
  transition: background-color 0.3s ease;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1100;
`;

// Enlaces estilizados para la barra de navegación
const NavLink = styled(Typography)`
  text-decoration: none;
  color: ${themeColors.text};
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: ${themeColors.hover};
  }
`;

const Navigation = ({ isAuthenticated, userName, onLogin, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
  const navigate = useNavigate(); // Instanciar useNavigate
  const location = useLocation(); // Instanciar useLocation

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileAnchorEl(null);
  };

  // Función para manejar el logout y redirigir al login
  const handleLogout = () => {
    onLogout(); // Llama la función de logout que actualiza el estado de autenticación
    handleMenuClose(); // Cierra el menú desplegable
    navigate('/login'); // Redirige a la página de login
  };

  // Función para navegar y desplazar
  const navigateAndScroll = (target) => {
    // Verificar si ya estamos en la página principal
    if (location.pathname !== '/') {
      navigate('/'); // Navegar a la página principal
    }
    // Usar el scroller de react-scroll para desplazar a la sección deseada
    scroller.scrollTo(target, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  return (
    <NavBar>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: 'inherit' }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                marginRight: '20px',
                color: themeColors.text,
                fontWeight: 'bold',
              }}
            >
              ReceTamos!
            </Typography>
          </Link>
        </Box>

        {/* Menu responsive para pantallas pequeñas */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="mobile-menu-appbar"
            anchorEl={mobileAnchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(mobileAnchorEl)}
            onClose={handleMobileMenuClose}
          >
            <MenuItem onClick={() => { handleMobileMenuClose(); navigateAndScroll('home'); }}>
              <Typography variant="h6" component="div" style={{ color: themeColors.text }}>
                Inicio
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => { handleMobileMenuClose(); navigateAndScroll('top-recipes'); }}>
              <Typography variant="h6" component="div" style={{ color: themeColors.text }}>
                Populares
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => { handleMobileMenuClose(); navigateAndScroll('all-recipes'); }}>
              <Typography variant="h6" component="div" style={{ color: themeColors.text }}>
                Recetas
              </Typography>
            </MenuItem>
            {/* Mostrar "Perfil" solo si el usuario está autenticado */}
            {isAuthenticated ? (
              <>
                <MenuItem onClick={handleMobileMenuClose}>
                  <Link to="/profile" style={{ textDecoration: 'none', color: themeColors.text }}>
                    <Typography variant="h6" component="div">
                      Perfil
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMobileMenuClose}>
                  <Link to="/favorites" style={{ textDecoration: 'none', color: themeColors.text }}>
                    <Typography variant="h6" component="div">
                      Favoritas
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography variant="h6" component="div">
                    Logout
                  </Typography>
                </MenuItem>
              </>
            ) : (
              <MenuItem onClick={handleMobileMenuClose}>
                <Link to="/login" style={{ textDecoration: 'none', color: themeColors.text }}>
                  <Typography variant="h6" component="div">
                    Ingresar
                  </Typography>
                </Link>
              </MenuItem>
            )}
          </Menu>
        </Box>

        {/* Navegación completa para pantallas más grandes */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          <NavLink
            variant="h6"
            component="div"
            onClick={() => navigateAndScroll('home')}
          >
            Inicio
          </NavLink>
          <NavLink
            variant="h6"
            component="div"
            onClick={() => navigateAndScroll('top-recipes')}
          >
            Populares
          </NavLink>
          <NavLink
            variant="h6"
            component="div"
            onClick={() => navigateAndScroll('all-recipes')}
          >
            Recetas
          </NavLink>
          {isAuthenticated ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Link to="/profile" style={{ textDecoration: 'none', color: themeColors.text }}>
                    <Typography variant="h6" component="div">
                      Perfil
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Link to="/favorites" style={{ textDecoration: 'none', color: themeColors.text }}>
                    <Typography variant="h6" component="div">
                      Favoritas
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography variant="h6" component="div">
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none', color: themeColors.text }}>
              <NavLink variant="h6" component="div">
                Ingresar
              </NavLink>
            </Link>
          )}
        </Box>
      </Toolbar>
    </NavBar>
  );
};

export default Navigation;
