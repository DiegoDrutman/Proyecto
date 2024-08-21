import React, { useState, useEffect } from 'react';
import { Avatar, Typography, CardContent, Button } from '@mui/material';
import { getBusinessProfile } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import {
  ProfileContainer,
  ProfileHeader,
  ProfileDetails,
  StyledCard,
  InfoRow,
  BackgroundOverlay,
  LogoutButtonContainer,
} from './UserProfile.styles';

const UserProfile = ({ onLogout }) => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    description: '',
    opening_hours: '',
    closing_hours: '',
    work_days: '',
    address: '',
    logo: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getBusinessProfile();
        setProfileData(data);
      } catch (error) {
        setErrorMessage('Error al cargar el perfil.');
      }
    };
    fetchProfileData();
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <>
      <BackgroundOverlay />
      <ProfileContainer>
        <ProfileHeader>
          <Avatar src={profileData.logo} alt="Logo del negocio" sx={{ width: 150, height: 150 }} />
          <Typography variant="h4">{profileData.name}</Typography>
          <Typography variant="subtitle1" color="textSecondary">{profileData.email}</Typography>
        </ProfileHeader>

        <ProfileDetails>
          <StyledCard>
            <CardContent>
              <Typography variant="h6">Descripción</Typography>
              <Typography>{profileData.description}</Typography>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent>
              <Typography variant="h6">Horario de Trabajo</Typography>
              <InfoRow>
                <Typography>Desde: {profileData.opening_hours}</Typography>
                <Typography>Hasta: {profileData.closing_hours}</Typography>
              </InfoRow>
              <Typography>Días de Trabajo: {profileData.work_days}</Typography>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent>
              <Typography variant="h6">Dirección</Typography>
              <Typography>{profileData.address}</Typography>
            </CardContent>
          </StyledCard>
        </ProfileDetails>

        <LogoutButtonContainer>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </LogoutButtonContainer>
      </ProfileContainer>
    </>
  );
};

export default UserProfile;
