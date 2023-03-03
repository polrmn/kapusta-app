import { createSlice } from '@reduxjs/toolkit';
import {
  getExpense,
  getIncome,
  getIncomeCategoriesThunk,
  getTransactionsThunkHome,
} from './transactionOperations';
import {
  addExpenseTransactionThunk,
  delateTransactionThunk,
  getExpenseTransactionsByThunk,
  getExpenseCategoriesThunk,
  addIncomeTransactionThunk,
  getTransactionsThunk,
} from './transactionOperations';

const initialState = {
  transactions: [],
  category: [],
  incomeCategory: [],
  isLoading: false,
  error: null,
  incomes: {
    monthStats: {},
    incomes: { incomeTotal: 0, incomesData: null },
  },
  expenses: {
    monthStats: {},
    expenses: { expenseTotal: 0, expensesData: null },
  },
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      /*addTransactionThunk*/
      .addCase(addExpenseTransactionThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(addExpenseTransactionThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.transactions = [...state.transactions, payload];
      })
      .addCase(addExpenseTransactionThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      /*getTransactionsByThunk */
      .addCase(getExpenseTransactionsByThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        getExpenseTransactionsByThunk.fulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.transactions = payload;
        }
      )
      .addCase(getExpenseTransactionsByThunk.rejected, (state, { payload }) => {
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
          item => item.id === payload.id
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
        state.category = payload;
      })
      .addCase(getExpenseCategoriesThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(getIncomeCategoriesThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(getIncomeCategoriesThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.incomeCategory = payload;
      })
      .addCase(getIncomeCategoriesThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      /*income */
      .addCase(addIncomeTransactionThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(addIncomeTransactionThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.transactions = [...state.transactions, payload];
      })
      .addCase(addIncomeTransactionThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(getTransactionsThunkHome.pending, state => {
        state.isLoading = true;
      })
      .addCase(getTransactionsThunkHome.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload;
      })
      .addCase(getTransactionsThunkHome.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
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

      .addCase(getTransactionsThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(getTransactionsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expenses.expenses = action.payload.expenses;
        state.incomes.incomes = action.payload.incomes;
      })
      .addCase(getTransactionsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    // ============================ 2 санки после логина/рефреша которые нужны для передачи транзакций
    // .addCase(loginThunk.fulfilled, (state, { payload }) => {
    //   state.transactions = payload.userData.transactions;
    // })
    // .addCase(getUserThunk.fulfilled, (state, { payload }) => {
    //   state.transactions = payload.transactions;
    // });
  },
});
export const transactionReducer = transactionSlice.reducer;
