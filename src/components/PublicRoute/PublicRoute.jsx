import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getIsLogin } from '../../redux/auth/authSelectors';
// export const getIsLogin = state => state.auth.isLogin;
export const PublicRoute = () => {
  const isLogin = useSelector(getIsLogin);

  return isLogin ? <Navigate to="/home" /> : <Outlet />;
};
