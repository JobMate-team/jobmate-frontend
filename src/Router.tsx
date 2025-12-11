import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import OnboardingPage from './pages/OnboardingPage';
import LoginPage from './pages/LoginPage';
import SelectRolePage from './pages/SelectRolePage';
import ErrorPage from './pages/ErrorPage';
import AppLayout from './layouts/AppLayout';
import CoachingPage from './pages/CoachingPage';
import HistoryPage from './pages/HistoryPage';
import HistoryDetailPage from './pages/HistoryDetailPage';
import ReviewPage from './pages/ReviewPage';
import MyPage from './pages/MyPage';
import ReviewAddPage from './pages/ReviewAddPage';
import ReviewEditPage from './pages/ReviewEditPage';
import UserManagementPage from './pages/UserManagementPage';
import QuestionManagementPage from './pages/QuestionManagementPage';
import StatisticsPage from './pages/StatisticsPage';
import KakaoSuccessPage from './pages/KakaoSuccessPage';

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
            path: '/',
            element: <HomePage />,
            children: [
              {
                path: 'my',
                element: <MyPage />,
              },
            ],
          },
          {
            path: 'coaching',
            element: <CoachingPage />,
            children: [
              {
                path: 'my',
                element: <MyPage />,
              },
            ],
          },
          {
            path: 'history',
            element: <HistoryPage />,
            children: [
              {
                path: ':id',
                element: <HistoryDetailPage />,
              },
              {
                path: 'my',
                element: <MyPage />,
              },
            ],
          },
          {
            path: 'review',
            element: <ReviewPage />,
            children: [
              {
                path: 'create',
                element: <ReviewAddPage />,
              },
              {
                path: 'edit',
                element: <ReviewEditPage />,
              },
              {
                path: 'my',
                element: <MyPage />,
              },
            ],
          },
          {
            path: 'user-management',
            element: <UserManagementPage />,
          },
          {
            path: 'question',
            element: <QuestionManagementPage />,
          },
          {
            path: 'statistics',
            element: <StatisticsPage />,
          },
        ],
      },
      {
        path: 'onboarding',
        element: <OnboardingPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'role',
        element: <SelectRolePage />,
      },
      {
        path: '/kakao/success',
        element: <KakaoSuccessPage />,
      },
    ],
  },
]);

export default router;
