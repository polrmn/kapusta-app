import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoute = () => {
  const token = useSelector(/*Select token */);

  return token ? <Navigate to="/home" /> : <Outlet />;
};
