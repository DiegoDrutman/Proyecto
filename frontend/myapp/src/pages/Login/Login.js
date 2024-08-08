// src/pages/Login/Login.js
import React, { useState } from 'react';
import { TextField, Typography, Link } from '@mui/material'; // Añade Link a las importaciones
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../../services/api';
import {
  MainContainer,
  FormContainer,
  Form,
  SubmitButton,
  ErrorAlert,
  SignupLink,
} from './Login.styles'; // Importación de estilos

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await authenticateUser({ username, password });
      if (response.token) {
        localStorage.setItem('token', response.token);
        setIsAuthenticated(true);
        navigate('/user');
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during authentication:', err);
      setError('Invalid username or password. Please check your credentials.');
    }
  };

  return (
    <MainContainer component="main">
      <FormContainer>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        {error && (
          <ErrorAlert severity="error">
            {error}
          </ErrorAlert>
        )}
        <Form component="form" onSubmit={handleSubmit} noValidate>
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
        </Form>
        <SignupLink>
          <Typography variant="body2">
            ¿No tienes una cuenta?{' '}
            <Link component="button" variant="body2" onClick={() => navigate('/signup')}>
              Regístrate aquí
            </Link>
          </Typography>
        </SignupLink>
      </FormContainer>
    </MainContainer>
  );
};

export default Login;
