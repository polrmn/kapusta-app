import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { loginThunk, signUpThunk } from '../../redux/auth/authOperations';
import style from './Authorization.module.scss'

const AuthorizationForm = ({ type }) => {
  const formType = { SIGNUP: 'signup', LOGIN: 'login' };
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      switch (type) {
        case formType.LOGIN:
          dispatch(loginThunk(values));
          break;
        case formType.SIGNUP:
          dispatch(signUpThunk(values));
          break;
        default:
          return null;
      }
    },
  });
  return (
    <form className={style.form} onSubmit={formik.handleSubmit}>
      <label htmlFor='email'><span>*</span>Email:</label>
      <input
        id='email'
        name='email'
        type='email'
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <label htmlFor='password'><span>*</span>Password</label>
      <input
        id='password'
        name='password'
        type='text'
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default AuthorizationForm;
