import { useMediaQuery } from '@mui/material';
import BalancePanel from 'components/BalancePanel/BalancePanel';
import React, { useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import scss from './HomePage.module.scss';
const Home = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const isScreenTablet = useMediaQuery('(min-width: 767.9px)');

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/expenses');
    }
  }, [location, navigate]);

  return (
    <div className="main">
      <div className="containerMain">
        <BalancePanel />
        {location.pathname !== '/reports' && isScreenTablet &&
        <div className="homeNav">
          <NavLink to="/expenses" className={scss.homeNavLink}>
            Expenses
          </NavLink>
          <NavLink to="/income" className={scss.homeNavLink}>
            Income
          </NavLink>
        </div>
        }
        <Outlet />
      </div>
    </div>
  );
};
export default Home;
