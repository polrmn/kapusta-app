import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
} from 'recharts';
import css from '../ChartExpenses/chart.module.css';
export const ChartExpenses = () => {
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

  return (
    <div className={css.chartContainer}>
      <BarChart width={800} height={400} data={data} margin={{ top: 20 }}>
        <XAxis dataKey="name" stroke="false" />

        <Tooltip />
        <CartesianGrid stroke="false" strokeDasharray="5 5" />
        <Bar dataKey="uv" fill="#FF751D" barSize={38} shape={<TriangleBar />}>
          <LabelList dataKey="UAH" position="top"></LabelList>
        </Bar>
      </BarChart>
    </div>
  );
};
