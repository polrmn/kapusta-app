import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import scss from './summary.module.scss';
import { getIsLogin } from 'redux/auth/authSelectors';
import { getExpense, getIncome } from 'redux/transaction/transactionOperations';
import {
  // currentTransaction,
  selectExpenseSummary,
  selectIncomeSummary,
  selectTransactionsExpenses,
  selectTransactionsIncome,
} from 'redux/transaction/transactionSelectors';
import { monthTranslate } from './monthTranslatе';
// import { getBalance } from 'redux/user/userSelectors';
// import {
//   updateIncomeMonthStats,
//   updateIncomeMonthStatsAction,
// } from 'redux/transaction/transactionSlice';

let dataSum;
// let stats;
const Summury = () => {
  const dispatch = useDispatch();
  const user = useSelector(getIsLogin);
  const incomeData = useSelector(selectIncomeSummary);
  const expenseData = useSelector(selectExpenseSummary);
  // const userBalans = useSelector(getBalance);
  const expences = useSelector(selectTransactionsExpenses);
  const income = useSelector(selectTransactionsIncome);
  // const data = useSelector(currentTransaction);
  // console.log('data', data);

  // useEffect(() => {
  //   if (user) dispatch(getIncome());
  //   if (user) dispatch(getExpense());
  // }, [dispatch, user, userBalans]);

  useEffect(() => {
    if (user) dispatch(getIncome());
  }, [dispatch, user, income]);

  useEffect(() => {
    if (user) dispatch(getExpense());
  }, [dispatch, user, expences]);

  const location = useLocation();

  if (location.pathname === '/income') {
    dataSum = Object.entries(incomeData) ?? [];
  }

  if (location.pathname === '/expenses') {
    dataSum = Object.entries(expenseData) ?? [];
  }

  // // ======================================================================================

  // const month = new Date(data.date).toLocaleString('default', {
  //   month: 'long',
  // });

  // const amount = data.amount;

  // stats = dataSum?.reverse().map(item => {
  //   if (item[0].toLowerCase() === month) {
  //     if (item[1] === 'N/A') {
  //       item[1] = 0;
  //     } else {
  //       const newMonth = month[0].toUpperCase() + month.slice(1, month.length);
  //       const newData = { [newMonth]: (item[1] = item[1] + amount) };

  //       dispatch(updateIncomeMonthStatsAction(newData));
  //       return (item[1] = item[1] + amount);
  //     }
  //   }
  // });

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
