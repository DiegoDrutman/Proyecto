import { useState } from 'react';
import { TextField, Typography, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { authenticateBusiness } from '../../services/api.jsx';
import PropTypes from 'prop-types';  // Importación de PropTypes
import {
  BackgroundWrapper,
  LeftContainer,
  StyledContainer,
  RightContainer,
  SubmitButton,
  ErrorAlert,
  SignupLink,
} from './Login.styles.js';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
  
    localStorage.removeItem('token');
    setLoading(true); // Mostrar el spinner
  
    try {
      const response = await authenticateBusiness({
        username: trimmedUsername,
        password: trimmedPassword,
      });
  
      if (response.token) {
        localStorage.setItem('token', response.token);
        setIsAuthenticated(true);
        navigate('/profile');
      } else {
        setError('Nombre de usuario o contraseña incorrectos.');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Credenciales incorrectas o cuenta no aprobada.');
      } else {
        setError(`Error al autenticar. Verifica tus credenciales e inténtalo de nuevo: ${error.message}`);
      }
    } finally {
      setLoading(false); // Ocultar el spinner
    }
  };

  // Limpiar el mensaje de error cuando el usuario empieza a escribir
  const handleInputChange = (setter) => (e) => {
    setError('');
    setter(e.target.value);
  };

  return (
    <BackgroundWrapper>
      <LeftContainer>
        <StyledContainer>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          {error && <ErrorAlert severity="error">{error}</ErrorAlert>}
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nombre de usuario"
              name="username"
              value={username}
              onChange={handleInputChange(setUsername)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              value={password}
              onChange={handleInputChange(setPassword)}
            />
            <SubmitButton type="submit" fullWidth variant="contained" disabled={!username || !password || loading}>
              {loading ? <CircularProgress size={24} /> : 'Ingresar'}
            </SubmitButton>
          </form>
          <SignupLink>
            <Typography variant="body2" align="center">
              ¿No tienes cuenta? <Link to="/signup">Regístrate aquí</Link>
            </Typography>
          </SignupLink>
        </StyledContainer>
      </LeftContainer>
      <RightContainer />
    </BackgroundWrapper>
  );
};

// Añadir PropTypes para validar las props
Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,  // Validar que setIsAuthenticated es una función
};

export default Login;
