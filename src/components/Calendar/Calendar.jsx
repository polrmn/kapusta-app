import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDate } from '../../redux/dateSlice';
import { getTransactionsThunk } from '../../redux/transaction/transactionOperations';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import css from './calendar.module.scss';

export const Calendar = ({ onClick }) => {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();

  const handleCalendarClose = () => {
    const parseData = Date.parse(startDate);

    const moment = require('moment');
    const getDate = moment(parseData);
    const result = getDate.format('YYYY-MM-DD');

    onClick(result);
    //dispatch(getTransactionsThunk(result));
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
