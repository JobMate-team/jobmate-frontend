import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Example from './components/Example';
import Homepage from './pages/Homepage';
import OnboardingPage from './pages/OnboardingPage';
import LoginPage from './pages/LoginPage';
import SelectRolePage from './pages/SelectRolePage';
import ErrorPage from './pages/ErrorPage';
import AppLayout from './layouts/AppLayout';
import CoachingPage from './pages/CoachingPage';
import HistoryPage from './pages/HistoryPage';
import ReviewPage from './pages/ReviewPage';
import MyPage from './pages/MyPage';

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
          {
            path: 'coaching',
            element: <CoachingPage />,
          },
          {
            path: 'history',
            element: <HistoryPage />,
          },
          {
            path: 'review',
            element: <ReviewPage />,
          },
          {
            path: 'my',
            element: <MyPage />,
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
