import Axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { AUTH_API_URL, BACKEND_API_URL, SUBPLOT_URL } from '@/config';
import { logout } from '@/features/auth/api/auth';
import { Token } from '@/features/auth/types';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  config.headers.Accept = 'application/json';

  const token: string | null = localStorage.getItem('maltopuft-token');
  if (token === null) {
    return config;
  }

  const parsedToken = JSON.parse(token) as Token;
  if (parsedToken === null) {
    return config;
  }

  config.headers.authorization = `Bearer ${parsedToken.access_token}`;
  return config;
}

export const api = Axios.create({
  baseURL: BACKEND_API_URL
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  // If no error, just return the response
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Force logout if API returns unauthorised status code
    if (error?.response?.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

export default api;

export const authAPI = Axios.create({
  baseURL: AUTH_API_URL
});

export const subplotAPI = Axios.create({
  baseURL: SUBPLOT_URL
});
