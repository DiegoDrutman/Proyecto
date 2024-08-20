import React, { useState, useEffect } from 'react';
import { Toolbar, Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { NavBar, NavLink, IngresarLink } from './Navigation.styles'; // Importar estilos
import { colors } from '../../styles/Variables'; // Importar variables de color desde Variables.js

const Navigation = ({ isAuthenticated, userName, onLogin, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
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

  const handleLogout = () => {
    onLogout();
    handleMenuClose();
    navigate('/login');
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
              <Typography variant="h6" component="div" style={{ color: colors.dark }}> {/* Usar color de Variables.js */}
                Inicio
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => { handleMobileMenuClose(); navigateAndScroll('all-businesses'); }}>
              <Typography variant="h6" component="div" style={{ color: colors.dark }}> {/* Usar color de Variables.js */}
                Negocios
              </Typography>
            </MenuItem>
            {isAuthenticated ? (
              <>
                <MenuItem onClick={handleMobileMenuClose}>
                  <Link to="/profile" style={{ textDecoration: 'none', color: colors.dark }}>
                    <Typography variant="h6" component="div">
                      Perfil
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMobileMenuClose}>
                  <Link to="/user" style={{ textDecoration: 'none', color: colors.dark }}>
                    <Typography variant="h6" component="div">
                      Favoritos
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography variant="h6" component="div" style={{ color: colors.dark }}>
                    Logout
                  </Typography>
                </MenuItem>
              </>
            ) : (
              <MenuItem onClick={handleMobileMenuClose}>
                <Link to="/signup" style={{ textDecoration: 'none', color: colors.dark }}>
                  <Typography variant="h6" component="div">
                    Tengo un negocio
                  </Typography>
                </Link>
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
                  <Link to="/profile" style={{ textDecoration: 'none', color: colors.dark }}> {/* Cambié a /profile */}
                    <Typography variant="h6" component="div">
                      Perfil
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography variant="h6" component="div" style={{ color: colors.dark }}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to="/signup" style={{ textDecoration: 'none', color: colors.dark }}>
              <IngresarLink variant="h6" component="div"> {/* Usar IngresarLink */}
                Tengo un negocio
              </IngresarLink>
            </Link>
          )}
        </Box>
      </Toolbar>
    </NavBar>
  );
};

export default Navigation;
