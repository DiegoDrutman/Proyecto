// src/components/UserProfile.js
import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import styled from 'styled-components';

// Estilos para el contenedor del perfil
const ProfileContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
`;

// Componente de perfil de usuario
const UserProfile = ({ user }) => {
  return (
    <ProfileContainer>
      <Avatar
        alt={user.name}
        src={user.avatar} // Asegúrate de que la imagen del avatar esté disponible
        sx={{ width: 100, height: 100, marginBottom: 2 }}
      />
      <Typography variant="h4" gutterBottom>
        {user.name}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Email: {user.email}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Miembro desde: {new Date(user.joinedDate).toLocaleDateString()}
      </Typography>
      {/* Puedes añadir más información del usuario aquí */}
    </ProfileContainer>
  );
};

export default UserProfile;
