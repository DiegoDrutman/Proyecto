import React from 'react';
import styled from 'styled-components';

// Estilos para el contenedor de la receta
const RecipeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #F5F5DC; /* Fondo beige claro */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Estilos para el título de la receta
const RecipeTitle = styled.h2`
  color: #8B4513; /* Marrón oscuro */
  text-align: center;
`;

// Estilos para la lista de ingredientes
const IngredientsList = styled.ul`
  list-style: none;
  padding: 0;
`;

// Estilos para cada ingrediente
const IngredientItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #FFFFFF;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Estilos para el botón de compra
const ShopButton = styled.button`
  background-color: #A0522D; /* Sienna */
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #8B4513; /* Cambiar a un marrón oscuro en hover */
  }
`;

// Componente principal de la receta
const RecipeDetail = ({ recipe }) => {
  // Parsear los ingredientes desde el string del backend
  const ingredients = recipe.ingredients ? JSON.parse(recipe.ingredients) : []; // Asegúrate de que los ingredientes estén en el formato correcto

  // Función para manejar el clic en el botón de compra
  const handleShopClick = () => {
    // Redirigir al usuario a la aplicación de PedidosYa o Rappi
    window.open(generateShoppingURL(ingredients), '_blank');
  };

  // Función para generar la URL de compra
  const generateShoppingURL = (ingredients) => {
    // Transformar la lista de ingredientes en una cadena de consulta para la URL
    const query = ingredients.map(ingredient => `${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`).join(', ');
    // Aquí necesitarías formatear la URL según el esquema de la API del proveedor
    return `https://www.pedidosya.com/cart?items=${encodeURIComponent(query)}`;
  };

  return (
    <RecipeContainer>
      <RecipeTitle>{recipe.title}</RecipeTitle> {/* Asegúrate de que coincida con el campo del modelo */}
      <IngredientsList>
        {ingredients.map((ingredient, index) => (
          <IngredientItem key={index}>
            {ingredient.quantity} {ingredient.unit} de {ingredient.name}
          </IngredientItem>
        ))}
      </IngredientsList>
      <ShopButton onClick={handleShopClick}>
        Comprar en PedidosYa
      </ShopButton>
    </RecipeContainer>
  );
};

export default RecipeDetail;
