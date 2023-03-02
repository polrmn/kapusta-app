import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="homeNav">
        <NavLink className="homeNavLink">Expenses</NavLink>
        <NavLink className="homeNavLink">Income</NavLink>
      </div>
      <Outlet />
    </>
  );
};
export default Home;
