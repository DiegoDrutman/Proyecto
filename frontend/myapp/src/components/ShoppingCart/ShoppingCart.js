// src/components/RecipeShoppingCart/RecipeShoppingCart.js
import React from 'react';
import {
  ShoppingCartContainer,
  ShoppingCartTitle,
  ShoppingCartList,
  ShoppingCartItem,
  RemoveButton,
} from './RecipeShoppingCart.styles'; // Importar los estilos desde el archivo de estilos

const RecipeShoppingCart = ({ cartItems, onRemove }) => {
  return (
    <ShoppingCartContainer>
      <ShoppingCartTitle>Tu Carrito de Compras</ShoppingCartTitle>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <ShoppingCartList>
          {cartItems.map((item, index) => (
            <ShoppingCartItem key={index}>
              <div>
                <strong>{item.name}</strong>
                <div>Cantidad: {item.quantity}</div>
                <div>Precio: ${item.price}</div>
              </div>
              <RemoveButton onClick={() => onRemove(item.id)}>Eliminar</RemoveButton>
            </ShoppingCartItem>
          ))}
        </ShoppingCartList>
      )}
    </ShoppingCartContainer>
  );
};

export default RecipeShoppingCart;
