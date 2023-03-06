import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginThunk, signUpThunk } from '../../redux/auth/authOperations';
import style from './Authorization.module.scss';
import SharedButton from '../../commons/sharedButton/SharedButton';
import { validate } from '../../helpers/authValidate';
import { getIsLogin } from '../../redux/auth/authSelectors';

const AuthorizationForm = ({ type }) => {

  const formType = { SIGNUP: 'signup', LOGIN: 'login' };
  const { pathname } = useLocation();
  const isLogin = useSelector(getIsLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginButtonHandler = () => navigate('/login');
  const registerButtonHandler = () => navigate('/register');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: values => {

      switch (type) {
        case formType.LOGIN:
          dispatch(loginThunk(values)).unwrap().then(() => formik.resetForm());
          break;
        case formType.SIGNUP:
          dispatch(signUpThunk(values)).unwrap().then(() => formik.resetForm());
          break;
        default:
          return null;
      }
    },
  });
  return (
    <div className={style.authFormWrapper}>
      <div className={style.authNavButtonWrapper}>
        <SharedButton className={style.loginNavButton} onClick={loginButtonHandler} active={pathname === '/login'}>
          LOG IN</SharedButton>
        <SharedButton onClick={registerButtonHandler} active={pathname === '/register'}>REGISTRATION</SharedButton>
      </div>
      {type === formType.LOGIN && <div className={style.loginWithGoogleWrapper}>
        <span className={style.authFormSubText}>You can log in with your Google Account:</span>
        <a href='https://kapusta-backend.goit.global/auth/google'>
          <SharedButton className={style.loginWithGoogleButton} type='button'>
            <div className={style.googleLogo} />
            GOOGLE</SharedButton>
        </a>
        <span className={style.authFormSubText}>Or log in using an email and password</span>
      </div>}
      {type === formType.SIGNUP &&
        <span className={style.authFormSubText}>You can sign up with your email and password:</span>}
      <form className={style.authForm} onSubmit={formik.handleSubmit}>
        <label htmlFor='email'><span>*</span>Email:</label>
        <input
          onBlur={formik.handleBlur}
          className={style.authInput}
          placeholder='Your@email.com'
          id='email'
          name='email'
          type='email'
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email &&
          <p className={style.requiredText}>{formik.errors.email}</p>}
        <label htmlFor='password'><span>*</span>Password</label>
        <input
          onBlur={formik.handleBlur}
          className={style.authInput}
          placeholder='Password'
          id='password'
          name='password'
          type='password'
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password &&
          <p className={style.requiredText}>{formik.errors.password}</p>}
        <SharedButton disabled={isLogin} className={style.authFormSubmitButton} type='submit'
                      active={true}>{type === formType.LOGIN ? 'LOGIN' : 'JOIN'}</SharedButton>
      </form>
    </div>
  );
};

export default AuthorizationForm;
