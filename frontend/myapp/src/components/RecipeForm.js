import React, { useState } from 'react';
import '../styles/RecipeForm.css'; // Asegúrate de crear este archivo para los estilos

const RecipeForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState({}); // Para manejar los errores

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required';
    if (!description) newErrors.description = 'Description is required';
    if (!ingredients) newErrors.ingredients = 'Ingredients are required';
    if (!image) newErrors.image = 'Image URL is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onSubmit({
        title,
        description,
        ingredients: ingredients.split(',').map(item => item.trim()), // Limpieza de espacios
        image
      });
      setTitle('');
      setDescription('');
      setIngredients('');
      setImage('');
      setErrors({});
    }
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`recipe-form__input ${errors.title ? 'error' : ''}`}
      />
      {errors.title && <p className="error-message">{errors.title}</p>}
      
      <textarea
        placeholder="Recipe Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={`recipe-form__textarea ${errors.description ? 'error' : ''}`}
      />
      {errors.description && <p className="error-message">{errors.description}</p>}
      
      <input
        type="text"
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className={`recipe-form__input ${errors.ingredients ? 'error' : ''}`}
      />
      {errors.ingredients && <p className="error-message">{errors.ingredients}</p>}
      
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className={`recipe-form__input ${errors.image ? 'error' : ''}`}
      />
      {errors.image && <p className="error-message">{errors.image}</p>}
      
      <button type="submit" className="recipe-form__button">Submit Recipe</button>
    </form>
  );
};

export default RecipeForm;
