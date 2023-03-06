import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import css from './calendar.module.scss';

export const Calendar = ({ onClick }) => {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    onClick(startDate.toISOString().slice(0, 10));
  }, [onClick, startDate]);

  const handleCalendarClose = () => {
    const parseData = Date.parse(startDate);

    const moment = require('moment');
    const getDate = moment(parseData);
    const result = getDate.format('YYYY-MM-DD');

    onClick(result);
    return;
  };

  return (
    <div className={css['calendarWrapper']}>
      <div className={css['calendarIcon']}></div>

      <DatePicker
        dateFormat="dd.MM.yyyy"
        selected={startDate}
        onChange={date => setStartDate(date)}
        onCalendarClose={handleCalendarClose}
        className={css['calendarInput']}
      />
    </div>
  );
};
