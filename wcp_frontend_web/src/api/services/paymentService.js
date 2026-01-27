import axiosInstance from '../axiosInstance';

/**
 * Payment Service
 * Handles integration with CinetPay, Stripe, and Open Banking.
 */
const paymentService = {
    /**
     * Initiate a payment via CinetPay (Common in Francophone Africa)
     */
    initiateCinetPay: async (paymentData) => {
        try {
            const response = await axiosInstance.post('/payments/cinetpay/init', paymentData);
            return response.data; // Usually contains a payment URL or token
        } catch (error) {
            console.error('CinetPay initiation failed:', error);
            throw error;
        }
    },

    /**
     * Initiate a payment via Stripe
     */
    initiateStripe: async (paymentData) => {
        try {
            const response = await axiosInstance.post('/payments/stripe/create-checkout', paymentData);
            return response.data; // Usually contains a stripe sessionId
        } catch (error) {
            console.error('Stripe initiation failed:', error);
            throw error;
        }
    },

    /**
     * Initiate an Open Banking transfer
     */
    initiateOpenBanking: async (paymentData) => {
        try {
            const response = await axiosInstance.post('/payments/open-banking/init', paymentData);
            return response.data;
        } catch (error) {
            console.error('Open Banking initiation failed:', error);
            throw error;
        }
    },

    /**
     * Get transaction history for the logged-in user
     */
    getTransactionHistory: async () => {
        try {
            const response = await axiosInstance.get('/payments/history');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch transaction history:', error);
            throw error;
        }
    }
};

export default paymentService;
