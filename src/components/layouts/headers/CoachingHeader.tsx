import { pageAtom } from '@/atoms';
import { coachStep } from '@/data/coachItems';
import clsx from 'clsx';
import { useAtomValue } from 'jotai';

const CoachingHeader = () => {
  const page = useAtomValue(pageAtom);

  return (
    <div className='flex flex-col p-6'>
      <h3 className='text-white text-xl font-semibold mb-2'>면접 코칭</h3>
      <div className='flex gap-3'>
        {coachStep.map((step) => (
          <div
            key={step.id}
            className={clsx(
              'rounded-lg text-xs font-medium px-2 py-1',
              page === step.id ? 'bg-white text-black' : 'bg-[#D1D1D1]',
            )}
          >
            {step.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoachingHeader;
