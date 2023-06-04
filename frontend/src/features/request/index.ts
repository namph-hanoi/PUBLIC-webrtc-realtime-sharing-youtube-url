import axios, { AxiosHeaders, Method as AxiosMethod } from 'axios';
import { string } from 'yup';

const mainRequestConfig = {
  baseURL: `${window.location.origin}/api`,
  headers: { 'Content-Type': 'application/json' },
};

const mainAxiosInstance = axios.create(mainRequestConfig);

mainAxiosInstance.interceptors.request.use(
  config => {
    // Todo: store token in a constant
    const token = localStorage.getItem('ACCESS_TOKEN_KEY');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

mainAxiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

const mainRequest = (
  url: string,
  method: AxiosMethod,
  payload?: any,
  headers?: AxiosHeaders,
) => {
  const data = payload;
  let params;
  if (method === 'get') {
    params = payload;
  }
  return mainAxiosInstance({ url, data, params, method, headers });
};

export default mainRequest;