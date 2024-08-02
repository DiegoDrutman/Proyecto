import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Alert, Link } from '@mui/material'; // Importa Link de Material-UI
import { useNavigate } from 'react-router-dom'; // Importa useNavigate de react-router-dom
import { authenticateUser } from '../services/api'; // Importa la función de autenticación

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Inicializa useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await authenticateUser({ username, password });
      if (response.token) {
        localStorage.setItem('token', response.token); // Almacena el token en localStorage
        setIsAuthenticated(true);
        navigate('/favorites'); // Redirige a la página de Favoritos
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during authentication:', err);
      setError('Invalid username or password. Please check your credentials.');
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
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
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
        {/* Enlace al formulario de registro */}
        <Typography variant="body2" sx={{ mt: 2 }}>
          ¿No tienes una cuenta?{' '}
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate('/signup')}
            sx={{ textDecoration: 'underline' }}
          >
            Regístrate aquí
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
