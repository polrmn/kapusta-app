import { createSlice } from '@reduxjs/toolkit';
import {
  addTransactionThunk,
  delateTransactionThunk,
  getTransactionsByThunk,
  getExpenseCategoriesThunk,
} from './transactionOperations';

const initialState = {
  transactions: [],
  categories: [],
  isLoading: false,
  error: null,
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      /*addTransactionThunk*/
      .addCase(addTransactionThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(addTransactionThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.transactions = [...state.transactions, payload];
      })
      .addCase(addTransactionThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      /*getTransactionsByThunk */
      .addCase(getTransactionsByThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(getTransactionsByThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.transactions = payload;
      })
      .addCase(getTransactionsByThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      /*delateTransactionThunk */
      .addCase(delateTransactionThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(delateTransactionThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const indexElem = state.transactions.findIndex(
          item => item.id === payload
        );
        state.transactions.splice(indexElem, 1);
      })
      .addCase(delateTransactionThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      /*getExpenseCategoriesThunk */
      .addCase(getExpenseCategoriesThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(getExpenseCategoriesThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.categories = payload;
      })
      .addCase(getExpenseCategoriesThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const transactionReducer = transactionSlice.reducer;
