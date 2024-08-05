import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, CircularProgress, Alert } from '@mui/material';
import styled from 'styled-components';
import UserProfile from '../components/UserProfile'; 
import { getUserProfile } from '../services/api';

const FullScreenContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
  padding: 20px;
  padding-top: 120px;
`;

const ContentWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  padding: 20px;
`;

const Favorites = () => {
  const [user, setUser] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorProfile, setErrorProfile] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoadingProfile(true);
        const userData = await getUserProfile();
        setUser(userData);
        setLoadingProfile(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setErrorProfile('Error al cargar el perfil del usuario.');
        setLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <FullScreenContainer>
      <ContentWrapper>
        <Typography variant="h3" gutterBottom>
          Mi Perfil
        </Typography>
        {loadingProfile ? (
          <CircularProgress />
        ) : errorProfile ? (
          <Alert severity="error">{errorProfile}</Alert>
        ) : (
          user && <UserProfile user={user} />
        )}

      </ContentWrapper>
    </FullScreenContainer>
  );
};

export default Favorites;
