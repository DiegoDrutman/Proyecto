import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

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

export const authenticateUser = async (credentials) => handleRequest(() => axiosInstance.post('auth/login/', credentials));

export const getProjects = async () => handleRequest(() => axiosInstance.get('projects/'));
export const createProject = async (project) => handleRequest(() => axiosInstance.post('projects/', project));
export const updateProject = async (project) => handleRequest(() => axiosInstance.put(`projects/${project.id}/`, project));
export const deleteProject = async (projectId) => handleRequest(() => axiosInstance.delete(`projects/${projectId}/`));
export const createUser = async (user) => handleRequest(() => axiosInstance.post('users/', user));
export const getUsers = async () => handleRequest(() => axiosInstance.get('users/'));
export const updateUserProfile = async (profile) => handleRequest(() => axiosInstance.put('users/profile/', profile));
export const changeUserPassword = async (passwords) => handleRequest(() => axiosInstance.post('users/change-password/', passwords));
