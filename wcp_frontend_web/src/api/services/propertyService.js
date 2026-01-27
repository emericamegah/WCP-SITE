import axiosInstance from '../axiosInstance';
import { ownerProperties } from '../ownerMockData';

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

const propertyService = {
    /**
     * Get all properties
     */
    getProperties: async () => {
        if (import.meta.env.VITE_USE_MOCKS === 'true') {
            return mockDelay(ownerProperties);
        }
        return axiosInstance.get('/properties');
    },

    /**
     * Get single property by ID
     */
    getPropertyById: async (id) => {
        if (import.meta.env.VITE_USE_MOCKS === 'true') {
            const property = ownerProperties.find(p => p.id === parseInt(id));
            return mockDelay(property);
        }
        return axiosInstance.get(`/properties/${id}`);
    },

    /**
     * Submit new property for evaluation (for owners)
     */
    addProperty: async (formData) => {
        if (import.meta.env.VITE_USE_MOCKS === 'true') {
            console.log('MOCK API: Adding property', formData);
            return mockDelay({ success: true, id: Date.now() });
        }
        // Handle FormData properly for uploads
        return axiosInstance.post('/properties', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
};

export default propertyService;
