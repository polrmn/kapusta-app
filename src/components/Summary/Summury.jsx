import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getIsLogin } from 'redux/auth/authSelectors';
import { getExpense, getIncome } from 'redux/transaction/transactionOperations';
import {
  selectExpenseSummary,
  // selectIncomeSummary,
} from 'redux/transaction/transactionSelectors';
import { monthTranslate } from './monthTranslatе';

let dataSum;

const Summury = () => {
  const dispatch = useDispatch();
  const user = useSelector(getIsLogin);
  // const incomeData = useSelector(selectIncomeSummary);
  const expenseData = useSelector(selectExpenseSummary);

  useEffect(() => {
    if (user) dispatch(getIncome());
    if (user) dispatch(getExpense());
  }, [dispatch, user]);

  const location = useLocation();

  // if (location.pathname === '/login') {
  // const dataSum = Object.entries(incomeData) ?? [];

  // }

  if (location.pathname === '/login') {
    dataSum = Object.entries(expenseData) ?? [];
  }

  return (
    <div>
      <div className="">
        <table className="">
          <thead>
            <tr className="">
              <th className="" colSpan="2">
                SUMMARY
              </th>
            </tr>
          </thead>
          <tbody>
            {dataSum?.reverse().map(
              item => (
                // {
                //   if (item[1] === 'N/A') {
                //     return false;
                //   } else {
                //     return (
                <tr className="" key={`${item[0]}`}>
                  <td className="">{monthTranslate(item[0])}</td>
                  <td className="">{item[1]}</td>
                </tr>
              )
              //     );
              //   }
              // }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Summury;