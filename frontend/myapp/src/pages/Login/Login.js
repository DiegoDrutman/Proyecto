import React, { useState } from 'react';
import { TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { authenticateBusiness } from '../../services/api';
import {
  BackgroundWrapper,
  LeftContainer,
  StyledContainer,
  RightContainer,
  SubmitButton,
  ErrorAlert,
  SignupLink,
} from './Login.styles';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
  
    // Verifica los datos que se van a enviar
    console.log('Datos a enviar:', { username: trimmedUsername, password: trimmedPassword });
  
    localStorage.removeItem('token');  // Eliminar cualquier token anterior antes de autenticar
  
    try {
      const response = await authenticateBusiness({
        username: trimmedUsername,
        password: trimmedPassword,
      });

      console.log('Datos a enviar:', { username: trimmedUsername, password: trimmedPassword });
  
      if (response.token) {
        localStorage.setItem('token', response.token);
        setIsAuthenticated(true);
        navigate('/profile');
      } else {
        setError('La autenticación falló. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al autenticar:', error.response ? error.response.data : error.message);
      if (error.response) {
        switch (error.response.status) {
          case 403:
            setError('Tu cuenta o negocio aún no ha sido aprobado.');
            break;
          case 401:
            setError('Credenciales inválidas. Por favor, intenta de nuevo.');
            break;
          case 400:
            setError('Credenciales incorrectas o formato no válido. Detalles: ' + error.response.data);
            break;
          default:
            setError('Error en el servidor. Por favor, intenta más tarde.');
        }
      } else if (error.request) {
        setError('Error en el servidor. No se recibió respuesta.');
      } else {
        setError('Error de configuración. Por favor, inténtalo de nuevo.');
      }
    }    
  };

  return (
    <BackgroundWrapper>
      <LeftContainer>
        <StyledContainer>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          {error && <ErrorAlert severity="error">{error}</ErrorAlert>}
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nombre de usuario"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="Introduce tu nombre de usuario"
              helperText={error && !username ? 'Por favor verifica tu nombre de usuario.' : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Introduce tu contraseña"
              helperText={error && !password ? 'Por favor verifica tu contraseña.' : ''}
            />
            <SubmitButton type="submit" fullWidth variant="contained" disabled={!username || !password}>
              Ingresar
            </SubmitButton>
          </form>
          <SignupLink>
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                ¿No tienes cuenta?{' '}
                  <Link to="/signup" style={{ textDecoration: 'none', color: '#3f51b5' }}>
                          Registrate aquí
                  </Link>
           </Typography>
          </SignupLink>
        </StyledContainer>
      </LeftContainer>
      <RightContainer />
    </BackgroundWrapper>
  );
};

export default Login;
