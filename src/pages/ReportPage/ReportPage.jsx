import { Chart } from 'components/Chart/Chart';
import css from './reportPage.module.scss';
import { ExpensesReport } from 'components/ExpensesReport/ExpensesReport';
import { IncomeReport } from 'components/IncomeReport/IncomeReport';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectReportType } from 'redux/reportType/reportTypeSelector';
import { selectDate, selectIsLoading } from 'redux/selectors';
import { getExpense, getIncome, getTransactionsThunk } from 'redux/transaction/transactionOperations';
import {
  selectTotalExpense,
  selectTotalIncome,
} from 'redux/transaction/transactionSelectors';
// import { CurrentPeriod } from 'components/CurrentPeriod/CurrentPeriod';

export const ReportPage = () => {
  const isLoading = useSelector(selectIsLoading);
  const reportType = useSelector(selectReportType);
  const reportDate = useSelector(selectDate);
  const totalIncome = useSelector(selectTotalIncome);
  const totalExpense = useSelector(selectTotalExpense);

  const dispatch = useDispatch();
  useEffect(() => {
    if (reportDate && reportDate.length > 0) {
        dispatch(getTransactionsThunk(reportDate));
    } else {
      const currentDate = new Date();
      var year = currentDate.toLocaleString('default', { year: 'numeric' });
      var month = currentDate.toLocaleString('default', { month: '2-digit' });

      dispatch(getTransactionsThunk(`${year}-${month}`));
    }

    console.log('Total expense:', totalExpense);
    console.log('Total income:', totalIncome);
  }, [reportDate, dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* <CurrentPeriod /> */}
      {
        <div className={css.box_total}>
          <p className={css.totals_bar}>
            Expenses: <span className={css.total_expense}>{totalExpense.toFixed(2)}</span>
          </p>
          <p className={css.totals_bar}>
            Income: <span className={css.total_income}>{totalIncome.toFixed(2)}</span>
          </p>
        </div>
      }
      {reportType === 'expense' ? <ExpensesReport /> : <IncomeReport />}
      <Chart />
    </>
  );
};
