import { ModalContextProvider } from 'context/ ModalContext';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { RegisterPage } from 'pages/RegisterPage/RegisterPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ModalHeader } from './ModalHeader/ModalHeader';
// import { PublicRoute } from './PublicRoute/PublicRoute';
import { SharedLayout } from './SharedLayout/SharedLayout';
import BalancePanel from './BalancePanel/BalancePanel';

const App = () => {
  return (
    <ModalContextProvider>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          {/* <Route path="/" element={<PublicRoute />}> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
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
      <ModalHeader />
      <BalancePanel />
    </ModalContextProvider>
  );
};

export default App;
