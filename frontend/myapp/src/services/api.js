import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Obtiene el CSRF token de las cookies
export const getCsrfToken = () => {
  const csrfToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
  return csrfToken ? csrfToken.split('=')[1] : null;
};

// Interceptor para incluir el CSRF token en las solicitudes si está presente
axiosInstance.interceptors.request.use(
  (config) => {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
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
    console.error('Error en la solicitud de la API:', error);
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Token inválido, eliminando...');
        localStorage.removeItem('token');  // Eliminar el token si es inválido
        window.location.href = '/login';   // Redirigir al login
      }
      throw new Error(error.response.data.detail || 'Error en la solicitud de la API');
    } else if (error.request) {
      throw new Error('No se recibió respuesta del servidor');
    } else {
      throw new Error('Error en la configuración de la solicitud');
    }
  }
};

// Métodos de la API

export const createBusiness = async (businessData) => {
  const csrfToken = getCsrfToken();
  return handleRequest(() => 
    axiosInstance.post('businesses/', businessData, {
      headers: {
        'X-CSRFToken': csrfToken,
        'Content-Type': 'multipart/form-data',
      }
    })
  );
};

export const authenticateBusiness = async (credentials) => {
  try {
    const response = await axiosInstance.post('api-token-auth/', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBusinessProfile = async () => {
  return handleRequest(() => axiosInstance.get('businesses/me/'));
};

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
  return handleRequest(() =>
    axiosInstance.get(`/products/?business=${businessId}`)
  );
};

export const addProduct = async (businessId, productData) => {
  return handleRequest(() =>
    axiosInstance.post('/products/', {
      ...productData,
      business: businessId,
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

export const getProducts = async (searchTerm = '') => {
  const url = searchTerm ? `products/?search=${encodeURIComponent(searchTerm)}` : 'products/';
  return handleRequest(() => axiosInstance.get(url));
};

export const getLocations = async () => {
  return handleRequest(() => axiosInstance.get('locations/'));
};

// Exporta axiosInstance como una exportación nombrada
export { axiosInstance };
