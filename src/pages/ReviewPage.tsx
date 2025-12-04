import Button from '@/components/common/Button';
import { FiCalendar } from 'react-icons/fi';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { IoBusinessSharp } from 'react-icons/io5';
import { LuBriefcaseBusiness } from 'react-icons/lu';
import { ChevronDown } from 'lucide-react';

const mockReviewData = [
  {
    id: 1,
    user: '정찬원',
    date: '오늘',
    company: '네이버',
    job: '서비스 기획',
    review:
      '1차 인성면접, 2차 직무면접, 3차 임원면접으로 진행되었습니다. 인성면접에서는 자기소개와 지원동기를 중점적으로 물어보셨고, 직무면접에서는 포트폴리오 기반 질문이 많았습니다.',
    tip: '코드 컨벤션을 지켰는지 확인하면서 리뷰를 하는 것이 가장 중요하다고 생각합니다. 왜냐하면 중요하다고 생각하기 때문입니다. 코드 컨벤션을 지켰는지 확인하면서 리뷰를 하는 것이 가장 중요하다고 생각합니다. 왜냐하면 중요하다고 생각하기 때문입니다.',
  },
  {
    id: 2,
    user: '이예나',
    date: '25.10.27',
    company: '카카오',
    job: '프론트엔드 개발',
    review:
      '1차 인성면접, 2차 직무면접, 3차 임원면접으로 진행되었습니다. 인성면접에서는 자기소개와 지원동기를 중점적으로 물어보셨고, 직무면접에서는 포트폴리오 기반 질문이 많았습니다.',
    tip: '없는데요? 왜 물어보세요 그런거',
  },
  {
    id: 3,
    user: '김서진',
    date: '24.9.10',
    company: '쿠팡',
    job: 'PM',
    review:
      '1차 인성면접, 2차 직무면접, 3차 임원면접으로 진행되었습니다. 인성면접에서는 자기소개와 지원동기를 중점적으로 물어보셨고, 직무면접에서는 포트폴리오 기반 질문이 많았습니다.',
    tip: '저는 개인적으로 고양이 발이 더 좋습니다. 고양이 발바닥을 보시면 핑크색 젤리가 있는데 그게 참 야무지거든요.',
  },
];

const ReviewPage = () => {
  const navigate = useNavigate();

  return (
    <div className='space-y-5 relative pb-30 '>
      <div className='hidden sm:flex items-center justify-between'>
        <div className='flex flex-col mt-10'>
          <h3 className='text-2xl font-semibold mb-2'>면접 후기</h3>
          <p className='text-[#717182] mb-6'>
            면접 경험을 공유하고 다른 취준생들이 남긴 후기에서 인사이트를 얻어보세요
          </p>
        </div>
        <Button
          type='button'
          className='bg-black text-white font-medium text-sm px-2.5 py-2 border border-[#E5E5E5] whitespace-nowrap'
        >
          <FaPlus size={16} />
          후기 작성
        </Button>
      </div>

      {mockReviewData.map((data) => (
        <div
          key={data.id}
          className='bg-white rounded-xl px-6 py-5 border border-[#E5E5E5] flex flex-col gap-4'
        >
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full bg-black flex items-center justify-center font-medium text-lg text-white'>
              {data.user.charAt(0)}
            </div>
            <div>
              <p className='text-lg font-medium'>{data.user}</p>
              <p className='text-[#6A7282] text-sm flex items-center gap-1'>
                <FiCalendar size={16} />
                {data.date}
              </p>
            </div>
          </div>

          <div className='flex items-center gap-2 mb-1'>
            <div className='flex items-center text-xs border border-[#E5E5E5] rounded-lg p-1 px-2 gap-1'>
              <IoBusinessSharp size={14} />
              {data.company}
            </div>
            <div className='flex items-center text-xs border border-[#E5E5E5] rounded-lg p-1 px-2 gap-1'>
              <LuBriefcaseBusiness size={14} />
              {data.job}
            </div>
          </div>

          <p className='text-[#364153] leading-6 line-clamp-4'>{data.review}</p>
          <div className='flex items-center justify-center'>
            <button
              type='button'
              onClick={() => navigate('/review/create')}
              className='flex flex-row items-center gap-1 mt-1 cursor-pointer outline-none hover:text-[#585858]'
            >
              <ChevronDown size={20} />
              <span className='text-sm font-medium'>더보기</span>
            </button>
          </div>
        </div>
      ))}

      <Outlet />
    </div>
  );
};

export default ReviewPage;
