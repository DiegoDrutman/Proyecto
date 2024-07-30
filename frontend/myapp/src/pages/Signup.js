import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import styled from 'styled-components';
import { createUser } from '../services/api';
import recipeIcon from '../assets/recipe_icon.webp';

const colors = {
  primary: '#8B4513',
  secondary: '#FFD700',
  light: '#FFFACD',
  dark: '#654321',
  accent: '#DAA520',
  warmBackground: '#FFF8DC',
};

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser({ email, password });
      if (response.success) {
        setIsAuthenticated(true);
      } else {
        setErrorMessage('Registration failed. Please check your details and try again.');
      }
    } catch (error) {
      setErrorMessage('Registration failed. Please check your details and try again.');
    }
  };

  return (
    <FullScreenContainer>
      <LeftContainer>
        <Typography variant="h4" gutterBottom>
          Bienvenido a MealMaker
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
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Button variant="contained" sx={{ backgroundColor: colors.primary, color: colors.light }} type="submit" fullWidth>
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
