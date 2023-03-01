import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthHeader } from '../../services/http/http';
import {
  addExpenseAPI,
  deleteTransactionAPI,
  getExpenseAPI,
  getExpenseCategoriesAPI,
} from 'services/transactionService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const addTransactionThunk = createAsyncThunk(
  'expenses/addTransaction',
  async (transactionData, { rejectWithValue }) => {
    try {
      const data = await addExpenseAPI(transactionData);
      //console.log(data);
      return data;
    } catch (error) {
      Notify.failure('Something went wrong, please try again later');
      return rejectWithValue(error.message);
    }
  }
);
export const getTransactionsByThunk = createAsyncThunk(
  'expenses/getTransaction',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await getExpenseAPI(credentials);
      //console.log(data);
      return data;
    } catch (error) {
      Notify.failure('Something went wrong, please try again later');
      return rejectWithValue(error.message);
    }
  }
);
export const getExpenseCategoriesThunk = createAsyncThunk(
  'expenses/getExpenseCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getExpenseCategoriesAPI();
      //console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const delateTransactionThunk = createAsyncThunk(
  'expenses/delateTransaction',
  async (id, { rejectWithValue }) => {
    try {
      await deleteTransactionAPI(id);
      //console.log(data);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
