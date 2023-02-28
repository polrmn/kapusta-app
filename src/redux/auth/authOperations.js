import { createAsyncThunk } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';

const mockLoginRes = {
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmMyMDg1YmQwOTM2NTI4MTA3Y2UyNzQiLCJzaWQiOiI1ZmMyZDJmY2UxZDIwNTA2NzAyYmRkMjIiLCJpYXQiOjE2MDY2MDM1MTYsImV4cCI6MTYwNjYwNzExNn0.rJ_QjU4KvA76H96RHsvOBChK0Vjbd0NmqjMxdQVJIXA",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmMyMDg1YmQwOTM2NTI4MTA3Y2UyNzQiLCJzaWQiOiI1ZmMyZDJmY2UxZDIwNTA2NzAyYmRkMjIiLCJpYXQiOjE2MDY2MDM1MTYsImV4cCI6MTYwNjYwNzExNn0.rJ_QjU4KvA76H96RHsvOBChK0Vjbd0NmqjMxdQVJIXB",
  "sid": "507f1f77bcf86cd799439011",
  "userData": {
    "email": "user@example.com",
    "balance": 5,
    "id": "507f1f77bcf86cd799439012",
    "transactions": [
      {
        "description": "Transaction's description",
        "category": "Продукты",
        "amount": 0,
        "date": "2020-12-31",
        "_id": "507f1f77bcf86cd799439013"
      }
    ]
  }
}


export const signUpThunk = createAsyncThunk(
  'auth/signUp',
  async (data, { rejectWithValue }) => {
    try {
      Notiflix.Notify.success('signup is success');
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      Notiflix.Notify.success('login is success');
      return mockLoginRes;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (data, { rejectWithValue }) => {
    try {
      Notiflix.Notify.success('logout is success');
      return null;
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
