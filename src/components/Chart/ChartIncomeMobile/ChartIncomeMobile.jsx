import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  Legend,
  Tooltip,
  CartesianAxis,
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

export const ChartIncomeMobile = () => {
  const DataIncomes = useSelector(selectProductIncomes);
  const DataExpenses = useSelector(selectProductExpenses);

  const categoryFilter = useSelector(selectCategoryFilter);

  const data = useMemo(() => {
    if (DataExpenses) {
      const entriesExpenses = Object.entries(DataExpenses);

      const omitedExpenses = entriesExpenses.map(item => {
        item[1] = omit(item[1], ['total']);
        return item;
      });

      if (!categoryFilter) {
        return [];
      }
      const expensesChart = omitedExpenses.find(
        elem => elem[0] === categoryFilter
      )[1]; // підставити замість 0 індекс обраного продукту, додати масив залежностей індекс

      const res = [];
      for (const key in expensesChart) {
        res.push({ name: key, UAH: expensesChart[key] });
      }
      return res.sort((a, b) => b.UAH - a.UAH);
    }
  }, [DataExpenses, categoryFilter]);

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
    if (index % 2 === 0) {
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
  const wrapperStyle = {
    color: '#071F41',
    height: '10%',
    letterSpacing: '0.04em',
    fontSize: '14px',
    fontWeight: '700',
    lineHeight: '16px',
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
      <ComposedChart
        layout="vertical"
        data={dataForRender(data)}
        width={700}
        height={800}
        margin={{
          top: 20,
          right: 50,
          bottom: 20,
          left: 20,
        }}
      >
        <XAxis type="number" stroke="false" hide="false" />
        <YAxis
          dataKey="name"
          type="category"
          scale="band"
          stroke="false"
          interval="preserveEnd"
          verticalAnchor="middle"
        />
        <CartesianAxis x="100" />
        <Tooltip wrapperStyle={tooltipStyle} />
        <Legend
          verticalAlign="top"
          iconType="square"
          wrapperStyle={wrapperStyle}
        />
        <Bar
          dataKey="UAH"
          barSize={38}
          fill="#FF751D"
          shape={<TriangleBar />}
          background={{ fill: '#eee' }}
        >
          <LabelList
            dataKey="UAH"
            position="right"
            fill="#52555F"
            content="UAH"
          ></LabelList>
        </Bar>
      </ComposedChart>
    </div>
  );
};
