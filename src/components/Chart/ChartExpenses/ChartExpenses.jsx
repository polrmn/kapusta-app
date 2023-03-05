import {
  Bar,
  XAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
  ComposedChart,
  Legend,
  Label,
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

export const ChartExpenses = ({ type }) => {
  // const { width, height } = useWindowSize();

  const DataIncomes = useSelector(selectProductIncomes);
  const DataExpenses = useSelector(selectProductExpenses);

  const categoryFilter = useSelector(selectCategoryFilter);

  if (type === 'expenses') {
  }

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
  const wrapperStyle = {
    color: '#FF751D',
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
    <>
      <div className={css.chartContainer}>
        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart data={dataForRender(data)} margin={{ top: 20 }}>
            <XAxis dataKey="name" stroke="false" />

            <Tooltip wrapperStyle={tooltipStyle} />
            <Legend
              verticalAlign="top"
              iconType="square"
              wrapperStyle={wrapperStyle}
            />
            <Bar
              dataKey="UAH"
              fill="#FF751D"
              background={{ fill: '#eee' }}
              barSize={38}
              shape={<TriangleBar />}
            >
              <LabelList
                dataKey="UAH"
                position="top"
                fill="#52555F"
                content="UAH"
              ></LabelList>
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
