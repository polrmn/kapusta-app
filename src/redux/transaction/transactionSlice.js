import { createSlice } from '@reduxjs/toolkit';
import {getTransactionsThunk} from './transactionOperations'
import { getExpense, getIncome } from './transactionOperations';
import { getUserThunk, loginThunk } from '../auth/authOperations';

const initialState = {
  isLoading: false,
  userTransactions: null,
  incomes: {
    monthStats: {},
  },
  expenses: {
    monthStats: {},
  },
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTransactionsThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(getTransactionsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload
      })
      .addCase(getTransactionsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload
      })

 
      .addCase(getIncome.pending, state => {
        state.isLoading = true;
      })
      .addCase(getIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.incomes.monthStats = action.payload.monthsStats;
      })
      .addCase(getIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getExpense.pending, state => {
        state.isLoading = true;
      })
      .addCase(getExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expenses.monthStats = action.payload.monthsStats;
      })
      .addCase(getExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // ============================ 2 санки после логина/рефреша которые нужны для передачи транзакций
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.userTransactions = payload.userData.transactions;
      })
      .addCase(getUserThunk.fulfilled, (state, { payload }) => {
        state.userTransactions = payload.transactions;
      })
  }
  });


export const transactionReducer = transactionSlice.reducer;
 console.log(createSlice);