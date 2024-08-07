// src/components/UserProfile/UserProfile.styles.js
import styled from 'styled-components';
import { Box } from '@mui/material';
import { colors, spacing } from '../../styles/Variables'; // Asegúrate de importar Variables.js con "V" mayúscula

// Contenedor de perfil
export const ProfileContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${spacing.medium};
  background-color: ${colors.light};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: ${spacing.large};
`;
