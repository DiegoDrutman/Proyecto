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

    localStorage.removeItem('token');

    try {
      const response = await authenticateBusiness({
        username: trimmedUsername,
        password: trimmedPassword,
      });

      if (response.token) {
        localStorage.setItem('token', response.token);
        setIsAuthenticated(true);
        navigate('/profile');
      } else {
        setError('La autenticación falló.');
      }
    } catch (error) {
      setError('Error al autenticar.');
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <SubmitButton type="submit" fullWidth variant="contained" disabled={!username || !password}>
              Ingresar
            </SubmitButton>
          </form>
          <SignupLink>
            <Typography variant="body2" align="center">
              ¿No tienes cuenta? <Link to="/signup">Registrate aquí</Link>
            </Typography>
          </SignupLink>
        </StyledContainer>
      </LeftContainer>
      <RightContainer />
    </BackgroundWrapper>
  );
};

export default Login;
