import styled from 'styled-components';
import { colors, spacing, breakpoints } from '../../styles/Variables'; // Importar Variables.js con "V" mayúscula

// Contenedor principal del chat
export const ChatContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: ${spacing.medium};
  background-color: ${colors.warmBackground}; /* Fondo beige claro */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 100%;
    padding: ${spacing.small}; /* Reducir padding en pantallas más pequeñas */
  }
`;

// Encabezado del chat
export const ChatHeader = styled.h2`
  color: ${colors.primary}; /* Texto marrón oscuro */
  text-align: center;
  font-size: 1.5rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.25rem; /* Reducir tamaño de fuente en móviles */
  }
`;

// Lista de mensajes
export const MessageList = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 400px;
  overflow-y: auto; /* Permitir desplazamiento */
  margin-bottom: ${spacing.medium};

  @media (max-width: ${breakpoints.mobile}) {
    max-height: 300px; /* Ajustar altura máxima en móviles */
  }
`;

// Estilo para cada mensaje
export const MessageItem = styled.li`
  padding: ${spacing.small};
  margin-bottom: ${spacing.small};
  border-radius: 5px;
  background-color: ${(props) =>
    props.isUser ? colors.light : colors.background}; /* Fondo diferente para mensajes de usuario y bot */
  align-self: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  max-width: 80%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 100%; /* Ajustar para pantallas más pequeñas */
  }
`;

// Contenedor de entrada de texto
export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.small};

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: ${spacing.xsmall}; /* Reducir espacio entre los elementos en móviles */
  }
`;

// Campo de entrada de texto
export const InputField = styled.input`
  flex: 1;
  padding: ${spacing.small};
  border: 1px solid #DDD;
  border-radius: 5px;
  width: 100%;

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: ${spacing.small}; /* Agregar margen inferior en móviles */
  }
`;

// Botón de envío
export const SendButton = styled.button`
  background-color: ${colors.secondary}; /* Sienna */
  color: ${colors.light};
  border: none;
  border-radius: 5px;
  padding: ${spacing.small};
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;

  &:hover {
    background-color: ${colors.primary}; /* Más oscuro al pasar el ratón */
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: ${spacing.xsmall}; /* Reducir padding en móviles */
  }
`;
