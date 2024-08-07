// src/components/UserProfile/UserProfile.js
import React from 'react';
import { Typography, Avatar } from '@mui/material';
import { ProfileContainer } from './UserProfile.styles'; // Importar el contenedor de estilos

const UserProfile = ({ user }) => {
  if (!user) {
    return <Typography variant="h6">Cargando información del usuario...</Typography>;
  }

  const avatarSrc = user.avatar || 'https://via.placeholder.com/100';
  const joinedDate = user.joined_date ? new Date(user.joined_date).toLocaleDateString() : 'Fecha desconocida';

  return (
    <ProfileContainer>
      <Avatar
        alt={user.user.username}
        src={avatarSrc}
        sx={{ width: 100, height: 100, marginBottom: 2 }}
      />
      <Typography variant="h4" gutterBottom>
        {user.user.username}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Email: {user.user.email}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Miembro desde: {joinedDate}
      </Typography>
    </ProfileContainer>
  );
};

export default UserProfile;
