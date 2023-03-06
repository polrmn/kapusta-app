import { useMediaQuery } from '@mui/material';
import { ChartExpenses } from './ChartExpenses/ChartExpenses';
import { ChartIncomeMobile } from './ChartIncomeMobile/ChartIncomeMobile';

export const Chart = () => {
  const isScreenMobile = useMediaQuery('(max-width: 767.9px)');
  return <>{isScreenMobile ? <ChartIncomeMobile /> : <ChartExpenses />}</>;
};
