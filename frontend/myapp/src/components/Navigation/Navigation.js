import React, { useState, useEffect } from 'react';
import { Toolbar, Box, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { NavBar, NavLink } from './Navigation.styles'; // Importar estilos

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
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: '70px', padding: '10px 0' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', paddingTop: '10px' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'flex-start', color: 'inherit' }}>
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
              margin: 0,
              padding: 0,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
              },
              marginTop: '-25px',  // Ajuste para subir el título
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
              Explorar
            </MenuItem>
            <MenuItem onClick={() => { navigate('/register-business'); handleMobileMenuClose(); }}>
              Tengo un negocio
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
            Explorar
          </NavLink>
          <NavLink
            variant="h6"
            component="div"
            onClick={() => navigate('/signup')}
          >
            Tengo un negocio
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
