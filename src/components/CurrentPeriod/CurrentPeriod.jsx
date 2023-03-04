import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import css from './current-period.module.scss';

export const CurrentPeriod = () => {
  const [startDate, setStartDate] = useState(new Date());

  const handleClick = date => {
    Date.isLeapYear = function (year) {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };
    Date.getDaysInMonth = function (year, month) {
      return [
        31,
        Date.isLeapYear(year) ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
      ][month];
    };

    // eslint-disable-next-line no-extend-native
    Date.prototype.isLeapYear = function () {
      return Date.isLeapYear(this.getFullYear());
    };

    // eslint-disable-next-line no-extend-native
    Date.prototype.getDaysInMonth = function () {
      return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
    };

    // eslint-disable-next-line no-extend-native
    Date.prototype.addMonths = function (value) {
      var n = this.getDate();
      this.setDate(1);
      this.setMonth(this.getMonth() + value);
      this.setDate(Math.min(n, this.getDaysInMonth()));
      return this;
    };
    const myDate = new Date(startDate);
    const result1 = myDate.addMonths(date);

    return result1;
  };

  const handleMonthMinus = () => {
    setStartDate(handleClick(-1));
  };

  const handleMonthPlus = () => {
    setStartDate(handleClick(1));
  };

  return (
    <div className={css['calendarWrapper']}>
      <button
        className={css.currentDateButtonLeft}
        onClick={handleMonthMinus}
      ></button>

      <DatePicker
        className={css.currentDate}
        selected={startDate}
        onChange={date => setStartDate(date)}
        dateFormat="MMMM yyyy"
        showMonthYearPicker
      />

      <button
        className={css.currentDateButtonRight}
        onClick={handleMonthPlus}
      ></button>
    </div>
  );
};
