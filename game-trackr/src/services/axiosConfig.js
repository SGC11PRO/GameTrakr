// src/axiosConfig.js
import axios from 'axios';

// Cambia la URL base a la de tu API
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Ejemplo para un servidor local
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
