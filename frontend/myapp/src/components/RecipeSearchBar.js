import React, { useState } from 'react';
import { Box, TextField, MenuItem, Button } from '@mui/material';

/**
 * Componente para la barra de búsqueda de recetas.
 * Permite filtrar recetas por categoría y dificultad.
 * 
 * @param {Function} onFilterChange - Función que se llama cuando se cambian los filtros.
 * @returns {JSX.Element} - Componente de la barra de búsqueda de recetas.
 */
const RecipeSearchBar = ({ onFilterChange }) => {
  const [category, setCategory] = useState('all');
  const [difficulty, setDifficulty] = useState('all');

  const categories = ['all', 'appetizer', 'main course', 'dessert'];
  const difficulties = ['all', 'easy', 'medium', 'hard'];

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setCategory(newCategory);
    onFilterChange({ category: newCategory, difficulty });
  };

  const handleDifficultyChange = (event) => {
    const newDifficulty = event.target.value;
    setDifficulty(newDifficulty);
    onFilterChange({ category, difficulty: newDifficulty });
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
      <TextField
        select
        label="Category"
        value={category}
        onChange={handleCategoryChange}
        sx={{ minWidth: 150 }}
      >
        {categories.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Difficulty"
        value={difficulty}
        onChange={handleDifficultyChange}
        sx={{ minWidth: 150 }}
      >
        {difficulties.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => onFilterChange({ category, difficulty })}
      >
        Filter
      </Button>
    </Box>
  );
};

export default RecipeSearchBar;
