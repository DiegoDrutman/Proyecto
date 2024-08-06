import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { createUser, authenticateUser } from '../services/api';
import axios from 'axios';

// Colores para el estilo
const colors = {
    primary: '#8B4513',
    secondary: '#FFD700',
    light: '#FFFACD',
    dark: '#654321',
    accent: '#DAA520',
    warmBackground: '#FFF8DC',
};

// Contenedor de pantalla completa
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

// Contenedor izquierdo
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

// Contenedor estilizado
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

// Contenedor derecho
const RightContainer = styled(Box)`
    display: none;
    @media (min-width: 768px) {
        display: block;
        width: 35%;
        background-size: cover;
        background-position: center;
    }
`;

// Componente SignUp
const SignUp = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Función para obtener el token CSRF al cargar el componente
    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/get_csrf_token/');
                const csrfToken = response.data.csrfToken;
                console.log('CSRF Token:', csrfToken); // Verificar el token obtenido
                Cookies.set('csrftoken', csrfToken);  // Guarda el token en las cookies
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
            }
        };

        fetchCsrfToken();
    }, []);

    // Validación de email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Manejo de envío de formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setErrorMessage('Por favor, introduce un correo electrónico válido.');
            return;
        }

        if (password.length < 6) {
            setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        try {
            const response = await createUser({ username, email, password });

            if (response) {
                try {
                    const authResponse = await authenticateUser({ username, password });
                    if (authResponse.token) {
                        localStorage.setItem('token', authResponse.token);
                        setIsAuthenticated(true);
                        window.location.href = '/login';
                    } else {
                        setErrorMessage('Error al iniciar sesión después del registro. Por favor, intenta iniciar sesión manualmente.');
                    }
                } catch (authError) {
                    console.error('Error during automatic login:', authError);
                    setErrorMessage('Error al iniciar sesión después del registro. Por favor, intenta iniciar sesión manualmente.');
                }
            } else {
                setErrorMessage('Error en el registro. Por favor, verifica tus datos e intenta de nuevo.');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setErrorMessage(error.message || 'Error en el registro. Por favor, verifica tus datos e intenta de nuevo.');
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
                                label="Nombre de Usuario"
                                variant="outlined"
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoComplete="username"
                                aria-required="true"
                                aria-label="Nombre de Usuario"
                                helperText="El nombre de usuario debe ser único"
                            />
                        </Box>
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
                            disabled={!username || !email || !password}
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

export default SignUp;
