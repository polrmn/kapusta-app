import { ChartExpenses } from './Chart/ChartExpenses/ChartExpenses';
import { ChartIncome } from './Chart/ChartIncome/ChartIncome';
import { ChartExpensesMobile } from './Chart/ChartExpensesMobile/ChartExpensesMobile';
import { ChartIncomeMobile } from './Chart/ChartIncomeMobile/ChartIncomeMobile';

export const Chart = () => {
  return (
    <>
      <ChartExpenses />
      <ChartIncome />
      <ChartExpensesMobile />
      <ChartIncomeMobile />
    </>
  );
};
