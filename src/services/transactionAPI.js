import axios from 'axios';

export const addIncomeAPI = async incData => {
  const { data } = await axios.post('transaction/income', incData);
  return data;
};

export const getIncomeAPI = async () => {
  const { data } = await axios.get('transaction/income');
  return data;
};

export const addExpenseAPI = async expData => {
  const { data } = await axios.post('transaction/expense', expData);
  return data;
};

export const getExpenseAPI = async expData => {
  const { data } = await axios.get('transaction/expense');
  return data;
};

export const deleteTransactionAPI = async id => {
  const { data } = await axios.delete(`transaction/${id}`);
  return data;
};

export const getIncomeCategoriesAPI = async () => {
  const { data } = await axios.get('transaction/income-categories');
  return data;
};
export const getExpenseCategoriesAPI = async () => {
  const { data } = await axios.get('transaction/expense-categories');
  return data;
};

export const getPeriodDataAPI = async period => {
  const { data } = await axios.get(`transaction/period-data/${period}`);
  return data;
};

export const updateBalanceAPI = async newBalance => {
  const { data } = await axios.get('user/balance', newBalance);
  return data;
};
