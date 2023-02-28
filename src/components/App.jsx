import Button from 'commons/Button';
import Authorization from './auth/Authorization';

const App = () => {
  return (
    <>
      <Authorization />
      <Button active={true} content={'log in'} />
      <Button active={false} content={'registration'} />
    </>
  );
};

export default App;
