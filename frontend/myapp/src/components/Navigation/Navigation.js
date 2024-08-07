// src/components/Navigation/Navigation.js
import React, { useState } from 'react';
import { Toolbar, Box, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logo from '../../assets/logo.webp';
import { NavBar, NavLink } from './Navigation.styles'; // Importar estilos
import { colors } from '../../styles/Variables'; // Importar variables de color desde Variables.js

const Navigation = ({ isAuthenticated, userName, onLogin, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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
    <NavBar>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: 'inherit' }}>
            <img src={Logo} alt="ReceTamos Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
            <Typography
              variant="h5"
              component="div"
              sx={{
                color: colors.dark, // Usar el color de texto desde Variables.js
                fontWeight: 'bold',
                fontSize: '1.5rem',
              }}
            >
              ReceTamos!
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
            <MenuItem onClick={() => { handleMobileMenuClose(); navigateAndScroll('top-recipes'); }}>
              <Typography variant="h6" component="div" style={{ color: colors.dark }}> {/* Usar color de Variables.js */}
                Populares
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => { handleMobileMenuClose(); navigateAndScroll('all-recipes'); }}>
              <Typography variant="h6" component="div" style={{ color: colors.dark }}> {/* Usar color de Variables.js */}
                Recetas
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
                  <Link to="/favorites" style={{ textDecoration: 'none', color: colors.dark }}>
                    <Typography variant="h6" component="div">
                      Favoritas
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
                <Link to="/login" style={{ textDecoration: 'none', color: colors.dark }}>
                  <Typography variant="h6" component="div">
                    Ingresar
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
                  <Link to="/favorites" style={{ textDecoration: 'none', color: colors.dark }}>
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
            <Link to="/login" style={{ textDecoration: 'none', color: colors.dark }}>
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
