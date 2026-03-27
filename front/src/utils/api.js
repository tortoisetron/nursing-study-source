import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Laravel standard port
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export default api;
