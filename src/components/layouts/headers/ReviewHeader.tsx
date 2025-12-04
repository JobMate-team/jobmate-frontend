import { isModalOpenAtom } from '@/atoms';
import Button from '@/components/common/Button';
import { useSetAtom } from 'jotai';
import { FaPlus } from 'react-icons/fa6';

const ReviewHeader = () => {
  const setIsModalOpen = useSetAtom(isModalOpenAtom);

  return (
    <div className='flex justify-between items-center p-6'>
      <div className='text-white'>
        <h3 className='text-xl font-semibold mb-1'>면접 후기</h3>
        <p className='text-lg'>합격자들의 경험 공유</p>
      </div>

      <Button
        type='button'
        className='bg-white font-medium text-sm px-2.5 py-2 border border-[#E5E5E5]'
        onClick={() => setIsModalOpen((prev) => !prev)}
      >
        <FaPlus size={14} />
        후기 작성
      </Button>
    </div>
  );
};

export default ReviewHeader;
