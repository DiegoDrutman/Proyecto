import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Añadir si necesitas manejar autenticación
});

export const getTasks = async () => {
    return await axiosInstance.get('tasks/');
};

export const createTask = async (task) => {
    return await axiosInstance.post('tasks/', task);
};

export const updateTask = async (task) => {
    return await axiosInstance.put(`tasks/${task.id}/`, task);
};

export const deleteTask = async (taskId) => {
    return await axiosInstance.delete(`tasks/${taskId}/`);
};
