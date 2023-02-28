import axios from "axios";

export const instance = axios.create({
  baseURL: 'https://kapusta-backend.goit.global/',
});

// Utility to add JWT
export const setAuthHeader = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
export const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = '';
};
