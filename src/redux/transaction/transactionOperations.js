import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteTransactionAPI,
  getExpenseAPI,
  getExpenseCategoriesAPI,
  getPeriodDataAPI,
} from 'services/transactionService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { addExpenseAPI } from './../../services/transactionService';

export const addTransactionThunk = createAsyncThunk(
  'expenses/addTransaction',
  async (transactionData, { rejectWithValue }) => {
    try {
      const data = await addExpenseAPI(transactionData);
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
      const data = await getPeriodDataAPI(date);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBalanceThunk = createAsyncThunk(
  'user/balance',
  async (balance, thunkApi) => {
    try {
      // const newBalance = await addBalanceRequest(balance);
      // return newBalance;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);
// export const addBalance = createAsyncThunk(
//   'user/balance',
//   async (balance, thunkApi) => {
//     try {
//       const userBalance = await addBalanceRequest(balance);
//       userBalance?.token && localStorage.setItem('token', userBalance.token);
//       return userBalance;
//     } catch (e) {
//       return thunkApi.rejectWithValue(e.message);
//     }
//   }
// );
// export const addBalane = createAsyncThunk("user/balance", async (balanceData, thunkAPI) => {
//     try {
//         const { data } = await axios.patch("/balance", { ...balanceData });
//         return data;
//     } catch (e) {
//         return thunkAPI.rejectWithValue(e.message);
//     }
// }
// );
