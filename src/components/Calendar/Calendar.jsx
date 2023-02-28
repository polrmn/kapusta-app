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

    dispatch(setDate(result));
    if (onClick) {
      onClick(result);
      return;
    }
    dispatch(getTransactionsThunk(result));
    return;
  };

  return (
    <div className={css['calendarWrapper']}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="21"
        fill="none"
      >
        <path
          fill="#52555F"
          d="M17.475 2.067h-1.312v-.32a.586.586 0 1 0-1.171 0v.32h-1.617v-.32a.586.586 0 0 0-1.172 0v.32h-1.617v-.32a.586.586 0 1 0-1.172 0v.32H7.797v-.32a.586.586 0 0 0-1.172 0v.32H5.008v-.32a.586.586 0 0 0-1.171 0v.32H2.525A2.527 2.527 0 0 0 0 4.592v11.724a2.527 2.527 0 0 0 2.525 2.524h14.95A2.527 2.527 0 0 0 20 16.316V4.592a2.527 2.527 0 0 0-2.525-2.525Zm1.353 14.249c0 .746-.607 1.352-1.353 1.352H2.525a1.354 1.354 0 0 1-1.353-1.352V6.733h17.656v9.583Zm0-10.755H1.172v-.97c0-.745.607-1.352 1.353-1.352h1.312v.227a.586.586 0 0 0 1.171 0v-.227h1.617v.227a.586.586 0 0 0 1.172 0v-.227h1.617v.227a.586.586 0 0 0 1.172 0v-.227h1.617v.227a.586.586 0 0 0 1.172 0v-.227h1.617v.227a.586.586 0 1 0 1.171 0v-.227h1.312c.746 0 1.353.607 1.353 1.353v.969Z"
        />
        <path
          fill="#52555F"
          d="M6.532 7.981H4.22a.586.586 0 0 0-.586.586v2.393c0 .323.262.585.586.585h2.312a.586.586 0 0 0 .586-.585V8.567a.586.586 0 0 0-.586-.586Zm-.586 2.393h-1.14v-1.22h1.14v1.22ZM11.156 7.981H8.844a.586.586 0 0 0-.586.586v2.393c0 .323.262.585.586.585h2.312a.586.586 0 0 0 .586-.585V8.567a.586.586 0 0 0-.586-.586Zm-.586 2.393H9.43v-1.22h1.14v1.22ZM15.78 7.981h-2.312a.586.586 0 0 0-.586.586v2.393c0 .323.263.585.586.585h2.312a.586.586 0 0 0 .586-.585V8.567a.586.586 0 0 0-.586-.586Zm-.586 2.393h-1.14v-1.22h1.14v1.22ZM6.532 12.526H4.22a.586.586 0 0 0-.586.586v2.392c0 .324.262.586.586.586h2.312a.586.586 0 0 0 .586-.586v-2.392a.586.586 0 0 0-.586-.586Zm-.586 2.392h-1.14v-1.22h1.14v1.22ZM11.156 12.526H8.844a.586.586 0 0 0-.586.586v2.392c0 .324.262.586.586.586h2.312a.586.586 0 0 0 .586-.586v-2.392a.586.586 0 0 0-.586-.586Zm-.586 2.392H9.43v-1.22h1.14v1.22ZM15.78 12.526h-2.312a.586.586 0 0 0-.586.586v2.392c0 .324.263.586.586.586h2.312a.586.586 0 0 0 .586-.586v-2.392a.586.586 0 0 0-.586-.586Zm-.586 2.392h-1.14v-1.22h1.14v1.22Z"
        />
      </svg>

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
