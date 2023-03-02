import { ChartExpenses } from './ChartExpenses/ChartExpenses';
import { ChartIncome } from './ChartIncome/ChartIncome';
import { ChartExpensesMobile } from './ChartExpensesMobile/ChartExpensesMobile';
import { ChartIncomeMobile } from './ChartIncomeMobile/ChartIncomeMobile';

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
