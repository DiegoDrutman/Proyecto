import styled from 'styled-components';
import { Box, Button, Alert } from '@mui/material';
import { colors, spacing } from '../../styles/Variables';

// Wrapper para el fondo, asegúrate de reemplazar la ruta de la imagen correctamente
export const BackgroundWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: url('/path/to/your/background-image.jpg') no-repeat center center fixed; /* Reemplaza la ruta con la imagen correcta */
  background-size: cover;
  color: ${colors.dark};

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

// Contenedor izquierdo
export const LeftContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  margin-top: 150px;

  @media (min-width: 768px) {
    width: 65%;
    padding: 40px;
    margin-top: 0;
  }

  @media (max-width: 480px) {
    margin-top: 100px; /* Reducir el margen superior en móviles */
    padding: 10px; /* Reducir el padding en móviles */
  }
`;

// Contenedor estilizado
export const StyledContainer = styled(Box)`
  width: 100%;
  max-width: 500px;
  text-align: center;
  padding: 40px 20px;
  background-color: ${colors.light};
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (min-width: 768px) {
    padding: 90px;
    border-radius: 70px;
  }

  @media (max-width: 480px) {
    padding: 20px; /* Reducir padding en móviles */
    border-radius: 15px; /* Ajustar el radio en móviles */
  }
`;

// Contenedor derecho
export const RightContainer = styled(Box)`
  display: none;

  @media (min-width: 768px) {
    display: block;
    width: 35%;
    background-size: cover;
    background-position: center;
  }
`;

// Estilo para el botón de envío
export const SubmitButton = styled(Button)`
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

  @media (max-width: 480px) {
    padding: ${spacing.xsmall}; /* Ajustar padding en móviles */
    font-size: 0.875rem; /* Reducir el tamaño de la fuente en móviles */
  }
`;

// Estilo para la alerta de error
export const ErrorAlert = styled(Alert)`
  margin-top: ${spacing.small};

  @media (max-width: 480px) {
    font-size: 0.875rem; /* Reducir el tamaño de la fuente en móviles */
  }
`;

// Estilo para el enlace de registro
export const SignupLink = styled(Box)`
  margin-top: ${spacing.medium};
  text-align: center;
  font-size: 1rem; /* Ajustar el tamaño de la fuente para mejor visibilidad */

  a {
    text-decoration: underline;
    cursor: pointer;
    color: ${colors.dark}; /* Cambiado a un color que contrasta mejor con el fondo */

    &:hover {
      color: ${colors.secondary}; /* Cambia el color al pasar el ratón para mejor visibilidad */
    }
  }

  @media (max-width: 480px) {
    font-size: 1rem; /* Asegúrate de que el tamaño de la fuente sea suficientemente grande en móviles */
  }
`;
