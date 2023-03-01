import { privateAPI, publicAPI } from './http/http';

// export const instance = axios.create({
//   baseURL: 'https://kapusta-backend.goit.global/',
// });



export const registerUserApi = async user => {
  const { data } = await publicAPI.post('auth/register', user);
  return data;
};

export const loginUserApi = async user => {
  const { data } = await publicAPI.post('auth/login', user);
  return data;
};

export const logoutUserApi = async () => {
  const { data } = await privateAPI.post('auth/logout');
  return data;
};
export const refreshUserApi = async sid => {
  const { data } = await privateAPI.post('auth/refresh', sid);
  return data;
};

export const getUserInfoApi = async () => {
  const { data } = await privateAPI.get('user');
  return data;
};

export const registerGoogleApi = async () => {
  const { data } = await privateAPI.get('auth/google');
  return data;
};
