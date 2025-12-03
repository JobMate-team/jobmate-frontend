import { useLocation } from 'react-router-dom';
import HomeHeader from './headers/HomeHeader';
import CoachingHeader from './headers/CoachingHeader';

const MobileHeader = () => {
  const location = useLocation();

  const renderHeader = () => {
    if (location.pathname === '/') return <HomeHeader />;
    if (location.pathname.startsWith('/coaching')) return <CoachingHeader />;
  };

  return <header className='bg-black sm:hidden'>{renderHeader()}</header>;
};

export default MobileHeader;
