import { useLocation } from 'react-router-dom';
import HomeHeader from './headers/HomeHeader';
import CoachingHeader from './headers/CoachingHeader';
import HistoryHeader from './headers/HistoryHeader';
import ReviewHeader from './headers/ReviewHeader';
import UserHeader from './headers/UserHeader';
import QuestionHeader from './headers/QuestionHeader';
import StatisticsHeader from './headers/StatisticsHeader';

const MobileHeader = () => {
  const location = useLocation();

  const renderHeader = () => {
    if (location.pathname === '/home') return <HomeHeader />;
    if (location.pathname.startsWith('/coaching')) return <CoachingHeader />;
    if (location.pathname.startsWith('/history')) return <HistoryHeader />;
    if (
      location.pathname.startsWith('/review') &&
      !location.pathname.startsWith('/review-management')
    )
      return <ReviewHeader />;
    if (
      location.pathname.startsWith('/history') &&
      !location.pathname.startsWith('/history-management')
    )
      return <HistoryHeader />;
    if (location.pathname.startsWith('/review')) return <ReviewHeader />;
    if (location.pathname.startsWith('/user-management')) return <UserHeader />;
    if (location.pathname.startsWith('/question')) return <QuestionHeader />;
    if (location.pathname.startsWith('/statistics')) return <StatisticsHeader />;
  };

  return <header className='bg-black sm:hidden'>{renderHeader()}</header>;
};

export default MobileHeader;
