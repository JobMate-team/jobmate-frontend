import { isAdminModeAtom } from '@/atoms';
import Button from '@/components/common/Button';
import { useAtomValue } from 'jotai';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const ReviewHeader = () => {
  const navigate = useNavigate();
  const isAdminMode = useAtomValue(isAdminModeAtom);

  return (
    <div className='flex justify-between items-center p-6'>
      <div className='text-white'>
        <h3 className='text-xl font-semibold mb-2'>면접 후기</h3>
        <p className='text-gray-300'>
          {isAdminMode ? '사용자가 작성한 면접 후기를 관리합니다' : '합격자들의 경험 공유'}
        </p>
      </div>

      {!isAdminMode && (
        <Button
          type='button'
          className='bg-white font-medium text-sm px-2.5 py-2 border border-[#E5E5E5]'
          onClick={() => navigate('/review/create')}
        >
          <FaPlus size={14} />
          후기 작성
        </Button>
      )}
    </div>
  );
};

export default ReviewHeader;
