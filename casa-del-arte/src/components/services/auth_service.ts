import axios from 'axios';

// Añade el protocolo http://
const API_URL = 'http://127.0.0.1:8000'; // o 'http://localhost:8000'

export interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    dinero: number;
  };
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/api/token/`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    console.error("Error en la petición:", error);
    throw error;
  }
};

interface RegisterData {
  username: string;
  password: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

export const register = async (userData: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}/api/registro/`, userData);

    console.log(`Registro enviado a: ${API_URL}/api/registro/`);
    console.log("Datos del usuario:", userData);

    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error);
    throw error;
  }
};

