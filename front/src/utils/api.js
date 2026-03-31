import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`, // Dynamic from .env
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export default api;
