import api from './api';

const bookingService = {
    createBooking: async (bookingData) => {
        try {
            const response = await api.post('/bookings', bookingData);
            return response.data;
        } catch (error) {
            console.error('Error creating booking:', error);
            throw error.response?.data || error.message;
        }
    },

    getBooking: async (id) => {
        try {
            const response = await api.get(`/bookings/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching booking:', error);
            throw error.response?.data || error.message;
        }
    },

    getUserBookings: async () => {
        try {
            const response = await api.get('/bookings/my-bookings');
            return response.data;
        } catch (error) {
            console.error('Error fetching user bookings:', error);
            throw error.response?.data || error.message;
        }
    },

    updateBookingStatus: async (id, status) => {
        try {
            const response = await api.put(`/bookings/${id}/status?status=${status}`);
            return response.data;
        } catch (error) {
            console.error('Error updating booking status:', error);
            throw error.response?.data || error.message;
        }
    },

    cancelBooking: async (id) => {
        try {
            await api.delete(`/bookings/${id}`);
        } catch (error) {
            console.error('Error cancelling booking:', error);
            throw error.response?.data || error.message;
        }
    }
};

export default bookingService;