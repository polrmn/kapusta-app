import { Navigate, Route, Routes } from 'react-router-dom';
// import { PublicRoute } from './PublicRoute/PublicRoute';
import { SharedLayout } from './SharedLayout/SharedLayout';
import Authorization from './auth/Authorization';
import Summary from './Summary/Summary';

const App = () => {
  return (
    <>
      <Summary />
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          {/* <Route path="/" element={<PublicRoute />}> */}
          <Route path="/login" element={<Authorization type="login" />} />
          <Route path="/register" element={<Authorization type="signup" />} />
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
    </>
  );
};

export default App;
