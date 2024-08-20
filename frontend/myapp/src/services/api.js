import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8000/api/';

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const csrftoken = Cookies.get('csrftoken');
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        if (csrftoken) {
            config.headers['X-CSRFToken'] = csrftoken;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

const handleRequest = async (request) => {
    try {
        const response = await request();
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

export const createBusiness = async (businessData) => {
    return handleRequest(() => axiosInstance.post('businesses/', businessData));
};

export const authenticateBusiness = async (credentials) => {
    return handleRequest(() =>
        axiosInstance.post('api-token-auth/', {
            username: credentials.username,
            password: credentials.password,
        })
    );
};

export const getBusinessProfile = async () => handleRequest(() => axiosInstance.get('businesses/me/'));

export const updateBusinessProfile = async (profileData) => {
    return handleRequest(() => axiosInstance.put('businesses/me/', profileData));
};

export const getBusinesses = async (searchTerm = '') => {
    const url = searchTerm ? `businesses/?search=${encodeURIComponent(searchTerm)}` : 'businesses/';
    return handleRequest(() => axiosInstance.get(url));
};

export const getBusinessById = async (id) => {
    return handleRequest(() => axiosInstance.get(`businesses/${id}/`));
};

export const getPendingBusinesses = async () => {
    return handleRequest(() => axiosInstance.get('businesses/?approved=false'));
};

export const approveBusiness = async (id) => {
    return handleRequest(() => axiosInstance.post(`businesses/${id}/approve/`));
};

export default axiosInstance;
