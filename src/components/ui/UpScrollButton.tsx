import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';

const UpScrollButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mainElement = document.querySelector('main');

    const handleScroll = () => {
      if (mainElement && mainElement.scrollTop > 200) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
      return () => mainElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToTop = () => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className='fixed max-sm:bottom-22 bottom-10 opacity-70 hover:opacity-100 max-sm:right-5 right-10 bg-gray-400 text-white w-15 h-15 rounded-full flex items-center justify-center shadow-lg hover:brightness-90 transition'
    >
      <FaArrowUp className='text-xl' />
    </button>
  );
};

export default UpScrollButton;
