import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import css from './sharedLayout.module.scss';
import { ReactComponent as ReactLogo } from '../../images/logo-header.svg';
import { ModalContext } from 'context/ ModalContext';

export const SharedLayout = () => {
  const [, setOpen] = useContext(ModalContext);
  const handleOpenModal = () => {
    setOpen(true);
  };
  return (
    <>
      <header className={css.header}>
        <div className={css.container}>
          <div className={css.containerHeader}>
            <div className={css.logo}>
              <Link to="/home" className={css.headerLogo}>
                <ReactLogo />
              </Link>
            </div>
            <div className={css.headerExit}>
              <span className={css.headerUserLetter}>L</span>
              <p className={css.headerUser}>Lika</p>
              <button
                className={css.headerButtonLogout}
                onClick={handleOpenModal}
              >
                Exit
              </button>
            </div>
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
