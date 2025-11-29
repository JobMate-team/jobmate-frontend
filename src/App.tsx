import { Outlet } from 'react-router-dom';
import Toast from './components/common/Toast';

function App() {
  return (
    <>
      <Outlet />
      <Toast />
    </>
  );
}

export default App;
