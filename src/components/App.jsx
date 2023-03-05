import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { SharedLayout } from './SharedLayout/SharedLayout';
import Authorization from '../pages/Autorization/Authorization';
import { Expenses } from './Expenses/Expenses';
import Home from './../pages/HomePage/HomePage';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import PublicRoute from './PublicRoute/PublicRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserThunk } from 'redux/auth/authOperations';
import { getAccessToken, getIsLogin } from '../redux/auth/authSelectors';
import { googleAuth } from '../helpers/googleAuth';
import { ReportPage } from 'pages/ReportPage/ReportPage';
import { Income } from './Income/Income';
import { getExpense, getExpenseCategoriesThunk, getIncome, getIncomeCategoriesThunk } from 'redux/transaction/transactionOperations';
const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(getAccessToken);
  const isLogin = useSelector(getIsLogin)
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    token && dispatch(getUserThunk()).unwrap().then(()=>{
      dispatch(getExpenseCategoriesThunk());
      dispatch(getIncomeCategoriesThunk());
      dispatch(getIncome());
      dispatch(getExpense());
      }
    );
    googleAuth(token, searchParams, dispatch, navigate);
    // eslint-disable-next-line
  }, [token]);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/" element={<PrivateRoute component={<Home />} />}>
          <Route path="expenses" element={<Expenses />} />
          <Route path="income" element={<Income />} />
          <Route path="reports" element={<ReportPage />} />
        </Route>
        <Route
          path="/login"
          element={<PublicRoute component={<Authorization type="login" />} />}
        />
        <Route
          path="/register"
          element={<PublicRoute component={<Authorization type="signup" />} />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
