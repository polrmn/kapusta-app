// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate, Outlet } from 'react-router-dom';
// import { getIsLogin } from '../../redux/auth/authSelectors';
// // export const getIsLogin = state => state.auth.isLogin;
// export const PublicRoute = () => {
//   const isLogin = useSelector(getIsLogin);
//
//   return isLogin ? <Navigate to="/home" /> : <Outlet />;
// };

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLogin } from '../../redux/auth/authSelectors';


const PublicRoute = ({ component }) => {
  const isLogin = useSelector(getIsLogin);
  return isLogin ? <Navigate to={'/home'} /> : component;
};

export default PublicRoute;





