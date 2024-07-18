// src/pages/Signup.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api'; // Asegúrate de tener esta función en tus servicios de API

const StyledContainer = styled(Container)`
  max-width: 400px;
  margin-top: 50px;
  text-align: center;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ email, password });
      if (response.success) {
        setSuccessMessage('Account created successfully. Please log in.');
        setTimeout(() => {
          navigate('/login'); // Redirigir a la página de login después de unos segundos
        }, 2000);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      {errorMessage && (
        <Alert severity="error" onClose={() => setErrorMessage('')} sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" onClose={() => setSuccessMessage('')} sx={{ mb: 2 }}>
          {successMessage}
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
        <Button variant="contained" color="primary" type="submit">
          Sign Up
        </Button>
      </form>
    </StyledContainer>
  );
};

export default Signup;
