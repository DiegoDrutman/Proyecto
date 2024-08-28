import React, { useState, useEffect } from 'react';
import { Avatar, Typography, CardContent, Button, Alert, CircularProgress } from '@mui/material';
import { getBusinessProfile } from '../../services/api';
import ProductList from '../../components/ProductList/ProductList';
import { useNavigate } from 'react-router-dom';
import {
  ProfileContainer,
  ProfileHeader,
  ProfileDetails,
  StyledCard,
  InfoRow,
  BackgroundOverlay,
  LogoutButtonContainer,
} from './BusinessProfile.styles';

const BusinessProfile = ({ onLogout }) => {
  const [profileData, setProfileData] = useState(null); // Cambié el estado inicial a null para manejar la carga
  const [loading, setLoading] = useState(true); // Estado de carga
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getBusinessProfile();
        console.log('Datos del perfil:', data);  // Agrega este log para depuración
        if (!data || Object.keys(data).length === 0) {
          setErrorMessage('Error al cargar el perfil.');
          navigate('/login'); // Redirigir si no se pueden obtener los datos del perfil
        } else {
          setProfileData(data);
        }
      } catch (error) {
        setErrorMessage('Error al cargar el perfil.');
        navigate('/login'); // Redirigir en caso de error
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };
    fetchProfileData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/login');
  };

  if (loading) {
    return <CircularProgress />; // Indicador de carga
  }

  if (errorMessage) {
    return (
      <Alert severity="error" onClose={() => setErrorMessage('')}>
        {errorMessage}
      </Alert>
    );
  }

  return (
    <>
      <BackgroundOverlay />
      <ProfileContainer>
        <ProfileHeader>
          <Avatar src={profileData?.logo || '/default-logo.png'} alt="Logo del negocio" sx={{ width: 150, height: 150 }} />
          <Typography variant="h4">{profileData?.name || 'Nombre del negocio'}</Typography>
          <Typography variant="subtitle1" color="textSecondary">{profileData?.email || 'Correo no disponible'}</Typography>
        </ProfileHeader>

        <ProfileDetails>
          <StyledCard>
            <CardContent>
              <Typography variant="h6">Descripción</Typography>
              <Typography>{profileData?.description || 'No hay descripción disponible.'}</Typography>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent>
              <Typography variant="h6">Horario de Trabajo</Typography>
              <InfoRow>
                <Typography>Desde: {profileData?.opening_hours || 'N/A'}</Typography>
                <Typography>Hasta: {profileData?.closing_hours || 'N/A'}</Typography>
              </InfoRow>
              <Typography>Días de Trabajo: {profileData?.work_days || 'No especificado'}</Typography>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent>
              <Typography variant="h6">Dirección</Typography>
              <Typography>{profileData?.address || 'No hay dirección disponible.'}</Typography>
            </CardContent>
          </StyledCard>
        </ProfileDetails>

        {profileData?.id && <ProductList businessId={profileData.id} />}

        <LogoutButtonContainer>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </LogoutButtonContainer>
      </ProfileContainer>
    </>
  );
};

export default BusinessProfile;
