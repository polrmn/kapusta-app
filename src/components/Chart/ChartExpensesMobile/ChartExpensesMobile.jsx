import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import css from '../ChartExpensesMobile/ChartExpensesMobile.module.css';

export const ChartExpensesMobile = () => {
  const data = [
    {
      name: 'Page r',
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

  const getPath = (x, y, width, height, borderRadius) => {
    const r = borderRadius || 0;
    const rTopLeft = 0;
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
    const rBottomLeft = 0;
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

  return (
    <div className={css.chartContainer}>
      <ResponsiveContainer width={800} height="100%">
        <ComposedChart
          layout="vertical"
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" scale="band" />
          <Tooltip />

          <Bar
            dataKey="pv"
            barSize={38}
            fill="#FF751D"
            shape={<TriangleBar />}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
