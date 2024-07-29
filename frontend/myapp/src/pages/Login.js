import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { authenticateUser } from '../services/api';
import documentIcon from '../assets/document_icon.webp'; // Asumiendo que tienes un nuevo icono relevante

const FullScreenContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  color: #333;
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
  background-color: rgba(255, 255, 255, 0.9);
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
    background-image: url(${documentIcon});
    background-size: cover;
    background-position: center;
  }
`;

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authenticateUser({ email, password });
      if (response.access) {
        setIsAuthenticated(true);
        navigate('/document-list'); // Updated to navigate to document list
      } else {
        setErrorMessage('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <FullScreenContainer>
      <LeftContainer>
        <Typography variant="h4" gutterBottom>
          Bienvenido a DocumentFlow.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Accede para gestionar tus documentos de forma segura y eficiente.
        </Typography>
        <StyledContainer>
          <Typography variant="h4" gutterBottom>
            Login
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
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Login
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2 }}>
            ¿No tienes una cuenta? <Link to="/signup">Registrarse</Link>
          </Typography>
        </StyledContainer>
      </LeftContainer>
      <RightContainer />
    </FullScreenContainer>
  );
};

export default Login;
