import { Navigate, Route, Routes } from 'react-router-dom';
import { SharedLayout } from './SharedLayout/SharedLayout';
import Authorization from './auth/Authorization';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import PublicRoute from './PublicRoute/PublicRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        {/* <Route path="/" element={<PublicRoute />}> */}
        {/*<Route path="/" element={<p>home</p>} />*/}
        {/*===================*/}
        <Route path="/" element={<PrivateRoute component={<p>home</p>}/>} />
        <Route path="/login" element={<PublicRoute component={<Authorization type="login" />}/>} />
        <Route path="/register" element={<PublicRoute component={<Authorization type="signup" />}/>} />
        {/*===================*/}
        {/*<Route path="/login" element={<Authorization type="login" />} />*/}
        {/*<Route path="/register" element={<Authorization type="signup" />} />*/}
        {/*===================*/}
        {/* </Route> */}
        {/* <Route path="/" element={<PrivateRoute />}> */}
        {/* <Route path="/home">
          <Route path="expenses" element={<ExpensesHome />} />
          <Route path="income" element={<IncomeHome />} />
        </Route>
        <Route path="/reports">
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
