import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateBalanceAPI } from 'services/transactionService';

export const thunkName = createAsyncThunk(
  'signature/thunkName',
  async (_, { rejectWithValue }) => {
    try {
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBalance = createAsyncThunk(
  'user/addBalance',
  async (balance, thunkApi) => {
    try {
      const newBalance = await updateBalanceAPI(balance);
      
      return newBalance;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

// export const getUserThunk = createAsyncThunk (
//   'user/info',
//   async (_, { rejectWithValue }) => {
//     try {
//       const result = await getUserInfoApi()
//       return result;
//     } catch (error) {
//       return rejectWithValue(error.message)
//     }
//   }
// )