export const selectIncomeSummary = state =>
  state.transaction.incomes.monthStats;

export const selectExpenseSummary = state =>
  state.transaction.expenses.monthStats;
