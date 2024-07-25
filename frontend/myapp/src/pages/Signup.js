import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { createUser } from '../services/api';
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
  margin-top: 150px; /* Añadido margen superior */

  @media (min-width: 768px) {
    width: 65%; /* Ajustado al 65% para diseño dividido */
    padding: 40px;
    margin-top: 0; /* Remover margen superior en pantallas grandes */
  }
`;

const StyledContainer = styled(Box)`
  width: 100%;
  max-width: 500px; /* Ancho máximo fijo */
  text-align: center;
  padding: 40px 20px; /* Ajuste del padding */
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (min-width: 768px) {
    padding: 90px; /* Ajuste del padding */
    border-radius: 70px;
  }
`;

const RightContainer = styled(Box)`
  display: none;

  @media (min-width: 768px) {
    display: block;
    width: 35%; /* Ajustado al 35% para diseño dividido */
    background-image: url(${illustration});
    background-size: contain; /* Ajuste para que la imagen sea responsive */
    background-position: right;
    background-repeat: no-repeat; /* Asegura que la imagen no se repita */
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
  color: #004080 !important; /* Asegurarse de que el color se aplique */
  border-radius: 5px !important; /* Añade bordes redondeados para un mejor diseño */
  padding: 8px 16px !important; /* Ajusta el padding para que sean más grandes */
  background-color: transparent !important; /* Fondo transparente */
  &:hover {
    background-color: rgba(255, 255, 255, 0.9) !important; /* Fondo más claro en hover */
  }
`;

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await createUser({ username: email, email, password }); // Asegúrate de que los campos están correctamente mapeados
        console.log("API Response:", response); // Verifica lo que realmente está devolviendo la API
        if (response && response.success) {
            navigate('/login'); // Redirigir a la página de login
        } else {
            setErrorMessage(response.message || 'Registration failed. Please check your details and try again.');
        }
    } catch (error) {
        console.error("Registration Error:", error);
        setErrorMessage(error.message || 'Registration failed. Please check your details and try again.');
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
        <Typography variant="h6" gutterBottom>
          Empieza ya tu prueba gratis. No se necesita tarjeta de crédito.
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
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Registrarse
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2 }}>
            ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
          </Typography>
        </StyledContainer>
      </LeftContainer>
      <RightContainer />
    </FullScreenContainer>
  );
};

export default Signup;
