// src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token'); // Obtiene el token de localStorage
        if (token) {
            config.headers.Authorization = `Token ${token}`; // Usa el prefijo 'Token' para los tokens de DRF
        }
        return config;
    },
    error => Promise.reject(error)
);

const handleRequest = async (request) => {
    try {
        const response = await request();
        console.log('API response:', response.data); // Log para verificar la respuesta de la API
        return response.data;
    } catch (error) {
        console.error('API request error:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
            throw new Error(error.response.data.detail || 'API request failed');
        } else if (error.request) {
            console.error('Request data:', error.request);
            throw new Error('No response received from server');
        } else {
            console.error('Error message:', error.message);
            throw new Error('Request setup error');
        }
    }
};

// Autenticación de usuario
export const authenticateUser = async (credentials) => {
    const response = await handleRequest(() => axiosInstance.post('api-token-auth/', {
        username: credentials.username, // Asegúrate de usar 'username' en lugar de 'email'
        password: credentials.password
    }));
    localStorage.setItem('token', response.token); // Almacena el token en localStorage
    return response;
};

// Registro de usuario
export const createUser = async (user) => {
    const response = await handleRequest(() => axiosInstance.post('profiles/', user)); // Endpoint para crear perfil
    return response;
};

// Obtener recetas
export const getRecipes = async () => handleRequest(() => axiosInstance.get('recipes/'));

// Obtener recetas favoritas
export const getFavoriteRecipes = async () => handleRequest(() => axiosInstance.get('recipes/?is_favorited=true'));

// Subir receta
export const uploadRecipe = async (recipe) => handleRequest(() => axiosInstance.post('recipes/', recipe));

// Actualizar receta
export const updateRecipe = async (recipe) => handleRequest(() => axiosInstance.put(`recipes/${recipe.id}/`, recipe));

// Borrar receta
export const deleteRecipe = async (recipeId) => handleRequest(() => axiosInstance.delete(`recipes/${recipeId}/`));

// Obtener perfil de usuario
export const getUserProfile = async () => handleRequest(() => axiosInstance.get('profiles/me/'));

// Actualizar perfil de usuario
export const updateUserProfile = async (userId, profileData) => handleRequest(() => axiosInstance.put(`profiles/${userId}/`, profileData));

// Añadir comentario a receta
export const addComment = async (recipeId, comment) => handleRequest(() => axiosInstance.post(`comments/`, { recipe: recipeId, ...comment }));

// Obtener comentarios de una receta
export const getComments = async (recipeId) => handleRequest(() => axiosInstance.get(`comments/?recipe=${recipeId}`));

// Añadir calificación a receta
export const addRating = async (recipeId, rating) => handleRequest(() => axiosInstance.post(`ratings/`, { recipe: recipeId, rating }));

// Marcar receta como favorita
export const toggleFavorite = async (recipeId) => handleRequest(() => axiosInstance.post(`recipes/${recipeId}/favorite/`));
