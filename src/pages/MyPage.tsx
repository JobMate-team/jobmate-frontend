import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className='fixed inset-0 bg-black/40 flex justify-center items-center'
      onClick={() => {
        navigate(-1);
      }}
    >
      <div className='bg-white rounded-[10px] flex flex-col overflow-y-auto px-5 py-8 space-y-3 w-100 max-h-[60vh] hide-scrollbar'>
        123
      </div>
    </div>
  );
};

export default MyPage;
