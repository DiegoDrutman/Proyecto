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
        } else if (error.request) {
            console.error('Request data:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        throw error;
    }
};

export const getProjects = async () => handleRequest(() => axiosInstance.get('projects/'));
export const createProject = async (project) => {
    console.log('Sending project data:', project); // Verifica los datos enviados
    return handleRequest(() => axiosInstance.post('projects/', project));
};
export const updateProject = async (project) => handleRequest(() => axiosInstance.put(`projects/${project.id}/`, project));
export const deleteProject = async (projectId) => handleRequest(() => axiosInstance.delete(`projects/${projectId}/`));

// Task API
export const getTasks = async () => handleRequest(() => axiosInstance.get('tasks/'));
export const createTask = async (task) => handleRequest(() => axiosInstance.post('tasks/', task));
export const updateTask = async (task) => handleRequest(() => axiosInstance.put(`tasks/${task.id}/`, task));
export const deleteTask = async (taskId) => handleRequest(() => axiosInstance.delete(`tasks/${taskId}/`));

// Collaboration API
export const getCollaborations = async () => handleRequest(() => axiosInstance.get('collaborations/'));
export const createCollaboration = async (collaboration) => handleRequest(() => axiosInstance.post('collaborations/', collaboration));
export const deleteCollaboration = async (collaborationId) => handleRequest(() => axiosInstance.delete(`collaborations/${collaborationId}/`));
export const updateCollaboration = async (collaboration) => handleRequest(() => axiosInstance.put(`collaborations/${collaboration.id}/`, collaboration));
