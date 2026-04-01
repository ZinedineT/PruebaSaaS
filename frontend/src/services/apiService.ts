// D:\proyecto_prueba\frontend\src\services\apiService.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Definir tipos para las respuestas
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status?: number;
}

// Configuración de la instancia de axios
const apiService: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8081/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar respuestas exitosas
apiService.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiService;