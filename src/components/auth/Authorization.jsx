import React from 'react';
import style from './Authorization.module.scss';
import AuthorizationForm from './AuthorizationForm';

const Authorization = () => {
  return (
    <div className={style.authContainer}>
      <div className={style.authSectionLogo} />
      <AuthorizationForm type='login'/>
    </div>
  );
};

export default Authorization;
