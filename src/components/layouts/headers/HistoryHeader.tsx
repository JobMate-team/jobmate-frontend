import { isAdminModeAtom, isModalOpenAtom } from '@/atoms';
import Button from '@/components/common/Button';
import { useAtomValue, useSetAtom } from 'jotai';
import { FaRegTrashAlt } from 'react-icons/fa';

const HistoryHeader = () => {
  const setIsModalOpen = useSetAtom(isModalOpenAtom);
  const isAdminMode = useAtomValue(isAdminModeAtom);

  return (
    <div className='flex justify-between items-center p-6'>
      <div className='text-white'>
        <h3 className='text-xl font-semibold mb-2'>히스토리</h3>
        <p className='text-gray-300'>
          {isAdminMode ? '사용자들의 면접 연습 기록을 관리합니다' : '내 답변 기록'}
        </p>
      </div>

      {!isAdminMode && (
        <Button
          type='button'
          className='bg-white font-medium text-sm px-2.5 py-2 border border-[#E5E5E5]'
          onClick={() => setIsModalOpen((prev) => !prev)}
        >
          <FaRegTrashAlt size={16} />
          전체 삭제
        </Button>
      )}
    </div>
  );
};

export default HistoryHeader;
