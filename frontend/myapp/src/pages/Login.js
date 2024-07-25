import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { authenticateUser } from '../services/api';
import illustration from '../assets/Taskwave.png';
import logo from '../assets/logo.png';

const FullScreenContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #E5E4E2;
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
    background-image: url(${illustration});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

const Header = styled(Box)`
  position: fixed;
  top: 0;
  left: 8px;
  display: flex;
  align-items: center;
  padding: 8px 16px;
`;

const Logo = styled('img')`
  height: 50px;
  margin-right: 10px;
`;

const NavButton = styled(Button)`
  color: #004080 !important;
  border-radius: 5px !important;
  padding: 8px 16px !important;
  background-color: transparent !important;
  &:hover {
    background-color: rgba(255, 255, 255, 0.9) !important;
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
        navigate('/projects');
      } else {
        setErrorMessage('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <FullScreenContainer>
      <Header>
        <Logo src={logo} alt="TaskWave Logo" />
        <NavButton component={Link} to="/">
          <Typography variant="h4" sx={{ color: '#004080' }}>
            TaskWave
          </Typography>
        </NavButton>
      </Header>
      <LeftContainer>
        <Typography variant="h4" gutterBottom>
          Te damos la Bienvenida a TaskWave.
        </Typography>
        <Typography variant="h4" gutterBottom>
          Empieza ya tu prueba gratis. No se necesita tarjeta de crédito.
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
            ¿No tienes una cuenta creada? <Link to="/signup">Registrarse</Link>
          </Typography>
        </StyledContainer>
      </LeftContainer>
      <RightContainer />
    </FullScreenContainer>
  );
};

export default Login;
  