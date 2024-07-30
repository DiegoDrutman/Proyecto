import React from 'react';
import '../styles/RecipeShoppingCart.css'; // Asegúrate de que este archivo exista y esté correctamente definido

/**
 * Componente que muestra los elementos en el carrito de compras de recetas.
 * Permite eliminar elementos del carrito.
 * 
 * @param {Array} cartItems - Lista de artículos en el carrito.
 * @param {Function} onRemove - Función que se llama cuando se elimina un artículo del carrito.
 * @returns {JSX.Element} - Componente de carrito de compras.
 */
const RecipeShoppingCart = ({ cartItems, onRemove }) => {
  return (
    <div className="recipe-shopping-cart">
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index} className="recipe-shopping-cart__item">
            {item}
            <button onClick={() => onRemove(item)} className="recipe-shopping-cart__remove-button">
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeShoppingCart;
