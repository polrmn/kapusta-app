import { createAsyncThunk } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';
import { clearAuthHeader, setAuthHeader } from '../../services/http/http';
import { getUserInfoApi, loginUserApi, logoutUserApi, registerUserApi } from '../../services/authService';

const notlifixOptions = {
  failure: {
    position: 'right-top',
    distance: '80px',
    backOverlay: true,
    clickToClose: true,
    closeButton: true,
    useIcon: true,
  },
  success: {
    position: 'right-top',
    distance: '80px',
    backOverlay: false,
    clickToClose: true,
    closeButton: true,
    useIcon: true,
  },
};


export const signUpThunk = createAsyncThunk(
  'auth/signUp',
  async (data, { rejectWithValue }) => {
    try {
      const res = await registerUserApi(data);
      Notiflix.Notify.success('signup is success', notlifixOptions.success);
      return res;
    } catch (error) {
      Notiflix.Notify.failure(`${error.message}`, notlifixOptions.failure);
      return rejectWithValue(error.message);
    }
  },
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await loginUserApi(data);
      setAuthHeader(res.accessToken);
      Notiflix.Notify.success('login is success', notlifixOptions.success);
      return res;
    } catch (error) {
      Notiflix.Notify.failure(`${error.message}`, notlifixOptions.failure);
      return rejectWithValue(error.message);
    }
  },
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (data, { rejectWithValue }) => {
    try {
      const res = await logoutUserApi();
      clearAuthHeader();
      Notiflix.Notify.success('logout is success', notlifixOptions.success);
      return res;
    } catch (error) {
      Notiflix.Notify.failure(`${error.message}`, notlifixOptions.failure);
      return rejectWithValue(error.message);
    }
  },
);

export const getUserThunk = createAsyncThunk(
  'auth/getUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.accessToken;
      if (!token) {
        return rejectWithValue('no token');
      }
      setAuthHeader(token)
      return await getUserInfoApi();
    } catch (error) {
      Notiflix.Notify.failure(`${error.message}`, notlifixOptions.failure);
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
      Notiflix.Notify.failure(`${error.message}`, notlifixOptions.failure);
      return rejectWithValue(error.message);
    }
  },
);
