import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Alert, Link } from '@mui/material';
import Cookies from 'js-cookie';
import { createBusiness } from '../../services/api';
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
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [address, setAddress] = useState('');
    const [operatingHours, setOperatingHours] = useState('');
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
            const businessData = {
                username: name,
                name,
                description,
                category,
                address,
                operating_hours: operatingHours,
                email,
                password
            };
    
            const response = await createBusiness(businessData);
    
            if (response) {
                setIsAuthenticated(true);
                window.location.href = '/login';
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
                        Registra tu empresa para empezar a gestionar tu negocio.
                    </Typography>
                    <StyledContainer>
                        <Typography variant="h4" gutterBottom>
                            Registrar Empresa
                        </Typography>
                        {errorMessage && (
                            <Alert severity="error" onClose={() => setErrorMessage('')} sx={{ mb: 2 }}>
                                {errorMessage}
                            </Alert>
                        )}
                        <form onSubmit={handleSubmit} aria-label="Formulario de registro">
                            <TextField
                                label="Nombre de la Empresa"
                                variant="outlined"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                autoComplete="organization"
                                aria-required="true"
                                aria-label="Nombre de la Empresa"
                                helperText="El nombre de la empresa debe ser único"
                                margin="normal"
                            />
                            <TextField
                                label="Descripción"
                                variant="outlined"
                                fullWidth
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                autoComplete="description"
                                aria-required="true"
                                aria-label="Descripción"
                                margin="normal"
                            />
                            <TextField
                                label="Categoría"
                                variant="outlined"
                                fullWidth
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                autoComplete="category"
                                aria-required="true"
                                aria-label="Categoría"
                                margin="normal"
                            />
                            <TextField
                                label="Dirección"
                                variant="outlined"
                                fullWidth
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                autoComplete="address"
                                aria-required="true"
                                aria-label="Dirección"
                                margin="normal"
                            />
                            <TextField
                                label="Horarios de Operación"
                                variant="outlined"
                                fullWidth
                                value={operatingHours}
                                onChange={(e) => setOperatingHours(e.target.value)}
                                required
                                autoComplete="operating-hours"
                                aria-required="true"
                                aria-label="Horarios de Operación"
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
                                disabled={!name || !email || !password}
                            >
                                Registrar Empresa
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
