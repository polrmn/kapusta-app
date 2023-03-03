import { Navigate, Route, Routes } from 'react-router-dom';
import { SharedLayout } from './SharedLayout/SharedLayout';
import Authorization from './auth/Authorization';
import { Expenses } from './Expenses/Expenses';
import Home from './../pages/HomePage/HomePage';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import PublicRoute from './PublicRoute/PublicRoute';
import { ExpensesReport } from './ExpensesReport/ExpensesReport';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserThunk } from 'redux/auth/authOperations';
import { Income } from './Income/Income';
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserThunk());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        {/* <Route path="/" element={<PublicRoute />}> */}
        {/*<Route path="/" element={<p>home</p>} />*/}
        {/*===================*/}
        <Route path="/" element={<PrivateRoute component={<Home />} />}>
          <Route path="expenses" element={<Expenses />} />
          <Route path="income" element={<Income />} />
          <Route path="reports" element={<ExpensesReport />} />
        </Route>
        <Route
          path="/login"
          element={<PublicRoute component={<Authorization type="login" />} />}
        />
        <Route
          path="/register"
          element={<PublicRoute component={<Authorization type="signup" />} />}
        />
        {/*===================*/}
        {/*<Route path="/login" element={<Authorization type="login" />} />*/}
        {/*<Route path="/register" element={<Authorization type="signup" />} />*/}
        {/*===================*/}
        {/* </Route> */}
        {/* <Route path="/" element={<PrivateRoute />}> */}
        <Route path="/" element={<Home />}>
          <Route path="expenses" element={<Expenses />} />
          {/* <Route path="income" element={<IncomeHome />} /> */}
        </Route>
        {/* <Route path="/reports">
          <Route path="expenses" element={<ExpensesReports />} />
          <Route path="income" element={<IncomeReports />} />
        </Route> */}
        {/* </Route> */}
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
