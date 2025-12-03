import { FiCalendar } from 'react-icons/fi';

const HistoryPage = () => {
  return (
    <div className='space-y-5 relative pb-30'>
      <div className='hidden sm:flex flex-col my-10'>
        <h3 className='text-2xl font-semibold mb-2'>히스토리</h3>
        <p className='text-[#717182] mb-6'>과거 연습 기록을 확인하고 발전 과정을 추적하세요</p>
      </div>

      <div className='bg-white rounded-xl px-6 py-5 border border-[#E5E5E5] flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <div className='bg-black text-white text-xs font-medium p-1 px-4 border border-[#E5E5E5] rounded-lg'>
            협업
          </div>
          <p className='text-[#6A7282] font-medium flex items-center gap-1'>
            <FiCalendar size={18} />
            오늘
          </p>
        </div>
        <p>코드 리뷰에서 가장 중요하게 생각하는 것은?</p>
      </div>
    </div>
  );
};

export default HistoryPage;
