import {
  Bar,
  XAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getTransactionsThunk } from '../../../redux/transaction/transactionOperations';
// import { nanoid } from '@reduxjs/toolkit';
import css from '../ChartExpenses/chart.module.scss';
import { selectItems } from '../../../redux/transaction/transactionSelectors';
import { useEffect } from 'react';

// import { useWindowSize } from 'react-use';

export const ChartExpenses = () => {
  // const { width, height } = useWindowSize();
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    dispatch(getTransactionsThunk());
  };

  // useEffect(() => {
  //   dispatch(getTransactionsThunk());
  // },[dispatch]);

  const data = [
    {
      name: 'Page A',
      uv: 590,
      pv: 800,
      amt: 1400,
    },
    {
      name: 'Page B',
      uv: 868,
      pv: 967,
      amt: 1506,
    },
    {
      name: 'Page C',
      uv: 1397,
      pv: 1098,
      amt: 989,
    },
    {
      name: 'Page D',
      uv: 1480,
      pv: 1200,
      amt: 1228,
    },
    {
      name: 'Page E',
      uv: 1520,
      pv: 1108,
      amt: 1100,
    },
    {
      name: 'Page F',
      uv: 1400,
      pv: 680,
      amt: 1700,
    },
  ];

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
  // const calculateBarWidths = (data, containerWidth) => {
  //   // Find the maximum value in the data array
  //   const maxVal = Math.max(...data);

  //   // Calculate the width of each bar based on the container width and data
  //   const barWidths = data.map(val => (val / maxVal) * containerWidth);

  //   return barWidths;
  // };

  // let maxDataLength = Math.max(...data.map(arr => arr.length));
  // let barWidth = 800;

  // if (maxDataLength >= 10) {
  //   barWidth += 2 * (maxDataLength - 10);
  // }
  const fillRender = index => {
    if (index % 2 === 0) {
      return '#FF751D';
    } else {
      return '#FFDAC0';
    }
  };
  const dataForRender = data => {
    return data.map((elem, index) => ({ ...elem, fill: fillRender(index) }));
  };
  return (
    <>
      <button className={css.btn} type="button" onClick={handleButtonClick}>
        Products
      </button>
      <button className={css.btn} type="button" onClick={handleButtonClick}>
        Salary
      </button>
      <div className={css.chartContainer}>
        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart
            width={150}
            height={400}
            data={dataForRender(data)}
            margin={{ top: 20 }}
          >
            <XAxis dataKey="name" stroke="false" />

            <Tooltip />

            <Bar dataKey="uv" fill="fill" barSize={38} shape={<TriangleBar />}>
              <LabelList dataKey="UAH" position="top"></LabelList>
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
