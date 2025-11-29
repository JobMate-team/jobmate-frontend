import { ShiningIcon } from '@/assets';
import Button from './common/Button';

const Example = () => {
  return (
    <Button
      type='button'
      icon={<ShiningIcon className='h-5 w-5' />}
      className='border-[0.5px] border-gray-400'
    >
      테스트
    </Button>
  );
};

export default Example;
