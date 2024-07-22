import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { authenticateUser } from '../services/api'; // Asegúrate de tener esta función en tus servicios de API
import illustration from '../assets/a_modern,_professional_illustration_of_people_coll.jpg'; // Asegúrate de que la ruta de la imagen sea correcta
import logo from '../assets/logo.png'; // Asegúrate de que la ruta del logo sea correcta

const FullScreenContainer = styled(Box)`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #E5E4E2;
  color: #333;
`;

const LeftContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%; /* Ajustado al 60% para diseño dividido */
  padding: 40px;
`;

const StyledContainer = styled(Box)`
  width: 500px; /* Ancho fijo */
  text-align: center;
  padding: 100px; /* Ajuste del padding */
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 70px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const RightContainer = styled(Box)`
  width: 50%; /* Ajustado al 40% para diseño dividido */
  background-image: url(${illustration});
  background-size: cover;
  background-position: center;
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
  color: #004080 !important; /* Asegurarse de que el color se aplique */
  border-radius: 5px !important; /* Añade bordes redondeados para un mejor diseño */
  padding: 8px 16px !important; /* Ajusta el padding para que sean más grandes */
  background-color: transparent !important; /* Fondo transparente */
  &:hover {
    background-color: rgba(255, 255, 255, 0.9) !important; /* Fondo más claro en hover */
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
      if (response.success) {
        setIsAuthenticated(true);
        navigate('/projects'); // Redirigir a la página de proyectos
      } else {
        setErrorMessage(response.message);
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
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </StyledContainer>
      </LeftContainer>
      <RightContainer />
    </FullScreenContainer>
  );
};

export default Login;
