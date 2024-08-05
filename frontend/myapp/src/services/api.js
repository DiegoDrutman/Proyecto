import axios from 'axios';

// Base URL para la API
const API_URL = 'http://localhost:8000/api/';

// Crear una instancia de axios con configuraciones predeterminadas
const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para añadir el token de autenticación a cada solicitud
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Manejo de solicitudes para capturar errores y devolver datos
const handleRequest = async (request) => {
    try {
        const response = await request();
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('API request error:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            throw new Error(error.response.data.detail || 'API request failed');
        } else if (error.request) {
            throw new Error('No response received from server');
        } else {
            throw new Error('Request setup error');
        }
    }
};

// Función para crear un usuario
export const createUser = async (userData) => {
    return handleRequest(() => axiosInstance.post('profiles/create_user_profile/', userData));
};

// Función para autenticar al usuario
export const authenticateUser = async (credentials) => {
    const response = await handleRequest(() =>
        axiosInstance.post('api-token-auth/', {
            username: credentials.username,
            password: credentials.password,
        })
    );
    localStorage.setItem('token', response.token);
    return response;
};

// Función para obtener el perfil del usuario autenticado
export const getUserProfile = async () => handleRequest(() => axiosInstance.get('profiles/me/'));

// Función para actualizar el perfil del usuario
export const updateUserProfile = async (userId, profileData) => handleRequest(() => axiosInstance.put(`profiles/${userId}/`, profileData));

// Función para obtener recetas, permite la búsqueda por término
export const getRecipes = async (searchTerm = '') => {
    // Construir el endpoint con el término de búsqueda si se proporciona
    const url = searchTerm ? `recipes/?search=${encodeURIComponent(searchTerm)}` : 'recipes/';
    
    // Llamar al backend con el término de búsqueda como query parameter
    return handleRequest(() => axiosInstance.get(url));
};

export const getRecipeById = async (id) => {
    return handleRequest(() => axiosInstance.get(`recipes/${id}/`));
  };
