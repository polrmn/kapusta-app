import React from 'react';
import style from './Authorization.module.scss';
import AuthorizationForm from './AuthorizationForm';

const Authorization = ({ type }) => {
  return (
    <div className={style.authContainer}>
      <div className={style.authSectionLogo} />
      <AuthorizationForm type={type} />
    </div>
  );
};

export default Authorization;
