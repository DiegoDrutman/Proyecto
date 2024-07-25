import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Añadir un interceptor para incluir el token en cada solicitud
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token'); // Asegúrate de almacenar el token en localStorage al iniciar sesión
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

const handleRequest = async (request) => {
    try {
        const response = await request();
        return response.data;
    } catch (error) {
        console.error('API request error:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
            throw new Error(error.response.data.message || 'API request failed');
        } else if (error.request) {
            console.error('Request data:', error.request);
            throw new Error('No response received from server');
        } else {
            console.error('Error message:', error.message);
            throw new Error('Request setup error');
        }
    }
};

export const authenticateUser = async (credentials) => {
    const response = await handleRequest(() => axiosInstance.post('token/', {
        username: credentials.email,
        password: credentials.password
    }));
    localStorage.setItem('token', response.access); // Almacena el token en localStorage
    return response;
};

export const getProjects = async () => handleRequest(() => axiosInstance.get('projects/'));
export const createProject = async (project) => handleRequest(() => axiosInstance.post('projects/', project));
export const updateProject = async (project) => handleRequest(() => axiosInstance.put(`projects/${project.id}/`, project));
export const deleteProject = async (projectId) => handleRequest(() => axiosInstance.delete(`projects/${projectId}/`));
export const createUser = async (user) => handleRequest(() => axiosInstance.post('register/', user));
export const getUsers = async () => handleRequest(() => axiosInstance.get('users/'));
