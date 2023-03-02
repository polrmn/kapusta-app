import BalancePanel from 'components/BalancePanel/BalancePanel';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="homeNav">
        <NavLink to="/expenses" className="homeNavLink">
          Expenses
        </NavLink>
        <NavLink to="/income" className="homeNavLink">
          Income
        </NavLink>
        <NavLink to="/reports" className="homeNavLink">
          Reports
        </NavLink>
      </div>
      <BalancePanel/>
      <Outlet />
    </>
  );
};
export default Home;
