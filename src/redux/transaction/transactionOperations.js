import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPeriodDataAPI } from 'services/transactionService';

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
      const newBalance = await addBalanceRequest(balance);
      return newBalance;
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