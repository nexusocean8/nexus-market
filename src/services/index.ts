import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

const setupInterceptors = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const token = localStorage.getItem('nexus.token');
      const signature = localStorage.getItem('nexus.signature');

      if (token && signature) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('nexus.token');
        localStorage.removeItem('nexus.signature');
        api.defaults.headers.Authorization = '';
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

const API_URL = import.meta.env.VITE_API_URL as string;

export const api = setupInterceptors(
  axios.create({
    baseURL: API_URL,
    timeout: 10_000,
  })
);
