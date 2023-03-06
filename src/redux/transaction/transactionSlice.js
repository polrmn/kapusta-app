import { createSlice } from '@reduxjs/toolkit';
import { getUserThunk, loginThunk } from 'redux/auth/authOperations';
import {
  getExpense,
  getIncome,
  getIncomeCategoriesThunk,
  getTransactionsThunkHome,
  addExpenseTransactionThunk,
  delateTransactionThunk,
  getExpenseTransactionsByThunk,
  getExpenseCategoriesThunk,
  addIncomeTransactionThunk,
  getIncomeTransactionsByThunk,
  getTransactionsThunk,
} from './transactionOperations';

const initialState = {
  transactionsExpense: [],
  transactionsIncome: [],
  transactions: {
    expenses: null,
    incomes: null,
  },
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
    // currentState: {},
    expenses: { expenseTotal: 0, expensesData: null },
  },
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    // updateIncomeMonthStats: (state, { payload }) => {
    //   state.incomes.monthStats = { ...state.incomes.monthStats, payload };
    // },
  },
  extraReducers: builder => {
    builder
      /*addTransactionThunk*/
      .addCase(addExpenseTransactionThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(addExpenseTransactionThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.transactionsExpense = [
        //   ...state.transactionsExpense,
        //   payload.transaction,
        // ];
        state.transactions.expenses = [
          ...state.transactions.expenses,
          payload.transaction,
        ];
        state.expenses.currentState = payload.transaction;
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
          state.transactionsExpense = payload.expenses;
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
        // console.log(payload);
        // const indexElemExp = state.transactionsExpense.findIndex(
        //   item => item._id === payload
        // );
        // state.transactionsExpense.splice(indexElemExp, 1);
        // const indexElemInc = state.transactionsIncome.findIndex(
        //   item => item._id === payload
        // );
        // state.transactionsIncome.splice(indexElemInc, 1);
        const indexElemExp = state.transactions.expenses.findIndex(
          item => item._id === payload
        );
        state.transactions.expenses.splice(indexElemExp, 1);
        const indexElemInc = state.transactions.incomes.findIndex(
          item => item._id === payload
        );
        state.transactions.incomes.splice(indexElemInc, 1);
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

      /*addIncomeTransactionThunk */
      .addCase(addIncomeTransactionThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(addIncomeTransactionThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.transactions.incomes = [
          ...state.transactions.incomes,
          payload.transaction,
        ];
      })
      .addCase(addIncomeTransactionThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      /*getIncomeTransactionsByThunk */
      .addCase(getIncomeTransactionsByThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(getIncomeTransactionsByThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.transactionsIncome = payload.incomes;
      })
      .addCase(getIncomeTransactionsByThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      /* del getIncomeCategoriesThunk */
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
      /* del - getIncomeCategoriesThunk*/
      // .addCase(getIncomeCategoriesThunk.pending, state => {
      //   state.isLoading = true;
      // })
      // .addCase(getIncomeCategoriesThunk.fulfilled, (state, { payload }) => {
      //   state.isLoading = false;
      //   state.incomeCategory = payload;
      //   //state.category = payload;
      // })
      // .addCase(getIncomeCategoriesThunk.rejected, (state, { payload }) => {
      //   state.isLoading = false;
      //   state.error = payload;
      // })
      /*delate getTransactionsThunkHome */
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
      /* */
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
      })
      // ============================ 2 санки после логина/рефреша которые нужны для передачи транзакций
      // .addCase(loginThunk.fulfilled, (state, { payload }) => {
      //   state.transactions = payload.userData.transactions;
      // })
      // .addCase(getUserThunk.fulfilled, (state, { payload }) => {
      //   state.transactions = payload.transactions;
      // });
      // ============================ 2 санки после логина/рефреша которые нужны для передачи транзакций
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.transactions.expenses = payload.userData.transactions.filter(
          ({ category }) => category !== 'З/П' && category !== 'Доп. доход'
        );
        state.transactions.incomes = payload.userData.transactions.filter(
          ({ category }) => category === 'З/П' || category === 'Доп. доход'
        );
      })
      .addCase(getUserThunk.fulfilled, (state, { payload }) => {
        // console.log(payload);
        // state.transactions = payload.transactions;
        state.transactions.expenses = payload.transactions.filter(
          ({ category }) => category !== 'З/П' && category !== 'Доп. доход'
        );
        state.transactions.incomes = payload.transactions.filter(
          ({ category }) => category === 'З/П' || category === 'Доп. доход'
        );
      });
  },
});
export const transactionReducer = transactionSlice.reducer;
// export const { updateIncomeMonthStatsAction } = transactionSlice.actions;
