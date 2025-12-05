import { FaArrowUp } from 'react-icons/fa6';

const UpScrollButton = () => {
  const scrollToTop = () => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <button
      onClick={scrollToTop}
      className='fixed max-sm:bottom-22 bottom-10 max-sm:right-5 right-10 bg-black/40 text-white w-15 h-15 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-500 transition'
    >
      <FaArrowUp className='text-xl' />
    </button>
  );
};

export default UpScrollButton;
