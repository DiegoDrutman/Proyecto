import React from 'react';
import styled from 'styled-components';

const RecipeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #F5F5DC; /* Fondo beige claro */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const RecipeTitle = styled.h2`
  color: #8B4513; /* Marrón oscuro */
  text-align: center;
`;

const IngredientsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const IngredientItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #FFFFFF;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

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

    const RecipeDetail = ({ recipe }) => {
    const ingredients = recipe.ingredients ? JSON.parse(recipe.ingredients) : [];
    const handleShopClick = () => {
    window.open(generateShoppingURL(ingredients), '_blank');
  };

    const generateShoppingURL = (ingredients) => {
    const query = ingredients.map(ingredient => `${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`).join(', ');
    return `https://www.pedidosya.com/cart?items=${encodeURIComponent(query)}`;
  };

  return (
    <RecipeContainer>
      <RecipeTitle>{recipe.title}</RecipeTitle>
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
