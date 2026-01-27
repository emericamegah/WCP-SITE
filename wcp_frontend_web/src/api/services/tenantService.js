import axiosInstance from '../axiosInstance';
import tenantMockData from '../tenantMockData.json';

/**
 * Helper to simulate network latency
 */
const mockDelay = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data });
        }, 500);
    });
};

const tenantService = {
    /**
     * Fetch full tenant data
     */
    getTenantData: async () => {
        if (import.meta.env.VITE_USE_MOCKS === 'true') {
            return mockDelay(tenantMockData);
        }
        return axiosInstance.get('/tenant/profile');
    },

    /**
     * Fetch rent receipts
     */
    getReceipts: async () => {
        if (import.meta.env.VITE_USE_MOCKS === 'true') {
            return mockDelay(tenantMockData.receipts);
        }
        return axiosInstance.get('/tenant/receipts');
    },

    /**
     * Post technical maintenance ticket
     */
    postMaintenanceTicket: async (ticketData) => {
        if (import.meta.env.VITE_USE_MOCKS === 'true') {
            console.log('MOCK API: Posting ticket', ticketData);
            return mockDelay({ success: true, id: `tkt_${Date.now()}` });
        }
        return axiosInstance.post('/tenant/maintenance/tickets', ticketData);
    }
};

export default tenantService;
