import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import scss from './summary.module.scss';
import { getIsLogin, getUserBalance } from 'redux/auth/authSelectors';
import { getExpense, getIncome } from 'redux/transaction/transactionOperations';
import {
  currentTransaction,
  selectExpenseSummary,
  selectIncomeSummary,
  selectTransactionsExpenses,
  selectTransactionsIncome,
} from 'redux/transaction/transactionSelectors';
import { monthTranslate } from './monthTranslatе';
import { getBalance } from 'redux/user/userSelectors';

let dataSum;
let stats;
const Summury = () => {
  const dispatch = useDispatch();
  const user = useSelector(getIsLogin);
  const incomeData = useSelector(selectIncomeSummary);
  const expenseData = useSelector(selectExpenseSummary);
  // const userBalans = useSelector(getBalance);
  const expences = useSelector(selectTransactionsExpenses);
  const income = useSelector(selectTransactionsIncome);
  const data = useSelector(currentTransaction);

  // useEffect(() => {
  //   if (user) dispatch(getIncome());
  //   if (user) dispatch(getExpense());
  // }, [dispatch, user, userBalans]);

  // useEffect(() => {
  //   if (user) dispatch(getIncome());
  // }, [dispatch, user, income]);

  // useEffect(() => {
  //   if (user) dispatch(getExpense());
  // }, [dispatch, user, expences]);

  const location = useLocation();

  if (location.pathname === '/income') {
    dataSum = Object.entries(incomeData) ?? [];
  }
  console.log(dataSum);
  if (location.pathname === '/expenses') {
    dataSum = Object.entries(expenseData) ?? [];
  }
  console.log(dataSum);
  // ======================================================================================
  // currentState: {},

  //  state.expenses.currentState = payload.transaction;
  //  console.log('payload', payload);

  const month = new Date(data.date).toLocaleString('default', {
    month: 'long',
  });
  // const index = data.date.slice(5, 7);
  const amount = data.amount;
  console.log('month', month);
  console.log('amount', amount);
  // console.log('index', index);
  stats = dataSum?.reverse().map(item => {
    if (item[0].toLowerCase() === month) {
      if (item[1] === 'N/A') {
        item[1] = 0;
      } else {
        return (item[1] = item[1] + amount);
      }
      console.log('item[1]', item[1]);
      console.log((item[1] = item[1] + amount));
    }
  });
  console.log('expenseData', expenseData);
  console.log('amount', amount);
  console.log('stats', stats);
  // =================================================================================
  return (
    <div>
      <div className={scss.summary}>
        <table className={scss.summaryTable}>
          <thead>
            <tr className="">
              <th className={scss.summaryTitle} colSpan="2">
                SUMMARY
              </th>
            </tr>
          </thead>
          <tbody>
            {dataSum?.reverse().map(item => {
              if (item[1] === 'N/A') {
                return false;
              } else {
                return (
                  <tr className={scss.summaryItem} key={`${item[0]}`}>
                    <td className={scss.summaryItemMonth}>
                      {monthTranslate(item[0])}
                    </td>
                    <td className={scss.summaryItemValue}>{item[1]}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Summury;
