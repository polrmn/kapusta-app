import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPeriodDataAPI } from 'services/transactionService';
import { getExpenseAPI, getIncomeAPI } from 'services/transactionService';

export const thunkName = createAsyncThunk(
  'signature/thunkName',
  async (data, { rejectWithValue }) => {
    try {
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getIncome = createAsyncThunk(
  'transition/getIncome',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getIncomeAPI();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getExpense = createAsyncThunk(
  'transition/getExpense',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getExpenseAPI();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTransactionsThunk = createAsyncThunk(
  'transaction/byDate',
  async (date, { rejectWithValue }) => {
    try {
      const data = await getPeriodDataAPI(date);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
