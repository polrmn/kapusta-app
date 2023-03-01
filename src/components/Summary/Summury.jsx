import React from 'react';
import { useLocation } from 'react-router';
let dataExp = {
  Январь: 5,
  Февраль: 100,
  Март: 'N/A',
  Апрель: 'N/A',
  Май: 1,
  Июнь: 'N/A',
  Июль: 3,
  Август: 'N/A',
  Сентябрь: 'N/A',
  Октябрь: 77,
  Ноябрь: 'N/A',
  Декабрь: 123,
};
const Summury = () => {
  let data = [];
  const location = useLocation();
  if (location.pathname === '/expenses') {
    const data = Object.entries(dataExp) ?? [];
    console.log(data);
  }
  if (location.pathname === '/income') {
    const data = Object.entries(dataExp) ?? [];
    console.log(data);
  }

  return (
    <div>
      summary
      <div className="">
        <table className="">
          <thead>
            <tr className="">
              <th className="" colSpan="2">
                Summury
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map(item => (
              <tr className="" key="">
                <td className="">{}</td>
                <td className="">{}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Summury;
