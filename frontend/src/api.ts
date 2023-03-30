import axios from 'axios'

export const axiosClient = axios.create({
    baseURL: process.env.BACKEND_URL || 'http://localhost:3001/'
})

axiosClient.interceptors.response.use(
    response => response,
    error => {
      return Promise.reject(error);
    }
);