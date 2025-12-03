import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Example from './components/Example';
import Homepage from './pages/Homepage';
import OnboardingPage from './pages/OnboardingPage';
import LoginPage from './pages/LoginPage';
import SelectRolePage from './pages/SelectRolePage';
import ErrorPage from './pages/ErrorPage';
import AppLayout from './layouts/AppLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Homepage />,
          },
        ],
      },
      {
        path: 'example',
        element: <Example />,
      },
      {
        path: 'onboarding',
        element: <OnboardingPage />,
      },
      {
        path: 'signin',
        element: <LoginPage />,
      },
      {
        path: 'role',
        element: <SelectRolePage />,
      },
    ],
  },
]);

export default router;
