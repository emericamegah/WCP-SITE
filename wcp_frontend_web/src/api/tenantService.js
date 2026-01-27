import tenantMockData from './tenantMockData.json';

const tenantService = {
    getTenantData: () => {
        return Promise.resolve({ data: tenantMockData });
    },
    getReceipts: () => {
        return Promise.resolve({ data: tenantMockData.receipts });
    },
    getMaintenanceTickets: () => {
        return Promise.resolve({ data: tenantMockData.maintenance });
    },
    submitMaintenanceTicket: (ticketData) => {
        console.log('API Call: Submitting maintenance ticket', ticketData);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: { success: true, id: 'tkt_' + Date.now() } });
            }, 1000);
        });
    }
};

export default tenantService;
