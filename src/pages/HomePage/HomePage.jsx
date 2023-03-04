import BalancePanel from 'components/BalancePanel/BalancePanel';
import React, { useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import scss from './HomePage.module.scss';
const Home = () => {
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/expenses');
    }
  }, [location]);

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
          {/* <NavLink to="/reports" className={scss.homeNavLink}>
            Reports
          </NavLink> */}
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default Home;
