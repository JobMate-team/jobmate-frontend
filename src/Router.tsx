import { createBrowserRouter } from 'react-router-dom';
import Hompage from './pages/Hompage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Hompage />,
  },
]);

export default router;
