import { SquarePen, Trash2 } from 'lucide-react';
import Button from '@/components/common/Button';
import {
  IoIosBrush,
  IoIosFlask,
  IoMdBriefcase,
  IoMdDesktop,
  IoMdPaper,
  IoMdPeople,
  IoMdStats,
} from 'react-icons/io';
import { HiSpeakerphone } from 'react-icons/hi';

interface QuestionItemProps {
  category: string;
  jobGroup: string;
  question: string;
  onEdit: () => void;
  onDelete: () => void;
}

const getJobGroupIcon = (jobGroup: string) => {
  switch (jobGroup) {
    case '기획':
      return <IoMdPaper size={16} />;
    case 'IT':
      return <IoMdDesktop size={16} />;
    case '마케팅':
      return <HiSpeakerphone size={16} />;
    case '디자인':
      return <IoIosBrush size={16} />;
    case '영업':
      return <IoMdBriefcase size={16} />;
    case '인사':
      return <IoMdPeople size={16} />;
    case '재무':
      return <IoMdStats size={16} />;
    case '연구':
      return <IoIosFlask size={16} />;
    default:
      return '📄';
  }
};

const QuestionItem = ({ category, jobGroup, question, onEdit, onDelete }: QuestionItemProps) => {
  return (
    <div className='flex items-center justify-between border border-gray-200 p-4 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors'>
      <div className='flex flex-col gap-2 flex-1'>
        <div className='flex items-center gap-3'>
          <span className='text-xs font-medium text-gray-900 border border-gray-300 px-2 py-0.5 rounded-lg'>
            {category}
          </span>
          <span className='text-xs font-medium text-gray-600 flex items-center gap-1'>
            <span>{getJobGroupIcon(jobGroup)}</span>
            <span>{jobGroup}</span>
          </span>
        </div>
        <p className='text-gray-900 text-sm font-medium break-words whitespace-pre-wrap'>
          {question}
        </p>
      </div>

      <div className='flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4'>
        <Button
          type='button'
          onClick={onEdit}
          className='w-8 h-8 p-0! bg-white border border-gray-200 text-gray-400 hover:text-blue-500 hover:border-blue-500 rounded-md!'
        >
          <SquarePen size={16} />
        </Button>
        <Button
          type='button'
          onClick={onDelete}
          className='w-8 h-8 p-0! bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500 rounded-md!'
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};

export default QuestionItem;
