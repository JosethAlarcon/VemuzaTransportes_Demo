import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/reservas`;

export const crearReserva = async (reserva) => {
    try {
        const response = await axios.post(API_URL, reserva);
        return response.data;
    } catch (error) {
        console.error('❌ Error al crear la reserva:', error.response?.data || error.message);
        throw error;
    }
};

export const obtenerReservasPorUsuario = async (usuarioId) => {
    const response = await axios.get(`${API_URL}/usuario/${usuarioId}`);
    return response.data;
};

export const obtenerTodasLasReservas = async () => {
    const response = await axios.get(`${API_URL}/todas`);
    return response.data;
};

export const confirmarReserva = async (id) => {
    const response = await axios.put(`${API_URL}/confirmar/${id}`);
    return response.data;
};
