import styled from 'styled-components';
import { Box, Container } from '@mui/material';
import { colors, spacing } from '../../styles/Variables'; // Asegúrate de usar "V" mayúscula para Variables.js

// Contenedor de pantalla completa
export const FullScreenContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
  padding: ${spacing.medium};
  padding-top: 120px;
  background: linear-gradient(to bottom, ${colors.light}, ${colors.warmBackground});

  @media (max-width: 768px) {
    padding: ${spacing.small}; /* Reducir padding en pantallas medianas y móviles */
    padding-top: 100px; /* Ajustar padding superior en pantallas más pequeñas */
  }

  @media (max-width: 480px) {
    padding-top: 80px; /* Reducir padding superior en móviles */
  }
`;

// Contenedor del contenido
export const ContentWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: ${spacing.medium};
  align-items: center;
  max-width: 1200px;
  width: 100%;
  padding: ${spacing.medium};
  background-color: ${colors.background};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: ${spacing.small}; /* Reducir padding en pantallas medianas y móviles */
  }

  @media (max-width: 480px) {
    padding: ${spacing.xsmall}; /* Ajustar padding en móviles */
    border-radius: 5px; /* Reducir el radio de las esquinas en móviles */
  }
`;
