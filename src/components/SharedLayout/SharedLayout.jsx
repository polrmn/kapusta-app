import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import css from './sharedLayout.module.scss';
import { ReactComponent as ReactLogo } from '../../images/logo-header.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk } from '../../redux/auth/authOperations';
import ModalHeader from '../ModalHeader/ModalHeader';
import { setAuthHeader, privateAPI } from '../../services/http/http';

import {
  getAccessToken,
  getIsLogin,
  getUserEmail,
} from '../../redux/auth/authSelectors';

export const SharedLayout = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const email = useSelector(getUserEmail);
  const isLogin = useSelector(getIsLogin);
  const token = useSelector(getAccessToken);
  const closeModalHandler = () => setOpenModal(!openModal);
  const logoutConfirmHandler = () => {
    dispatch(logoutThunk());
    setOpenModal(!openModal);
  };
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  useEffect(() => {
    if (token) {
      setAuthHeader(token);
    }
  }, [token]);

  return (
    <>
      <header className={css.header}>
        {openModal && (
          <ModalHeader
            closeModalHandler={closeModalHandler}
            logoutConfirmHandler={logoutConfirmHandler}
          />
        )}
        <div className="container">
          <div className={css.containerHeader}>
            <div className={css.logo}>
              <Link to="/home" className={css.headerLogo}>
                <ReactLogo />
              </Link>
            </div>
            {isLogin && (
              <div className={css.headerExit}>
                <span className={css.headerUserLetter}>
                  {email[0].toUpperCase()}
                </span>
                <p className={css.headerUser}>{email}</p>
                <button
                  className={css.headerButtonLogout}
                  onClick={handleOpenModal}
                >
                  Exit
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
