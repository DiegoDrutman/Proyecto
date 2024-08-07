// src/components/RecipeShoppingCart/RecipeShoppingCart.styles.js
import styled from 'styled-components';
import { colors, spacing, breakpoints } from '../../styles/Variables'; // Asegúrate de usar "V" mayúscula para Variables.js

// Contenedor principal del carrito de compras
export const ShoppingCartContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${spacing.medium};
  background-color: ${colors.warmBackground}; /* Fondo beige cálido */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: ${breakpoints.mobile}) {
    padding: ${spacing.small};
  }
`;

// Título del carrito de compras
export const ShoppingCartTitle = styled.h2`
  color: ${colors.primary}; /* Marrón oscuro */
  text-align: center;
  margin-bottom: ${spacing.medium};
`;

// Lista de elementos en el carrito de compras
export const ShoppingCartList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// Estilo para cada elemento del carrito de compras
export const ShoppingCartItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.small};
  margin-bottom: ${spacing.small};
  background-color: ${colors.light}; /* Fondo amarillo claro */
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Botón para eliminar un elemento del carrito
export const RemoveButton = styled.button`
  background-color: ${colors.secondary}; /* Marrón rojizo */
  color: ${colors.light};
  border: none;
  border-radius: 5px;
  padding: ${spacing.small} ${spacing.medium};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.primary}; /* Cambiar a un marrón oscuro en hover */
  }
`;
