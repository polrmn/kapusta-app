import { createAsyncThunk } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';
import { clearAuthHeader, setAuthHeader } from '../../services/http/http';
import { getUserInfoApi, loginUserApi, logoutUserApi, registerUserApi } from '../../services/authService';

export const signUpThunk = createAsyncThunk(
  'auth/signUp',
  async (data, { rejectWithValue }) => {
    try {
      const res = await registerUserApi(data)
      Notiflix.Notify.success('signup is success');
      return res;
    } catch (error) {
      Notiflix.Notify.failure(`${error.message}`);
      return rejectWithValue(error.message);
    }
  },
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await loginUserApi(data)
      setAuthHeader(res.accessToken)
      Notiflix.Notify.success('login is success');
      return res;
    } catch (error) {
      Notiflix.Notify.failure(`${error.message}`);
      return rejectWithValue(error.message);
    }
  },
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (data, { rejectWithValue }) => {
    try {
      const res = await logoutUserApi()
      clearAuthHeader()
      Notiflix.Notify.success('logout is success');
      return res;
    } catch (error) {
      Notiflix.Notify.failure(`${error.message}`);
      return rejectWithValue(error.message);
    }
  },
);

export const getUserThunk = createAsyncThunk(
  'auth/getUser',
  async (data, { rejectWithValue }) => {
    try {
      return await getUserInfoApi();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);


export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (data, { rejectWithValue }) => {
    try {
      return null;
      // eslint-disable-next-line
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
