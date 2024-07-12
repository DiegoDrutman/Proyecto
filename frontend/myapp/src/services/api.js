import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const getProjects = async () => {
    return await axiosInstance.get('projects/');
};

export const createProject = async (project) => {
    console.log('Sending project data:', project); // Verifica los datos enviados
    return await axiosInstance.post('projects/', project);
};

export const updateProject = async (project) => {
    return await axiosInstance.put(`projects/${project.id}/`, project);
};

export const deleteProject = async (projectId) => {
    return await axiosInstance.delete(`projects/${projectId}/`);
};

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

export const getCollaborations = async () => {
    return await axiosInstance.get('collaborations/');
};

export const createCollaboration = async (collaboration) => {
    return await axiosInstance.post('collaborations/', collaboration);
};

export const updateCollaboration = async (collaboration) => {
    return await axiosInstance.put(`collaborations/${collaboration.id}/`, collaboration);
};

export const deleteCollaboration = async (collaborationId) => {
    return await axiosInstance.delete(`collaborations/${collaborationId}/`);
};
