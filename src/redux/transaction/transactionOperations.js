import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from 'services/instance';

export const thunkName = createAsyncThunk(
  'signature/thunkName',
  async (data, { rejectWithValue }) => {
    try {
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTransactionsThunk = createAsyncThunk(
  'transaction/byDate',
  async (date, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`transaction/${date}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
