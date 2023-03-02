import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateBalanceAPI } from 'services/transactionService';

export const thunkName = createAsyncThunk(
  'signature/thunkName',
  async (data, { rejectWithValue }) => {
    try {
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBalance = createAsyncThunk(
  'user/balance',
  async (balance, thunkApi) => {
    try {
      const newBalance = await updateBalanceAPI(balance);
      return newBalance;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);