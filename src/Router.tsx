import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Example from './components/Example';
import Homepage from './pages/Homepage';
import OnboardingPage from './pages/OnboardingPage';
import LoginPage from './pages/LoginPage';
import SelectRolePage from './pages/SelectRolePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
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
