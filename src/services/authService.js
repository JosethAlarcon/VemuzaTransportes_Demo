import axios from 'axios';

// ✅ Usa la URL del .env para React con Vite
const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const login = async (correo, contraseña) => {
    const response = await axios.post(`${API_URL}/login`, {
        correo,
        contraseña
    });
    return response.data;
};

export const registrar = async (usuario) => {
    const response = await axios.post(`${API_URL}/registro`, usuario);
    return response.data;
};
