import axios from 'axios';

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

export const registerUserApi = async user => {
  const { data } = await axios.post('auth/register', user);
  return data;
};

export const loginUserApi = async user => {
  const { data } = await axios.post('auth/login', user);
  return data;
};

export const logoutUserApi = async () => {
  const { data } = await axios.post('auth/logout');
  return data;
};
export const refreshUserApi = async sid => {
  const { data } = await axios.post('auth/refresh', sid);
  return data;
};

export const getUserInfoApi = async () => {
  const { data } = await axios.get('user');
  return data;
};

export const registerGoogleApi = async () => {
  const { data } = await axios.get('auth/google');
  return data;
};
