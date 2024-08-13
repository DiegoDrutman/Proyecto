import styled from 'styled-components';
import { Box, Typography } from '@mui/material';
import { colors, spacing } from '../../styles/Variables';

// Wrapper para los detalles del negocio
export const BusinessWrapper = styled(Box)`
  display: flex;
  justify-content: flex-start; /* Alinea los detalles y dirección a la izquierda */
  align-items: flex-start;
  max-width: 1200px;
  margin: 40px auto;
  padding: ${spacing.medium};
  flex-wrap: wrap; /* Permitir que los elementos se ajusten en múltiples líneas si es necesario */

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 20px auto;
  }
`;

// Contenedor para los detalles y la dirección juntos
export const InfoContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: ${spacing.large};

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: ${spacing.large};
  }
`;

// Contenedor para los detalles del negocio
export const DetailsContainer = styled(Box)`
  background-color: ${colors.light};
  padding: ${spacing.medium};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: ${spacing.large};
`;

// Contenedor para la dirección del negocio
export const AddressContainer = styled(Box)`
  background-color: ${colors.light};
  padding: ${spacing.medium};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

// Sección superior del negocio
export const HeaderContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.primary};
  padding: ${spacing.large};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  max-width: 1200px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Contenedor para el texto en la sección superior
export const TextContainer = styled(Box)`
  flex: 1;
  color: ${colors.light};
  margin-right: ${spacing.large};

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: ${spacing.large};
    text-align: center;
  }
`;

// Imagen del negocio en la sección superior
export const BusinessImage = styled(Box)`
  width: 100%;
  max-width: 400px;
  border-radius: 8px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

// Título del negocio en la sección superior
export const BusinessTitle = styled(Typography)`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${colors.light};
  margin-bottom: ${spacing.medium};

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

// Título de las secciones
export const SectionTitle = styled(Typography)`
  margin-bottom: ${spacing.medium};
  font-weight: bold;
  color: ${colors.primary};
`;

// Lista de productos
export const ProductList = styled(Box)`
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: ${spacing.large} 0;
  background-color: ${colors.light};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-left: ${spacing.large}; /* Mueve los productos a la derecha de los detalles */
`;

// Elemento de producto individual
export const ProductItem = styled(Box)`
  width: 300px;
  margin: ${spacing.medium};
  text-align: center;

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  h6 {
    margin-top: ${spacing.medium};
    color: ${colors.primary};
  }
`;
