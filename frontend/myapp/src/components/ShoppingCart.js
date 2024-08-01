import React from 'react';
import styled from 'styled-components';

// Estilos personalizados usando styled-components
const ShoppingCartContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #F5F5DC; // Fondo beige claro
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const ShoppingCartTitle = styled.h2`
  color: #8B4513; // Marrón oscuro
  text-align: center;
`;

const ShoppingCartList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ShoppingCartItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #FFFFFF; // Fondo blanco para cada elemento
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const RemoveButton = styled.button`
  background-color: #A0522D; // Sienna
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #8B4513; // Cambiar a un marrón oscuro en hover
  }
`;

// Componente RecipeShoppingCart
const RecipeShoppingCart = ({ cartItems, onRemove }) => {
  return (
    <ShoppingCartContainer>
      <ShoppingCartTitle>Your Shopping Cart</ShoppingCartTitle>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ShoppingCartList>
          {cartItems.map((item, index) => (
            <ShoppingCartItem key={index}>
              <span>{item}</span>
              <RemoveButton onClick={() => onRemove(item)}>Remove</RemoveButton>
            </ShoppingCartItem>
          ))}
        </ShoppingCartList>
      )}
    </ShoppingCartContainer>
  );
};

export default RecipeShoppingCart;
