import React, { useState } from 'react';
import { TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
    console.log('Enviando credenciales:', { username, password }); // <-- Agrega este log
    try {
        const response = await authenticateBusiness({ username, password });
        if (response.token) {
            localStorage.setItem('token', response.token);
            setIsAuthenticated(true);
            navigate('/profile');
        } else {
            setError('La autenticación falló. Por favor, inténtalo de nuevo.');
        }
    } catch (err) {
        if (err.response && err.response.status === 403) {
            setError('Tu cuenta o negocio aún no ha sido aprobada.');
        } else {
            setError('Nombre de usuario o contraseña inválidos. Por favor, verifica tus credenciales.');
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
              helperText={error ? 'Por favor verifica tu nombre de usuario.' : ''}
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
              helperText={error ? 'Por favor verifica tu contraseña.' : ''}
            />
            <SubmitButton type="submit" fullWidth variant="contained" disabled={!username || !password}>
              Ingresar
            </SubmitButton>
          </form>
          <SignupLink>
            <Typography variant="body2">
              ¿No tienes una cuenta?{' '}
              <Link component="button" variant="body2" onClick={() => navigate('/signup')}>
                Regístrate aquí
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
