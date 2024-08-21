import styled from 'styled-components';
import { Container, Box, Card } from '@mui/material';
import { colors } from '../../styles/Variables';

// PerfilContainer ajustado para usar flex-direction: row
export const ProfileContainer = styled(Container)`
  display: flex;
  flex-direction: row; // Distribuye los elementos horizontalmente
  width: 100%;
  max-width: 1200px; // Ajusta el ancho máximo según sea necesario
  background-color: ${colors.background};
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 100px;
  gap: 50px; // Espacio entre los elementos
  align-items: flex-start; // Alinea los elementos al inicio del contenedor
`;

// PerfilHeader ajustado para ocupar un espacio específico
export const ProfileHeader = styled(Box)`
  flex: 1; // Ocupa el espacio necesario
  display: flex;
  flex-direction: column;
  align-items: flex-start; // Alinea al inicio del contenedor
  margin-right: 50px; // Margen derecho para separación

  h4 {
    font-size: 32px;
    font-weight: bold;
    color: ${colors.primary};
  }

  p {
    color: ${colors.secondary};
  }
`;

// ProfileDetails ajustado para ocupar el doble del espacio
export const ProfileDetails = styled(Box)`
  flex: 2; // Ocupa el doble del espacio en comparación con ProfileHeader
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledCard = styled(Card)`
  background-color: ${colors.cardBackground};
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px; // Espacio entre las tarjetas
`;

export const InfoRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: -1;
`;

export const LogoutButtonContainer = styled(Box)`
  display: flex;
  justify-content: flex-end; // Alinea el botón al final del contenedor
  margin-top: 30px;
`;

export const ProductListContainer = styled.div`
  padding: 20px;
  background-color: ${colors.background}; // Asegúrate de que el fondo tenga suficiente contraste
  color: ${colors.dark}; // Asegúrate de que el texto tenga suficiente contraste
`;

export const TextFieldStyled = styled.input`
  background-color: white; // Asegúrate de que el campo de texto sea visible
  border: 2px solid ${colors.secondary}; // Aumentar el grosor del borde para mejor visibilidad
  border-radius: 5px;
  padding: 10px;
  color: ${colors.dark}; // Texto en el campo de texto
  font-size: 16px; // Aumentar el tamaño de la fuente para mayor legibilidad
`;

export const ButtonStyled = styled.button`
  background-color: ${colors.primary};
  color: white; // Asegúrate de que el texto del botón sea blanco para buen contraste
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold; // Aumentar el grosor del texto
  cursor: pointer;
  font-size: 16px; // Aumentar el tamaño de la fuente

  &:hover {
    background-color: ${colors.dark}; // Cambio de color al pasar el mouse para mejor visibilidad
    color: white; // Asegúrate de que el texto siga siendo visible al pasar el mouse
  }

  &:disabled {
    background-color: ${colors.secondary}; // Cambia el color del botón cuando está deshabilitado
    color: rgba(255, 255, 255, 0.7); // Texto más claro cuando el botón está deshabilitado
  }
`;
