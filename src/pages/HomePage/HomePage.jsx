import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import scss from './Expenses.module.scss';

export const Home = () => {
  return (
    <>
      <div className={scss.homeNav}>
        <NavLink className={scss.homeNavLink}>Expenses</NavLink>
        <NavLink className={scss.homeNavLink}>Income</NavLink>
      </div>
      <Outlet />
    </>
  );
};
