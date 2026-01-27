import MockAdapter from 'axios-mock-adapter';
import client from './client';
import { mockProperties, mockServices } from './mockData';

const setupMockAdapter = () => {
    const mock = new MockAdapter(client, { delayResponse: 500 }); // Simulate network delay

    // --- Properties ---

    // Get All Properties (with mocked filtering)
    mock.onGet('/properties').reply((config) => {
        // Simple client-side mock filtering could be simulated here if params exist
        // For now, return all
        return [200, mockProperties];
    });

    // Get Property by ID
    mock.onGet(new RegExp('/properties/\\d+')).reply((config) => {
        const id = parseInt(config.url.split('/').pop(), 10);
        const property = mockProperties.find(p => p.id === id);

        if (property) {
            return [200, property];
        } else {
            return [404, { message: 'Property not found' }];
        }
    });

    // --- Services ---
    mock.onGet('/services').reply(200, mockServices);

    console.log('Mock Adapter initialized');
    return mock;
};

export default setupMockAdapter;
