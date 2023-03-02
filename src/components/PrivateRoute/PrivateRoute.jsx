import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLogin } from '../../redux/auth/authSelectors';

const PrivateRoute = ({ component }) => {
  const isLogin = useSelector(getIsLogin);
  return isLogin ? component : <Navigate to={'/login'} />;
};

export default PrivateRoute;
