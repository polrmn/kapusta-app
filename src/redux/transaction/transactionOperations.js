import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addIncomeAPI,
  deleteTransactionAPI,
  getExpenseAPI,
  getExpenseCategoriesAPI,
  getIncomeAPI,
  getIncomeCategoriesAPI,
  getPeriodDataAPI,
} from 'services/transactionService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { addExpenseAPI } from './../../services/transactionService';

export const addExpenseTransactionThunk = createAsyncThunk(
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
export const getExpenseTransactionsByThunk = createAsyncThunk(
  'expenses/getTransaction',
  async (transactionData, { rejectWithValue }) => {
    try {
      const data = await getExpenseAPI(transactionData);
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
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/*income */
export const addIncomeTransactionThunk = createAsyncThunk(
  'income/addTransaction',
  async (transactionData, { rejectWithValue }) => {
    try {
      const data = await addIncomeAPI(transactionData);
      return data;
    } catch (error) {
      Notify.failure('Something went wrong, please try again later');
      return rejectWithValue(error.message);
    }
  }
);
export const getIncomeTransactionsByThunk = createAsyncThunk(
  'income/getTransaction',
  async (transactionData, { rejectWithValue }) => {
    try {
      const data = await getIncomeAPI(transactionData);
      return data;
    } catch (error) {
      Notify.failure('Something went wrong, please try again later');
      return rejectWithValue(error.message);
    }
  }
);
export const getIncomeCategoriesThunk = createAsyncThunk(
  'income/getIncomeCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getIncomeCategoriesAPI();
      return data;
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
    } catch (e) {
      return rejectWithValue(e);
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

export const getTransactionsThunkHome = createAsyncThunk(
  'transaction/byDateHome',
  async (date, { rejectWithValue }) => {
    try {
      const data = await getPeriodDataAPI(date);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
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
