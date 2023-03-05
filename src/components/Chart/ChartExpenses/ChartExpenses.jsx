import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ComposedChart,
  BarChart,
} from 'recharts';
import { useSelector } from 'react-redux';
import css from '../ChartExpenses/chart.module.scss';
import { omit } from 'lodash';
import {
  selectProductIncomes,
  selectProductExpenses,
} from '../../../redux/transaction/transactionSelectors';

import { useMemo } from 'react';
import { selectCategoryFilter } from 'redux/categoryFilter/categoryFilterSelectors';
import { selectReportType } from 'redux/reportType/reportTypeSelector';

export const ChartExpenses = () => {
  // const { width, height } = useWindowSize();
  const ReportType = useSelector(selectReportType);
  const DataIncomes = useSelector(selectProductIncomes);
  const DataExpenses = useSelector(selectProductExpenses);

  const categoryFilter = useSelector(selectCategoryFilter);

  const data = useMemo(() => {
    let category = null;
    if (ReportType === 'income') {
      category = DataIncomes;
    } else if (ReportType === 'expense') {
      category = DataExpenses;
    }

    if (category != null) {
      const entries = Object.entries(category);
      const omitedEntries = entries.map(item => {
        item[1] = omit(item[1], ['total']);
        return item;
      });

      if (!categoryFilter) {
        return [];
      }

      const chartData = omitedEntries.find(elem => elem[0] === categoryFilter);

      if (chartData == null) {
        return [];
      }

      const res = [];
      for (const key in chartData[1]) {
        res.push({ name: key, UAH: chartData[1][key] });
      }
      return res.sort((a, b) => b.UAH - a.UAH);
    } else {
      return [];
    }
  }, [DataExpenses, categoryFilter, ReportType]);

  const getPath = (x, y, width, height, borderRadius = 10) => {
    const r = borderRadius || 0;
    const rTopLeft = Math.min(r, Math.min(width, height) / 2);
    const rTopRight = Math.min(r, Math.min(width, height) / 2);

    const path = `
    M ${x + rTopLeft} ${y}
    H ${x + width - rTopRight}
    Q ${x + width} ${y} ${x + width} ${y + rTopRight}
    V ${y + height}
    H ${x}
    V ${y + rTopLeft}
    Q ${x} ${y} ${x + rTopLeft} ${y}
    Z
  `;
    return path;
  };

  const TriangleBar = props => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  const fillRender = index => {
    if (index % 3 === 0) {
      return '#FF751D';
    } else {
      return '#FFDAC0';
    }
  };

  const dataForRender = data => {
    if (data) {
      return data.map((elem, index) => ({
        ...elem,
        fill: fillRender(index),
      }));
    }
    return data;
  };
  const tooltipStyle = {
    color: '#071F41',
    letterSpacing: '0.04em',
    fontSize: '14px',
    fontWeight: '700',
    lineHeight: '16px',
  };
  const CustomLabelList = props => {
    const { x, y, value } = props;
    return (
      <text x={x} y={y} dy={-10} fill="#666" textAnchor="start">
        {value} UAH
      </text>
    );
  };

  return (
    <>
      <div className={css.chartContainer}>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={dataForRender(data)} margin={{ top: 30 }}>
            <XAxis dataKey="name" stroke="false" tickMargin="4" />

            <Tooltip
              wrapperStyle={tooltipStyle}
              viewBox={{ width: 100, height: 100 }}
            />

            <Bar
              dataKey="UAH"
              barSize={38}
              fill="#FF751D"
              shape={<TriangleBar />}
              label={<CustomLabelList />}
            ></Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
