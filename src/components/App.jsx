import { ModalContextProvider } from 'context/ ModalContext';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { RegisterPage } from 'pages/RegisterPage/RegisterPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ModalHeader } from './ModalHeader/ModalHeader';
// import { PublicRoute } from './PublicRoute/PublicRoute';
import { SharedLayout } from './SharedLayout/SharedLayout';
import Authorization from './auth/Authorization';

const App = () => {
  return (
    <ModalContextProvider>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          {/* <Route path="/" element={<PublicRoute />}> */}
          <Route path="/login" element={<Authorization type='login'/>} />
          <Route path="/register" element={<Authorization type='signup' />} />
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
      {/*<ModalHeader />*/}
    </ModalContextProvider>
  );
};

export default App;
