import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate de react-router-dom
import { authenticateUser } from '../services/api'; // Importar función de autenticación

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Inicializar useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await authenticateUser({ username, password });
      if (response.token) {
        localStorage.setItem('token', response.token); // Cambiar sessionStorage a localStorage si deseas persistir el token
        setIsAuthenticated(true);
        navigate('/favorites'); // Redirigir a la página de Favoritas
      } else {
        setError('La autenticación falló. Por favor, intenta nuevamente.');
      }
    } catch (err) {
      console.error('Error during authentication:', err);
      setError('Nombre de usuario o contraseña inválidos. Por favor, verifica tus credenciales.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          marginTop: 40,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#fff',
        }}
      >
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nombre de usuario" // Cambiado a español
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
            label="Contraseña" // Cambiado a español
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Introduce tu contraseña"
            helperText={error ? 'Por favor verifica tu contraseña.' : ''}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={!username || !password}
          >
            Ingresar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
