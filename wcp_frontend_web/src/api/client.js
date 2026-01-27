import axios from 'axios';

const client = axios.create({
    baseURL: '/api', // Mocked base URL
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for generic error handling
client.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response ? error.response.data : error.message);
        return Promise.reject(error);
    }
);

export default client;
