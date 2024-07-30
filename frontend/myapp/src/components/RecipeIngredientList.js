import React from 'react';
import '../styles/RecipeIngredientList.css'; // Asegúrate de crear este archivo para los estilos

const RecipeIngredientList = ({ ingredients }) => {
  if (!Array.isArray(ingredients)) {
    console.error("The 'ingredients' prop should be an array.");
    return null;
  }

  return (
    <ul className="recipe-ingredient-list">
      {ingredients.length > 0 ? (
        ingredients.map((ingredient, index) => (
          <li key={index} className="recipe-ingredient-list__item">
            {ingredient}
          </li>
        ))
      ) : (
        <li className="recipe-ingredient-list__item">No ingredients provided.</li>
      )}
    </ul>
  );
};

export default RecipeIngredientList;
