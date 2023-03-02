export const selectCategory = state => state.transaction.category;
export const selectIncomeCategories = state => state.incomeCategory;
export const selectTransactions = state => state.transaction.transactions;
export const selectIncomeSummary = state =>
  state.transaction.incomes.monthStats;

export const selectItems = state => state.transaction.items;
export const selectExpenseSummary = state =>
  state.transaction.expenses.monthStats;

export const selectIncomes = state => 
  state.transaction.incomes.incomes;

export const selectExpenses = state => 
  state.transaction.expenses.expenses;


