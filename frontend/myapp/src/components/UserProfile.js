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
  // Verifica que los datos del usuario están disponibles
  if (!user) {
    return <Typography variant="h6">Cargando información del usuario...</Typography>;
  }

  // Usa un avatar por defecto si no hay imagen disponible
  const avatarSrc = user.avatar || 'https://via.placeholder.com/100';

  return (
    <ProfileContainer>
      <Avatar
        alt={user.name || user.username || 'Usuario'} // Usa el nombre de usuario si el nombre completo no está disponible
        src={avatarSrc} // Usa el avatar del usuario o una imagen por defecto
        sx={{ width: 100, height: 100, marginBottom: 2 }}
      />
      <Typography variant="h4" gutterBottom>
        {user.name || user.username} {/* Usa el nombre o el nombre de usuario */}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Email: {user.email}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Miembro desde: {user.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : 'Fecha desconocida'}
      </Typography>
      {/* Añadir más información del usuario si es necesario */}
      {user.favoriteCount !== undefined && (
        <Typography variant="body1" color="textSecondary">
          Recetas favoritas: {user.favoriteCount}
        </Typography>
      )}
      {user.createdRecipesCount !== undefined && (
        <Typography variant="body1" color="textSecondary">
          Recetas creadas: {user.createdRecipesCount}
        </Typography>
      )}
    </ProfileContainer>
  );
};

export default UserProfile;
