import axios from "axios";

export const instanse = axios.create({
  baseURL: 'https://kapusta-backend.goit.global/',
});

// Utility to add JWT
export const setAuthHeader = token => {
  apiServices.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
export const clearAuthHeader = () => {
  apiServices.defaults.headers.common.Authorization = '';
};