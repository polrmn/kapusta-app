import { createSlice } from '@reduxjs/toolkit';
import { getExpense, getIncome } from './transactionOperations';

const initialState = {
  isLoading: false,
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
  extraReducers: builder =>
    builder
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
      }),
});

export const transactionReducer = transactionSlice.reducer;
