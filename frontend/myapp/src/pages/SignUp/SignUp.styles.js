import styled from 'styled-components';
import { Box } from '@mui/material';
import { colors, spacing } from '../../styles/Variables'; // Asegúrate de importar "spacing" también para usarlo en los márgenes

// Wrapper para el fondo, que será transparente para mostrar la imagen de fondo general
export const BackgroundWrapper = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: none; // Fondo transparente
`;

// Contenedor de pantalla completa
export const FullScreenContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
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

// Estilo para el enlace de registro
export const SignupLink = styled(Box)`
  margin-top: ${spacing.medium};
  text-align: center;
  font-size: 1rem;

  a {
    text-decoration: underline;
    cursor: pointer;
    color: #000000; // Cambiar a un color negro para máximo contraste

    &:hover {
      color: ${colors.secondary}; // Cambiar a un color secundario cuando se pase el mouse por encima
    }
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;
