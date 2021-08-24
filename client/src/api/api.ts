import axios, { AxiosResponse } from 'axios';

const BASE_URL = "http://localhost:2048/api/";

export const instance = axios.create({
  baseURL: BASE_URL,
});

const responseBody = (response: AxiosResponse) => response.data;

export const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
  postFile: (url: string, body: {}) => instance.post(url, body, { headers: { 'Content-Type': 'multipart/form-data' } }).then(responseBody),
  put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};
