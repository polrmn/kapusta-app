import { useEffect } from 'react';
import css from './expensesReport.module.scss';
import { useDispatch, useSelector } from 'react-redux';
// import { getAccessToken } from 'redux/auth/authSelectors';
import { setDate } from 'redux/dateSlice';
import { selectDate, selectIsLoading } from 'redux/selectors';
import { getTransactionsThunk } from 'redux/transaction/transactionOperations';
import { selectExpenses } from 'redux/transaction/transactionSelectors';
// import { setAuthHeader } from 'services/http/http';
import { Chart } from 'components/Chart/Chart';

export const ExpensesReport = () => {
  const reportDate = useSelector(selectDate);
  const expenses = useSelector(selectExpenses);
  const dispatch = useDispatch();
  // const persistedToken = useSelector(getAccessToken);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    // setAuthHeader(persistedToken);

    if (reportDate) {
      dispatch(getTransactionsThunk(reportDate));
    } else {
      dispatch(setDate('2023-03'));
    }
  }, [reportDate, dispatch]);

  const categories = [
    'Продукты',
    'Алкоголь',
    'Развлечения',
    'Здоровье',
    'Транспорт',
    'Всё для дома',
    'Техника',
    'Коммуналка и связь',
    'Спорт и хобби',
    'Образование',
    'Прочее',
  ];

  const filteredCategories = categories.filter(
    category => expenses.expensesData[category]
  );

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <h3 className={css.title}>Expenses</h3>
      {expenses.expenseTotal > 0 && (
        <ul className={css.container}>
          {filteredCategories.map(category => (
            <li className={css.category} key={category}>
              <p>{expenses.expensesData[category].total}</p>
              <svg>
                <use href={`../../images/symbol-defs.svg#Продукты`}></use>
              </svg>
              <p>{category}</p>
            </li>
          ))}
        </ul>
      )}
      <Chart />
    </>
  );
};
