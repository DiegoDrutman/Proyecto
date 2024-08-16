import React, { useState } from 'react';
import { TextField, Button, Typography, Stepper, Step, StepLabel, Alert, Link } from '@mui/material';
import { createBusiness } from '../../services/api';
import {
    FullScreenContainer,
    LeftContainer,
    StyledContainer,
    RightContainer,
    BackgroundWrapper
} from './SignUp.styles';
import { colors } from '../../styles/Variables';

const steps = ['Información Básica', 'Detalles de la Empresa', 'Información de Contacto y Seguridad'];

const SignUp = ({ setIsAuthenticated }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [address, setAddress] = useState('');
    const [operatingHours, setOperatingHours] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            handleSubmit();
        } else {
            setActiveStep(prevStep => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(prevStep => prevStep - 1);
    };

    const handleSubmit = async () => {
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
            setErrorMessage(error.message || 'Error en el registro. Por favor, verifica tus datos e intenta de nuevo.');
        }
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <TextField
                            label="Nombre de la Empresa"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoComplete="organization"
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
                            margin="normal"
                        />
                    </>
                );
            case 1:
                return (
                    <>
                        <TextField
                            label="Dirección"
                            variant="outlined"
                            fullWidth
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            autoComplete="address"
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
                            margin="normal"
                        />
                    </>
                );
            case 2:
                return (
                    <>
                        <TextField
                            label="Correo Electrónico"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
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
                            margin="normal"
                        />
                    </>
                );
            default:
                return 'Unknown step';
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
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <StyledContainer>
                        {errorMessage && (
                            <Alert severity="error" onClose={() => setErrorMessage('')} sx={{ mb: 2 }}>
                                {errorMessage}
                            </Alert>
                        )}
                        <form onSubmit={(e) => e.preventDefault()} aria-label="Formulario de registro">
                            {getStepContent(activeStep)}
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
                                onClick={handleNext}
                                disabled={activeStep === steps.length - 1 && (!name || !email || !password)}
                            >
                                {activeStep === steps.length - 1 ? 'Registrar Empresa' : 'Siguiente'}
                            </Button>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} sx={{ mt: 2, ml: 1 }}>
                                    Atrás
                                </Button>
                            )}
                        </form>
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            ¿Ya tienes una cuenta?{' '}
                            <Link href="/login" variant="body2" style={{ color: '#000000', textDecoration: 'underline' }}>
                                Iniciar sesión
                            </Link>
                        </Typography>
                    </StyledContainer>
                </LeftContainer>
                <RightContainer />
            </FullScreenContainer>
        </BackgroundWrapper>
    );
};

export default SignUp;
