import { useLocation } from 'react-router-dom';
import HomeHeader from './headers/HomeHeader';
import CoachingHeader from './headers/CoachingHeader';
import HistoryHeader from './headers/HistoryHeader';

const MobileHeader = () => {
  const location = useLocation();

  const renderHeader = () => {
    if (location.pathname === '/') return <HomeHeader />;
    if (location.pathname.startsWith('/coaching')) return <CoachingHeader />;
    if (location.pathname.startsWith('/history')) return <HistoryHeader />;
  };

  return <header className='bg-black sm:hidden'>{renderHeader()}</header>;
};

export default MobileHeader;
