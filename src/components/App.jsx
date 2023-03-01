import { Navigate, Route, Routes } from 'react-router-dom';
// import { PublicRoute } from './PublicRoute/PublicRoute';
import { SharedLayout } from './SharedLayout/SharedLayout';
import Authorization from './auth/Authorization';
import { Expenses } from './Expenses/Expenses';
import Home from './../pages/HomePage/HomePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        {/* <Route path="/" element={<PublicRoute />}> */}
        <Route path="/login" element={<Authorization type="login" />} />
        <Route path="/register" element={<Authorization type="signup" />} />
        {/* </Route> */}
        {/* <Route path="/" element={<PrivateRoute />}> */}
        <Route path="/home" element={<Home />}>
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
