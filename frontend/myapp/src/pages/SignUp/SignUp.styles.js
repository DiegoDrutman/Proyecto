// src/pages/SignUp/SignUp.styles.js
import styled from 'styled-components';
import { Box } from '@mui/material';
import { colors } from '../../styles/Variables'; // Importa las variables de estilo

// Contenedor de pantalla completa
export const FullScreenContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: ${colors.warmBackground};
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
