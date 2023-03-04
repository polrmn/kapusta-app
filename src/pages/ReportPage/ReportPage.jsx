import { Calendar } from 'components/Calendar/Calendar';
import { Chart } from 'components/Chart/Chart';
import { ExpensesReport } from 'components/ExpensesReport/ExpensesReport';
import { IncomeReport } from 'components/IncomeReport/IncomeReport';
import { useSelector } from 'react-redux';
import { selectReportType } from 'redux/reportType/reportTypeSelector';
import { selectIsLoading } from 'redux/selectors';
// import { CurrentPeriod } from 'components/CurrentPeriod/CurrentPeriod';

export const ReportPage = () => {
  const isLoading = useSelector(selectIsLoading);
  const reportType = useSelector(selectReportType);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Calendar
        onClick={result => {
          console.log(result);
        }}
      />
      {/* <CurrentPeriod /> */}
      {reportType === 'expense' ? <ExpensesReport /> : <IncomeReport />}
      <Chart />
    </>
  );
};
