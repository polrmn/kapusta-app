export const selectIncomeSummary = state =>
  state.transaction.incomes.monthStats;

export const selectExpenseSummary = state =>
  state.transaction.expenses.monthStats;

export const selectIncomes = state => 
  state.transaction.incomes.incomes;

export const selectExpenses = state => 
  state.transaction.expenses.expenses;