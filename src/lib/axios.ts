import Axios, { InternalAxiosRequestConfig } from 'axios';

import { AUTH_API_URL, BACKEND_API_URL } from '@/config';
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

export const authAPI = Axios.create({
  baseURL: AUTH_API_URL
});
