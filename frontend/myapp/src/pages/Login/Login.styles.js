// src/pages/Login/Login.styles.js
import styled from 'styled-components';
import { Box, Container, Button, Alert } from '@mui/material'; // Añade Button y Alert a las importaciones
import { colors, spacing } from '../../styles/Variables'; // Importa las variables

// Estilo para el contenedor principal
export const MainContainer = styled(Container)`
  max-width: 400px;
  margin-top: ${spacing.large};
  padding: ${spacing.medium};
  background-color: ${colors.light};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

// Estilo para el contenedor del formulario
export const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Estilo para el formulario
export const Form = styled(Box)`
  margin-top: ${spacing.small};
  width: 100%;
`;

// Estilo para el botón de envío
export const SubmitButton = styled(Button)` // Cambiado Box por Button
  margin-top: ${spacing.medium};
  margin-bottom: ${spacing.small};
  background-color: ${colors.primary};
  color: ${colors.light};

  &:hover {
    background-color: ${colors.secondary};
  }

  &:disabled {
    background-color: ${colors.accent};
    color: ${colors.dark};
  }
`;

// Estilo para la alerta de error
export const ErrorAlert = styled(Alert)` // Cambiado Box por Alert
  margin-top: ${spacing.small};
`;

// Estilo para el enlace de registro
export const SignupLink = styled(Box)`
  margin-top: ${spacing.medium};
  text-align: center;
  font-size: 0.875rem;

  a {
    text-decoration: underline;
    cursor: pointer;
    color: ${colors.primary};

    &:hover {
      color: ${colors.secondary};
    }
  }
`;
