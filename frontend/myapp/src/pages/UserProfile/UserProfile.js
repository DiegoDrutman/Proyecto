import React, { useState, useEffect } from 'react';
import { Alert } from '@mui/material';
import { getBusinessProfile, updateBusinessProfile } from '../../services/api';
import {
    ProfileContainer,
    ProfileTitle,
    UpdateButton,
    StyledTextField,
    HoursContainer,
    HoursTextField,
    Divider,
    BackgroundOverlay,
    LogoContainer
} from './UserProfile.styles';

const UserProfile = () => {
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        description: '',
        opening_hours: '',
        closing_hours: '',
        work_days: '',
        address: '',
        logo: '', // Añadir logo si está disponible
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const data = await getBusinessProfile();
                setProfileData(data);
            } catch (error) {
                setErrorMessage('Error al cargar el perfil. Por favor, inténtalo nuevamente.');
            }
        };
        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateBusinessProfile(profileData);
            setSuccessMessage('Perfil actualizado con éxito.');
        } catch (error) {
            setErrorMessage('Error al actualizar el perfil. Por favor, inténtalo nuevamente.');
        }
    };

    return (
        <>
            <BackgroundOverlay />  {/* Añadir overlay para mejor contraste */}
            <ProfileContainer>
                <ProfileTitle variant="h4" gutterBottom>
                    Perfil de Empresa
                </ProfileTitle>

                {profileData.logo && (
                    <LogoContainer>
                        <img src={profileData.logo} alt="Logo del Negocio" />
                    </LogoContainer>
                )}

                {errorMessage && (
                    <Alert severity="error" onClose={() => setErrorMessage('')} sx={{ mb: 2 }}>
                        {errorMessage}
                    </Alert>
                )}

                {successMessage && (
                    <Alert severity="success" onClose={() => setSuccessMessage('')} sx={{ mb: 2 }}>
                        {successMessage}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <StyledTextField
                        label="Nombre del Negocio"
                        name="name"
                        variant="outlined"
                        fullWidth
                        value={profileData.name}
                        onChange={handleChange}
                    />
                    <StyledTextField
                        label="Correo Electrónico"
                        name="email"
                        variant="outlined"
                        fullWidth
                        value={profileData.email}
                        onChange={handleChange}
                    />
                    <StyledTextField
                        label="Descripción"
                        name="description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={profileData.description}
                        onChange={handleChange}
                    />
                    
                    <Divider />  {/* Añadir un separador visual */}

                    <StyledTextField
                        label="Días de Trabajo"
                        name="work_days"
                        variant="outlined"
                        fullWidth
                        value={profileData.work_days}
                        onChange={handleChange}
                    />
                    <HoursContainer>
                        <HoursTextField
                            label="Horario de Apertura"
                            name="opening_hours"
                            variant="outlined"
                            type="time"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={profileData.opening_hours}
                            onChange={handleChange}
                        />
                        <HoursTextField
                            label="Horario de Cierre"
                            name="closing_hours"
                            variant="outlined"
                            type="time"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={profileData.closing_hours}
                            onChange={handleChange}
                        />
                    </HoursContainer>
                    
                    <Divider />  {/* Añadir un separador visual */}

                    <StyledTextField
                        label="Dirección Física"
                        name="address"
                        variant="outlined"
                        fullWidth
                        value={profileData.address}
                        onChange={handleChange}
                    />
                    <UpdateButton
                        variant="contained"
                        type="submit"
                    >
                        Actualizar Perfil
                    </UpdateButton>
                </form>
            </ProfileContainer>
        </>
    );
};

export default UserProfile;
