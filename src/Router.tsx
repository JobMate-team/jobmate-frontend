import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Example from './components/Example';
import Homepage from './pages/Homepage';
import OnboardingPage from './pages/OnboardingPage';

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
    ],
  },
]);

export default router;
