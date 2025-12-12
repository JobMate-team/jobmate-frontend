import { coachStep } from '@/data/coachItems';
import clsx from 'clsx';

const CoachStepHeader = ({ page }: { page: number }) => {
  return (
    <div className='flex gap-3'>
      {coachStep.map((step) => (
        <div
          key={step.id}
          className={clsx(
            'rounded-lg max-sm:text-xs font-medium px-2 sm:px-3 py-1 sm:py-2',
            page === step.id ? 'bg-black text-white' : 'bg-[#D1D1D1]',
          )}
        >
          {step.content}
        </div>
      ))}
    </div>
  );
};

export default CoachStepHeader;
