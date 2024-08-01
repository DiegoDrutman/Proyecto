import React from 'react';
import { AppBar, Toolbar, Box, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import styled from 'styled-components';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

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

const Navigation = ({ isAuthenticated, onLogin, onLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
            onClick={handleMenuOpen}
          >
            <MenuIcon />
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
              <ScrollLink to="home" smooth={true} duration={500} style={{ textDecoration: 'none', color: themeColors.text }}>
                <Typography variant="h6" component="div">
                  Inicio
                </Typography>
              </ScrollLink>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ScrollLink to="top-recipes" smooth={true} duration={500} style={{ textDecoration: 'none', color: themeColors.text }}>
                <Typography variant="h6" component="div">
                  Populares
                </Typography>
              </ScrollLink>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ScrollLink to="all-recipes" smooth={true} duration={500} style={{ textDecoration: 'none', color: themeColors.text }}>
                <Typography variant="h6" component="div">
                  Recetas
                </Typography>
              </ScrollLink>
            </MenuItem>
            {/* Link to Login */}
            <MenuItem onClick={handleMenuClose}>
              <Link to="/login" style={{ textDecoration: 'none', color: themeColors.text }}>
                <Typography variant="h6" component="div">
                  Favoritas
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              {/* Link to Login */}
              <Link to="/login" style={{ textDecoration: 'none', color: themeColors.text }}>
                <Typography variant="h6" component="div">
                  Iniciar Sesión
                </Typography>
              </Link>
            </MenuItem>
          </Menu>
        </Box>

        {/* Navegación completa para pantallas más grandes */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          <ScrollLink to="home" smooth={true} duration={500} style={{ cursor: 'pointer' }}>
            <NavLink variant="h6" component="div">
              Inicio
            </NavLink>
          </ScrollLink>
          <ScrollLink to="top-recipes" smooth={true} duration={500} style={{ cursor: 'pointer' }}>
            <NavLink variant="h6" component="div">
              Populares
            </NavLink>
          </ScrollLink>
          <ScrollLink to="all-recipes" smooth={true} duration={500} style={{ cursor: 'pointer' }}>
            <NavLink variant="h6" component="div">
              Recetas
            </NavLink>
          </ScrollLink>
          {/* Link to Login */}
          <Link to="/login" style={{ textDecoration: 'none', color: themeColors.text }}>
            <NavLink variant="h6" component="div">
              Favoritas
            </NavLink>
          </Link>
          {/* Link to Login */}
          <Link to="/login" style={{ textDecoration: 'none', color: themeColors.text }}>
            <NavLink variant="h6" component="div">
              Iniciar Sesión
            </NavLink>
          </Link>
        </Box>
      </Toolbar>
    </NavBar>
  );
};

export default Navigation;
