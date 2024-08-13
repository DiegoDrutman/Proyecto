import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Alert, Link } from '@mui/material';
import Cookies from 'js-cookie';
import { createUser, authenticateUser } from '../../services/api';
import axios from 'axios';
import {
    FullScreenContainer,
    LeftContainer,
    StyledContainer,
    RightContainer,
    BackgroundWrapper
} from './SignUp.styles';
import { colors } from '../../styles/Variables';

const SignUp = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/get_csrf_token/');
                const csrfToken = response.data.csrfToken;
                Cookies.set('csrftoken', csrfToken);
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
            }
        };

        fetchCsrfToken();
    }, []);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

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
            console.error('Error durante el registro:', error);
            setErrorMessage(error.message || 'Error en el registro. Por favor, verifica tus datos e intenta de nuevo.');
        }
    };

    return (
        <BackgroundWrapper>
            <FullScreenContainer>
                <LeftContainer>
                    <Typography variant="h4" gutterBottom>
                        Bienvenido a BizWave
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Regístrate para empezar a gestionar tu negocio.
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
                                margin="normal"
                            />
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
                                margin="normal"
                            />
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
                                margin="normal"
                            />
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: colors.primary,
                                    color: colors.light,
                                    mt: 2,
                                    '&:hover': {
                                        backgroundColor: colors.secondary,
                                    },
                                }}
                                type="submit"
                                fullWidth
                                disabled={!username || !email || !password}
                            >
                                Registrarse
                            </Button>
                            <Typography variant="body2" sx={{ mt: 2 }}>
                                ¿Ya tienes una cuenta?{' '}
                                <Link href="/login" variant="body2" style={{ color: '#000000', textDecoration: 'underline' }}>
                                    Iniciar sesión
                                </Link>
                            </Typography>
                        </form>
                    </StyledContainer>
                </LeftContainer>
                <RightContainer />
            </FullScreenContainer>
        </BackgroundWrapper>
    );
};

export default SignUp;
