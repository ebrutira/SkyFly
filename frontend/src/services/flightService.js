import api from './api';

const flightService = {
    getAllFlights: async () => {
        try {
            const response = await api.get('/flights');
            return response.data;
        } catch (error) {
            console.error('Error fetching flights:', error);
            throw error.response?.data || error.message;
        }
    },

    getFlightById: async (id) => {
        try {
            const response = await api.get(`/flights/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching flight ${id}:`, error);
            throw error.response?.data || error.message;
        }
    },

    searchFlights: async (searchParams) => {
        try {
            const response = await api.get('/flights/search', { params: searchParams });
            return response.data;
        } catch (error) {
            console.error('Error searching flights:', error);
            throw error.response?.data || error.message;
        }
    },

    bookFlight: async (flightId, bookingData) => {
        try {
            const response = await api.post(`/flights/${flightId}/book`, bookingData);
            return response.data;
        } catch (error) {
            console.error('Error booking flight:', error);
            throw error.response?.data || error.message;
        }
    }
};

export default flightService;