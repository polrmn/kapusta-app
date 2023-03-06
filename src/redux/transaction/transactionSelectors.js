export const selectCategory = state => state.transaction.category;
export const selectIncomeCategories = state => state.transaction.incomeCategory;

export const selectTransactionsExpenses = state =>
  state.transaction.transactions.expenses;
export const selectTransactionsIncome = state =>
  state.transaction.transactions.incomes;

export const selectIncomeSummary = state =>
  state.transaction.incomes.monthStats;

export const selectItems = state => state.transaction.items;
export const selectExpenseSummary = state =>
  state.transaction.expenses.monthStats;

export const selectIncomes = state => state.transaction.incomes.incomes;

export const selectExpenses = state => state.transaction.expenses.expenses;
export const selectProductExpenses = state =>
  state.transaction.expenses.expenses.expensesData;
export const selectProductIncomes = state =>
  state.transaction.incomes.incomes.incomesData;

export const selectTotalIncome = state =>
  state.transaction.incomes.incomes.incomeTotal;
export const selectTotalExpense = state =>
  state.transaction.expenses.expenses.expenseTotal;

export const currentTransaction = state =>
  state.transaction.expenses.currentState;
