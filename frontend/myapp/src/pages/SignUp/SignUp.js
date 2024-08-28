import React, { useState } from 'react';
import { TextField, Button, Typography, Stepper, Step, StepLabel, Alert, Box } from '@mui/material';
import { axiosInstance } from '../../services/api'; 
import { FullScreenContainer, StyledContainer, BackgroundWrapper } from './SignUp.styles';
import { Link } from 'react-router-dom';

const steps = ['Información Básica', 'Detalles de la Empresa', 'Credenciales de Acceso'];

const SignUp = ({ setIsAuthenticated }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [businessName, setBusinessName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState(null);
    const [openingHours, setOpeningHours] = useState('');
    const [closingHours, setClosingHours] = useState('');
    const [workDays, setWorkDays] = useState('');
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateStep = () => {
        let errors = {};

        if (activeStep === 0) {
            if (!businessName) errors.businessName = 'El nombre del negocio es obligatorio.';
            if (!email) errors.email = 'El correo electrónico es obligatorio.';
            else if (!validateEmail(email)) errors.email = 'El formato del correo electrónico no es válido.';
            if (!description) errors.description = 'La descripción es obligatoria.';
        }

        if (activeStep === 1) {
            if (!workDays) errors.workDays = 'Los días de trabajo son obligatorios.';
            if (!openingHours) errors.openingHours = 'El horario de apertura es obligatorio.';
            if (!closingHours) errors.closingHours = 'El horario de cierre es obligatorio.';
            if (!address) errors.address = 'La dirección es obligatoria.';
        }

        if (activeStep === 2) {
            if (!username) errors.username = 'El nombre de usuario es obligatorio.';
            if (!password) errors.password = 'La contraseña es obligatoria.';
            if (password && password.length < 6) errors.password = 'La contraseña debe tener al menos 6 caracteres.';
            if (password !== confirmPassword) errors.confirmPassword = 'Las contraseñas no coinciden.';
        }

        setFieldErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) {
            if (activeStep === steps.length - 1) {
                handleSubmit();
            } else {
                setActiveStep((prevStep) => prevStep + 1);
            }
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const getCsrfToken = () => {
        const csrfToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
        return csrfToken ? csrfToken.split('=')[1] : null;
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('name', businessName);
            formData.append('email', email);
            formData.append('description', description);
            formData.append('opening_hours', openingHours);
            formData.append('closing_hours', closingHours);
            formData.append('work_days', workDays);
            formData.append('address', address);
            formData.append('username', username);
            formData.append('password', password);

            if (logo) {
                formData.append('logo', logo);
            }

            const csrfToken = getCsrfToken();

            const response = await axiosInstance.post('businesses/', formData, {
                headers: {
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'multipart/form-data',
                },
            });

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
                        <Typography variant="h6" gutterBottom>
                            ¿Cómo se llama tu local?
                        </Typography>
                        <TextField
                            label="Nombre del Negocio"
                            variant="outlined"
                            fullWidth
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            required
                            error={Boolean(fieldErrors.businessName)}
                            helperText={fieldErrors.businessName}
                            autoComplete="organization"
                            margin="normal"
                            sx={{ mb: 3 }}
                        />
                        <Typography variant="h6" gutterBottom>
                            ¿Cuál es el correo electrónico de tu negocio?
                        </Typography>
                        <TextField
                            label="Correo Electrónico"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            error={Boolean(fieldErrors.email)}
                            helperText={fieldErrors.email}
                            autoComplete="email"
                            margin="normal"
                            sx={{ mb: 3 }}
                        />
                        <Typography variant="h6" gutterBottom>
                            Describe brevemente los servicios o productos que ofreces.
                        </Typography>
                        <TextField
                            label="Descripción"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            error={Boolean(fieldErrors.description)}
                            helperText={fieldErrors.description}
                            autoComplete="description"
                            margin="normal"
                            sx={{ mb: 3 }}
                        />
                    </>
                );
            case 1:
                return (
                    <>
                        <Typography variant="h6" gutterBottom>
                            ¿Tienes un logo? (opcional)
                        </Typography>
                        <input
                            accept="image/*"
                            id="logo-upload"
                            type="file"
                            onChange={(e) => setLogo(e.target.files[0])}
                            style={{ margin: '20px 0' }}
                        />
                        <Typography variant="h6" gutterBottom>
                            ¿Cuáles son los días de trabajo de tu negocio?
                        </Typography>
                        <TextField
                            label="Días de Trabajo (Ej: Lunes a Viernes)"
                            variant="outlined"
                            fullWidth
                            value={workDays}
                            onChange={(e) => setWorkDays(e.target.value)}
                            required
                            error={Boolean(fieldErrors.workDays)}
                            helperText={fieldErrors.workDays}
                            margin="normal"
                            sx={{ mb: 3 }}
                        />
                        <Typography variant="h6" gutterBottom>
                            ¿Cuál es el horario de tu negocio?
                        </Typography>
                        <Box display="flex" justifyContent="space-between" sx={{ mb: 3 }}>
                            <TextField
                                label="Horario de Apertura"
                                variant="outlined"
                                type="time"
                                InputLabelProps={{ shrink: true }}
                                value={openingHours}
                                onChange={(e) => setOpeningHours(e.target.value)}
                                required
                                error={Boolean(fieldErrors.openingHours)}
                                helperText={fieldErrors.openingHours}
                                sx={{ width: '48%' }}
                            />
                            <TextField
                                label="Horario de Cierre"
                                variant="outlined"
                                type="time"
                                InputLabelProps={{ shrink: true }}
                                value={closingHours}
                                onChange={(e) => setClosingHours(e.target.value)}
                                required
                                error={Boolean(fieldErrors.closingHours)}
                                helperText={fieldErrors.closingHours}
                                sx={{ width: '48%' }}
                            />
                        </Box>
                        <Typography variant="h6" gutterBottom>
                            ¿Cuál es la dirección física de tu negocio?
                        </Typography>
                        <TextField
                            label="Dirección Física"
                            variant="outlined"
                            fullWidth
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            error={Boolean(fieldErrors.address)}
                            helperText={fieldErrors.address}
                            margin="normal"
                            sx={{ mb: 3 }}
                        />
                    </>
                );
            case 2:
                return (
                    <>
                        <Typography variant="h6" gutterBottom>
                            ¿Cuál es el nombre de usuario que deseas utilizar?
                        </Typography>
                        <TextField
                            label="Nombre de Usuario"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            error={Boolean(fieldErrors.username)}
                            helperText={fieldErrors.username}
                            margin="normal"
                            sx={{ mb: 3 }}
                        />
                        <Typography variant="h6" gutterBottom>
                            ¿Cuál es tu contraseña?
                        </Typography>
                        <TextField
                            label="Contraseña"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            error={Boolean(fieldErrors.password)}
                            helperText={fieldErrors.password}
                            margin="normal"
                            sx={{ mb: 3 }}
                        />
                        <Typography variant="h6" gutterBottom>
                            Confirmar Contraseña
                        </Typography>
                        <TextField
                            label="Confirmar Contraseña"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            error={Boolean(fieldErrors.confirmPassword)}
                            helperText={fieldErrors.confirmPassword}
                            margin="normal"
                            sx={{ mb: 3 }}
                        />
                    </>
                );
            default:
                return 'Unknown step';
        }
    };

    return (
        <FullScreenContainer>
            <BackgroundWrapper>
                <StyledContainer>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Box sx={{ p: 3 }}>
                        {errorMessage && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {errorMessage}
                            </Alert>
                        )}
                        {getStepContent(activeStep)}
                        <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
                            <Button
                                color="secondary"
                                variant="outlined"
                                onClick={handleBack}
                                disabled={activeStep === 0}
                            >
                                Atrás
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={handleNext}
                            >
                                {activeStep === steps.length - 1 ? 'Registrarse' : 'Siguiente'}
                            </Button>
                        </Box>
                        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                            ¿Ya tienes una cuenta?{' '}
                            <Link to="/login" style={{ textDecoration: 'none', color: '#3f51b5' }}>
                                Inicia sesión aquí
                            </Link>
                        </Typography>
                    </Box>
                </StyledContainer>
            </BackgroundWrapper>
        </FullScreenContainer>
    );
};

export default SignUp;
