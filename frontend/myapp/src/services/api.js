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

export const getBusinesses = async (searchTerm = '', location = '', postalCode = '') => {
  let url = 'businesses/';
  let query = [];

  if (searchTerm) query.push(`search=${encodeURIComponent(searchTerm)}`);
  if (location) query.push(`location=${encodeURIComponent(location)}`);
  if (postalCode) query.push(`postal_code=${encodeURIComponent(postalCode)}`);

  if (query.length) url += `?${query.join('&')}`;
  
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

export const getBusinessProducts = async (businessId) => {
  console.log('Fetching products for businessId:', businessId);  // Verifica el businessId
  return handleRequest(() =>
    axiosInstance.get(`/products/?business=${businessId}`)
  );
};

export const addProduct = async (businessId, productData) => {
  return handleRequest(() =>
    axiosInstance.post('/products/', {
      ...productData,
      business: businessId,  // Incluyendo el businessId aquí
    })
  );
};

export const updateProduct = async (productId, productData) => {
  return handleRequest(() =>
    axiosInstance.put(`/products/${productId}/`, productData)
  );
};

export const deleteProduct = async (productId) => {
  return handleRequest(() =>
    axiosInstance.delete(`/products/${productId}/`)
  );
};

// Aquí actualizamos la función `getProducts` para utilizar `axiosInstance`
export const getProducts = async (searchTerm = '') => {
  const url = searchTerm ? `products/?search=${encodeURIComponent(searchTerm)}` : 'products/';
  return handleRequest(() => axiosInstance.get(url));
};

export const getLocations = async (searchTerm = '') => {
  const url = searchTerm ? `locations/?search=${encodeURIComponent(searchTerm)}` : 'locations/';
  return handleRequest(() => axiosInstance.get(url));
};


export default axiosInstance;
