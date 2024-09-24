import { useState, useEffect } from 'react';
import { Toolbar, Box, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle'; // Importación corregida
import { NavBar, NavLink } from './Navigation.styles'; // Importar estilos
import PropTypes from 'prop-types'; // Importar PropTypes

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
    <NavBar $scrolled={scrolled}>
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
                transition: 'transform 0.5s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
                marginTop: '-25px',
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
            {!isAuthenticated && (
              <MenuItem onClick={() => { navigate('/signup'); handleMobileMenuClose(); }}>
                Tengo un negocio
              </MenuItem>
            )}
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
          {!isAuthenticated && (
            <NavLink
              variant="h6"
              component="div"
              onClick={() => navigate('/signup')}
            >
              Tengo un negocio
            </NavLink>
          )}
          {isAuthenticated && (
            <>
              <IconButton
                size="large"
                aria-label="perfil"
                onClick={() => navigate('/profile')}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <IconButton
                size="large"
                aria-label="cerrar sesión"
                onClick={() => {
                  localStorage.removeItem('token');
                  navigate('/login');
                }}
                color="inherit"
              >
                <Typography variant="body2">Cerrar sesión</Typography>
              </IconButton>
            </>
          )}
        </Box>
      </Toolbar>
    </NavBar>
  );
};

// Añadir PropTypes para validar las props
Navigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired, // Verifica que sea un booleano
};

export default Navigation;
