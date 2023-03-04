import { privateAPI } from './http/http';

export const addIncomeAPI = async incData => {
  console.log();
  const { data } = await privateAPI.post('transaction/income', incData);
  return data;
};

export const getIncomeAPI = async () => {
  const { data } = await privateAPI.get('transaction/income');
  return data;
};

export const addExpenseAPI = async expData => {
  const { data } = await privateAPI.post('transaction/expense', expData);
  return data;
};

export const getExpenseAPI = async expData => {
  const { data } = await privateAPI.get('transaction/expense');
  return data;
};

export const deleteTransactionAPI = async id => {
  const { data } = await privateAPI.delete(`transaction/${id}`);
  return data;
};

export const getIncomeCategoriesAPI = async () => {
  const { data } = await privateAPI.get('transaction/income-categories');
  return data;
};
export const getExpenseCategoriesAPI = async () => {
  const { data } = await privateAPI.get('transaction/expense-categories');
  return data;
};

export const getPeriodDataAPI = async period => {
  const { data } = await privateAPI.get(
    `transaction/period-data?date=${period}`
  );
  return data;
};

export const updateBalanceAPI = async newBalance => {
  const { data } = await privateAPI.patch('user/balance', newBalance);
  return data;
};

