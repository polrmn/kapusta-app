import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
} from 'recharts';
import css from '../ChartIncome/chartIncome.module.css';
export const ChartIncome = () => {
  const data = [
    { name: 'Me', UAH: 25000 },
    { name: 'Wife', UAH: 20000 },
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

  return (
    <div className={css.chartContainer}>
      <BarChart width={150} height={400} data={data} margin={{ top: 20 }}>
        <XAxis dataKey="name" stroke="false" />

        <Tooltip />
        <CartesianGrid stroke="false" strokeDasharray="5 5" />
        <Bar dataKey="UAH" fill="#FF751D" barSize={38} shape={<TriangleBar />}>
          <LabelList dataKey="UAH" position="top" />
        </Bar>
      </BarChart>
    </div>
  );
};
