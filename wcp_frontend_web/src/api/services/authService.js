import axiosInstance from '../axiosInstance';

/**
 * Mock delay utility
 */
const mockDelay = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data });
        }, 500);
    });
};

const authService = {
    /**
     * Login user and store token
     */
    login: async (credentials) => {
        if (import.meta.env.VITE_USE_MOCKS === 'true') {
            console.log('MOCK API: Login attempt', credentials.email);
            const mockResult = {
                user: { id: 'u_001', name: 'User Test', role: 'tenant' },
                token: 'mock_jwt_token_wcp'
            };
            localStorage.setItem('wcp_jwt_token', mockResult.token);
            return mockDelay(mockResult);
        }

        const response = await axiosInstance.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('wcp_jwt_token', response.data.token);
        }
        return response;
    },

    /**
     * Logout user and clear storage
     */
    logout: () => {
        localStorage.removeItem('wcp_jwt_token');
        if (import.meta.env.VITE_USE_MOCKS === 'true') {
            return Promise.resolve({ success: true });
        }
        return axiosInstance.post('/auth/logout');
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated: () => {
        return !!localStorage.getItem('wcp_jwt_token');
    }
};

export default authService;
