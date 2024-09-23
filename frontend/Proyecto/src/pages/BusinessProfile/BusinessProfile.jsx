import { useState, useEffect } from 'react';
import { Avatar, Typography, CardContent, Button, Alert, CircularProgress } from '@mui/material';
import { getBusinessProfile } from '../../services/api';
import ProductList from '../../components/ProductList/ProductList';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';  // Importación de PropTypes
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
  const [profileData, setProfileData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getBusinessProfile();
        console.log('Datos del perfil:', data);  // Depuración
        if (!data || Object.keys(data).length === 0) {
          setErrorMessage('Error al cargar el perfil.');
          navigate('/login');
        } else {
          setProfileData(data);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setErrorMessage('Token inválido o negocio no aprobado.');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setErrorMessage(`Error al cargar el perfil: ${error.message}`);
        }
      } finally {
        setLoading(false);
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
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress /> 
      </div>
    );
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
              <InfoRow>
                <Typography variant="h6">Descripción:</Typography>
                <Typography variant="body1">{profileData?.description || 'No hay descripción disponible'}</Typography>
              </InfoRow>
              <InfoRow>
                <Typography variant="h6">Dirección:</Typography>
                <Typography variant="body1">{profileData?.address || 'Dirección no disponible'}</Typography>
              </InfoRow>
              <InfoRow>
                <Typography variant="h6">Horario:</Typography>
                <Typography variant="body1">
                  {profileData?.opening_hours || 'No disponible'} - {profileData?.closing_hours || 'No disponible'}
                </Typography>
              </InfoRow>
            </CardContent>
          </StyledCard>
        </ProfileDetails>

        {profileData?.products && profileData.products.length > 0 ? (
          <ProductList products={profileData.products} />
        ) : (
          <Typography variant="body1">No hay productos disponibles.</Typography>
        )}

        <LogoutButtonContainer>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </LogoutButtonContainer>
      </ProfileContainer>
    </>
  );
};

// Añadir PropTypes para validar las props
BusinessProfile.propTypes = {
  onLogout: PropTypes.func.isRequired,  // Validar que onLogout es una función
};

export default BusinessProfile;
