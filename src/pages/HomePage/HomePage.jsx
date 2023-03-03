import BalancePanel from 'components/BalancePanel/BalancePanel';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import scss from './HomePage.module.scss';
const Home = () => {
  return (
    <div className="main">
      <div className="containerMain">
        <BalancePanel />
        <div className="homeNav">
          <NavLink to="/expenses" className={scss.homeNavLink}>
            Expenses
          </NavLink>
          <NavLink to="/income" className={scss.homeNavLink}>
            Income
          </NavLink>
          <NavLink to="/reports" className={scss.homeNavLink}>
            Reports
          </NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default Home;
