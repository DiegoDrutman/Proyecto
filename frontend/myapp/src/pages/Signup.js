import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import styled from 'styled-components';
import { createUser } from '../services/api';
import recipeIcon from '../assets/recipe_icon.webp';

// Colores personalizados
const colors = {
  primary: '#8B4513',
  secondary: '#FFD700',
  light: '#FFFACD',
  dark: '#654321',
  accent: '#DAA520',
  warmBackground: '#FFF8DC',
};

// Contenedor de pantalla completa con diseño responsive
const FullScreenContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: ${colors.warmBackground};
  color: ${colors.dark};
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const LeftContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  margin-top: 150px;
  @media (min-width: 768px) {
    width: 65%;
    padding: 40px;
    margin-top: 0;
  }
`;

const StyledContainer = styled(Box)`
  width: 100%;
  max-width: 500px;
  text-align: center;
  padding: 40px 20px;
  background-color: ${colors.light};
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  @media (min-width: 768px) {
    padding: 90px;
    border-radius: 70px;
  }
`;

const RightContainer = styled(Box)`
  display: none;
  @media (min-width: 768px) {
    display: block;
    width: 35%;
    background-image: url(${recipeIcon});
    background-size: cover;
    background-position: center;
  }
`;

const Signup = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Función para validar el correo electrónico
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el correo electrónico
    if (!validateEmail(email)) {
      setErrorMessage('Por favor, introduce un correo electrónico válido.');
      return;
    }

    // Validar la longitud de la contraseña
    if (password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      const response = await createUser({ email, password });
      if (response.success) {
        setIsAuthenticated(true);
      } else {
        setErrorMessage('Error en el registro. Por favor, verifica tus datos e intenta de nuevo.');
      }
    } catch (error) {
      setErrorMessage('Error en el registro. Por favor, verifica tus datos e intenta de nuevo.');
    }
  };

  return (
    <FullScreenContainer>
      <LeftContainer>
        <Typography variant="h4" gutterBottom>
          Bienvenido a ReceTamos
        </Typography>
        <Typography variant="h6" gutterBottom>
          Regístrate para empezar a gestionar tus recetas.
        </Typography>
        <StyledContainer>
          <Typography variant="h4" gutterBottom>
            Registrarse
          </Typography>
          {errorMessage && (
            <Alert severity="error" onClose={() => setErrorMessage('')} sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}
          <form onSubmit={handleSubmit} aria-label="Formulario de registro">
            <Box mb={2}>
              <TextField
                label="Correo Electrónico"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                aria-required="true"
                aria-label="Correo Electrónico"
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Contraseña"
                variant="outlined"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                aria-required="true"
                aria-label="Contraseña"
                helperText="Debe tener al menos 6 caracteres"
              />
            </Box>
            <Button
              variant="contained"
              sx={{ backgroundColor: colors.primary, color: colors.light }}
              type="submit"
              fullWidth
              disabled={!email || !password} // Deshabilitar botón si los campos están vacíos
            >
              Registrarse
            </Button>
          </form>
        </StyledContainer>
      </LeftContainer>
      <RightContainer />
    </FullScreenContainer>
  );
};

export default Signup;
