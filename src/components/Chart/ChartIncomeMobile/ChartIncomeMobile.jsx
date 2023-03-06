import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import css from '../ChartIncomeMobile/ChartIncomeMobile.module.scss';
import { omit } from 'lodash';
import {
  selectProductIncomes,
  selectProductExpenses,
} from '../../../redux/transaction/transactionSelectors';
import { useMemo } from 'react';
import { selectCategoryFilter } from 'redux/categoryFilter/categoryFilterSelectors';
import { useSelector } from 'react-redux';
import { selectReportType } from 'redux/reportType/reportTypeSelector';

export const ChartIncomeMobile = () => {
  const DataIncomes = useSelector(selectProductIncomes);
  const DataExpenses = useSelector(selectProductExpenses);
  const ReportType = useSelector(selectReportType);
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
    const rTopRight = Math.min(
      r,
      Math.min(width, height) / 2,
      width - rTopLeft
    );
    const rBottomRight = Math.min(
      r,
      Math.min(width, height) / 2,
      width - rTopLeft,
      height - rTopLeft
    );
    const rBottomLeft = Math.min(
      r,
      Math.min(width, height) / 2,
      height - rTopLeft
    );
    const path = `
    M ${x + rTopLeft} ${y}
    H ${x + width - rTopRight}
    Q ${x + width} ${y} ${x + width} ${y + rTopRight}
    V ${y + height - rBottomRight}
    Q ${x + width} ${y + height} ${x + width - rBottomRight} ${y + height}
    H ${x + rBottomLeft}
    Q ${x} ${y + height} ${x} ${y + height - rBottomLeft}
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

  // const calculateBarWidths = (data, containerWidth) => {
  //   // Find the maximum value in the data array
  //   const maxVal = Math.max(...data);

  //   // Calculate the width of each bar based on the container width and data
  //   const barWidths = data.map(val => (val / maxVal) * containerWidth);

  //   return barWidths;
  // };
  const CustomLabelList = props => {
    const { x, y, value } = props;
    return (
      <text x={x} y={y} dy={-10} fill="#666" textAnchor="start">
        {value} UAH
      </text>
    );
  };

  const tooltipStyle = {
    color: '#071F41',
    letterSpacing: '0.04em',
    fontSize: '14px',
    fontWeight: '700',
    lineHeight: '16px',
  };

  return (
    <div className={css.chartContainer}>
      <ResponsiveContainer width="100%" height={650}>
        <ComposedChart
          layout="vertical"
          data={dataForRender(data)}
          margin={{
            top: 20,
            right: 50,
            bottom: 25,
            left: 45,
          }}
          barCategoryGap="25px"
        >
          <XAxis
            type="number"
            stroke="false"
            hide="false"
            tickFormatter={value => `${value} UAH`}
          />
          <YAxis
            dataKey="name"
            type="category"
            // scale="band"
            stroke="false"
            tick={{ stroke: '#52555F', strokeWidth: 1 }}
          />

          <Tooltip wrapperStyle={tooltipStyle} />

          <Bar
            dataKey="UAH"
            barSize={38}
            fill="#FF751D"
            shape={<TriangleBar />}
            label={<CustomLabelList />}
            barGap={10}
            barCategoryGap={20}
          ></Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
