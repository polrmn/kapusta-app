import React from 'react';
import { Outlet } from 'react-router-dom';
import css from './sharedLayout.module.scss';
import { ReactComponent as ReactLogo } from '../../images/logo-header.svg';

export const SharedLayout = () => {
  return (
    <>
      <header className={css.header}>
        <div className={css.container}>
          <div className={css.logo}>
            <a href="#" className={css.headerLogo}>
              <ReactLogo />
            </a>
          </div>
        </div>
      </header>
      <main>
        <div className={css.container}>
          <Outlet />
        </div>
      </main>
    </>
  );
};
