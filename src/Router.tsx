import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Example from './components/Example';
import Hompage from './pages/Hompage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Hompage />,
      },
      {
        path: 'example',
        element: <Example />,
      },
    ],
  },
]);

export default router;
