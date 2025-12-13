import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import OnboardingPage from './pages/Onboarding/OnboardingPage';
import LoginPage from './pages/Login/LoginPage';
import SelectRolePage from './pages/Onboarding/SelectRolePage';
import ErrorPage from './pages/ErrorPage';
import AppLayout from './layouts/AppLayout';
import CoachingPage from './pages/Coaching/CoachingPage';
import HistoryPage from './pages/History/HistoryPage';
import HistoryDetailPage from './pages/History/HistoryDetailPage';
import ReviewPage from './pages/Review/ReviewPage';
import MyPage from './pages/User/MyPage';
import ReviewAddPage from './pages/Review/ReviewAddPage';
import ReviewEditPage from './pages/Review/ReviewEditPage';
import UserManagementPage from './pages/User/UserManagementPage';
import QuestionManagementPage from './pages/Question/QuestionManagementPage';
import StatisticsPage from './pages/Statistic/StatisticsPage';
import KakaoSuccessPage from './pages/Login/kakaoSuccessPage';
import ReviewManagementPage from './pages/Review/ReviewManagementPage';
import HistoryManagementPage from './pages/History/HistoryManagementPage';
import PublicLayout from './layouts/PublicLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            index: true,
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
      {
        element: <AppLayout />,
        children: [
          {
            path: '/home',
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
                path: 'edit/:id',
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
            children: [
              {
                path: 'my',
                element: <MyPage />,
              },
            ],
          },
          {
            path: 'question',
            element: <QuestionManagementPage />,
            children: [
              {
                path: 'my',
                element: <MyPage />,
              },
            ],
          },
          {
            path: 'statistics',
            element: <StatisticsPage />,
            children: [
              {
                path: 'my',
                element: <MyPage />,
              },
            ],
          },
          {
            path: 'review-management',
            element: <ReviewManagementPage />,
            children: [
              {
                path: 'my',
                element: <MyPage />,
              },
            ],
          },
          {
            path: 'history-management',
            element: <HistoryManagementPage />,
            children: [
              {
                path: 'my',
                element: <MyPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
