import axios from 'axios';
// 1. Configuración base de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://tu-api-backend.com/api', // Usa variables de entorno
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// 2. Interceptor para añadir el token de autenticación a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Interceptor para manejar respuestas y errores globales
api.interceptors.response.use(
  (response) => {
    // Puedes modificar la respuesta antes de que llegue a tu código
    return response;
  },
  (error) => {
    // Manejo centralizado de errores
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Token inválido o expirado
          if (window.location.pathname !== '/login') {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
          break;
          
        case 403:
          // No tienes permisos
          console.error('Acceso denegado');
          break;
          
        case 404:
          // Recurso no encontrado
          console.error('Recurso no encontrado');
          break;
          
        case 500:
          // Error del servidor
          console.error('Error interno del servidor');
          break;
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;