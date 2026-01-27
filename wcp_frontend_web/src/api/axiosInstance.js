import axios from 'axios';

/**
 * Base Axios Instance
 * Features:
 * - JWT injection in Request Interceptors
 * - Global 401 handling in Response Interceptors
 */
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('wcp_jwt_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Global 401 Unauthorized handling
        if (error.response && error.response.status === 401) {
            console.warn('Unauthorized access detected. Redirecting to login...');
            localStorage.removeItem('wcp_jwt_token');
            // In a real app, you might trigger a redirect via window.location or a routing hook
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
