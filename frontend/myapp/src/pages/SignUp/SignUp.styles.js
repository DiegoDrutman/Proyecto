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
    background-color: rgba(0, 0, 0, 0.5);  // Fondo semitransparente negro
    color: ${colors.dark};

    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

export const LeftContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px;
    margin-top: 100px; /* Aumentar el margen superior para bajar el contenido */

    @media (min-width: 768px) {
        width: 65%;
        padding: 40px;
        margin-top: 50px; /* Ajustar el margen superior en pantallas grandes */
    }

    @media (max-width: 480px) {
        margin-top: 80px; /* Ajustar el margen superior en móviles */
        padding: 10px;
    }
`;

// Contenedor estilizado
export const StyledContainer = styled(Box)`
    width: 100%;
    max-width: 600px; /* Aumentar el ancho máximo */
    text-align: center;
    padding: 40px 30px; /* Ajustar padding */
    background-color: ${colors.light};
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    @media (min-width: 768px) {
        padding: 60px 40px; /* Reducir padding en pantallas grandes */
        border-radius: 50px;
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
        filter: brightness(50%);  // Reduce el brillo del fondo para destacar más el contenido
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
