import React, { useState, useEffect } from 'react';
import { Toolbar, Box, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { NavBar, NavLink } from './Navigation.styles'; // Importar estilos
import { colors } from '../../styles/Variables'; // Importar variables de color desde Variables.js

const Navigation = ({ isAuthenticated }) => {
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMobileMenuOpen = (event) => {
    setMobileAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileAnchorEl(null);
  };

  const navigateAndScroll = (target) => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    scroller.scrollTo(target, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <NavBar scrolled={scrolled}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: 'inherit' }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                color: colors.dark, // Usar el color de texto desde Variables.js
                fontWeight: 'bold',
                fontSize: '2.5rem',
                fontFamily: 'Dancing Script, cursive', // Aplicar la fuente cursiva
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Efecto visual
                transition: 'transform 0.3s ease', // Efecto de transición
                '&:hover': {
                  transform: 'scale(1.1)', // Efecto al pasar el ratón
                },
              }}
            >
              BizWave
            </Typography>
          </Link>
        </Box>
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
            anchorEl={mobileAnchorEl}
            open={Boolean(mobileAnchorEl)}
            onClose={handleMobileMenuClose}
          >
            <MenuItem onClick={() => { navigateAndScroll('home'); handleMobileMenuClose(); }}>
              Inicio
            </MenuItem>
            <MenuItem onClick={() => { navigateAndScroll('all-businesses'); handleMobileMenuClose(); }}>
              Negocios
            </MenuItem>
            {isAuthenticated && (
              <MenuItem onClick={() => { navigate('/profile'); handleMobileMenuClose(); }}>
                <AccountCircle /> Perfil
              </MenuItem>
            )}
          </Menu>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
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
            onClick={() => navigateAndScroll('all-businesses')}
          >
            Negocios
          </NavLink>
          {isAuthenticated && (
            <IconButton
              size="large"
              aria-label="perfil"
              onClick={() => navigate('/profile')} // Navega directamente al perfil al hacer clic
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </NavBar>
  );
};

export default Navigation;
