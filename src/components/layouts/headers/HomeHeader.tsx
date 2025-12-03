const HomeHeader = () => {
  return (
    <div className='flex justify-between items-center px-4 py-3'>
      <h3 className='text-white text-2xl font-semibold'>JobMate.AI</h3>
      <button
        type='button'
        className='w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-lg text-gray-500'
      >
        정
      </button>
    </div>
  );
};

export default HomeHeader;
