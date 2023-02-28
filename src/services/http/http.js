import axios from 'axios';

export const privateAPI = axios.create({
  baseURL: 'https://kapusta-backend.goit.global/',
});

export const publicAPI = axios.create({
  baseURL: 'https://kapusta-backend.goit.global/',
});
