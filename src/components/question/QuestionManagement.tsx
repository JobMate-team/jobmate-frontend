import { useState, useEffect } from 'react';
import { Plus, X, Save } from 'lucide-react';
import DropDown from '@/components/ui/Dropdown';
import Button from '@/components/common/Button';

const jobs = ['전체 보기', '기획', 'IT', '마케팅', '디자인', '영업', '인사'];

interface Question {
  category: string;
  type: string;
  question: string;
}

interface QuestionManagementProps {
  selectedJob: string | null;
  onSelectJob: (job: string) => void; // eslint-disable-line no-unused-vars
  onAddQuestion: (question: string, category: string) => void; // eslint-disable-line no-unused-vars
  editingQuestion?: Question;
  onUpdateQuestion?: (question: string, category: string) => void; // eslint-disable-line no-unused-vars
  onCancelEdit?: () => void;
  className?: string;
}

const QuestionManagement = ({
  selectedJob,
  onSelectJob,
  onAddQuestion,
  editingQuestion,
  onUpdateQuestion,
  onCancelEdit,
  className,
}: QuestionManagementProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');

  const isAddDisabled = !selectedJob || selectedJob === '전체 보기';
  const isEditing = !!editingQuestion;

  useEffect(() => {
    if (editingQuestion) {
      setQuestion(editingQuestion.question);
      setCategory(editingQuestion.category);
      setIsAdding(false);
    }
  }, [editingQuestion]);

  const handleSave = () => {
    if (question.trim() && category.trim()) {
      if (isEditing && onUpdateQuestion) {
        onUpdateQuestion(question, category);
      } else {
        onAddQuestion(question, category);
        setQuestion('');
        setCategory('');
        setIsAdding(false);
      }
    }
  };

  const handleCancel = () => {
    if (isEditing && onCancelEdit) {
      onCancelEdit();
    }
    setIsAdding(false);
    setQuestion('');
    setCategory('');
  };

  const showForm = isAdding || isEditing;

  return (
    <div
      className={`bg-white p-4 rounded-lg border border-gray-100 flex flex-col gap-4 ${className}`}
    >
      {showForm ? (
        <>
          <h3 className='font-bold text-gray-900'>{isEditing ? '질문 수정' : '질문 추가'}</h3>

          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <label className='text-sm font-bold text-gray-900'>질문 텍스트 *</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder='면접 질문을 입력하세요'
                className='w-full p-3 bg-gray-50 rounded-lg border-none resize-none h-24 focus:ring-2 focus:ring-black focus:outline-none placeholder:text-gray-400 text-sm'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-sm font-bold text-gray-900'>카테고리 *</label>
              <input
                type='text'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder='예: 인성, 직무, 경험'
                className='w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-black focus:outline-none placeholder:text-gray-400 text-sm'
              />
            </div>

            <div className='flex items-center gap-2 mt-2'>
              <Button
                type='button'
                onClick={handleSave}
                className='flex-1 bg-black text-white hover:bg-gray-800 py-2.5 text-sm font-bold flex items-center justify-center gap-2 rounded-lg'
              >
                <Save size={16} />
                {isEditing ? '수정' : '추가'}
              </Button>
              <button
                type='button'
                onClick={handleCancel}
                className='w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
              >
                <X size={18} className='text-gray-500' />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className='flex flex-col flex-1 gap-6'>
          <h3 className='font-bold text-gray-900'>질문 관리</h3>

          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-gray-700'>직군 선택</label>
            <div className='relative'>
              <DropDown
                items={jobs}
                selected={selectedJob}
                onSelect={onSelectJob}
                placeholder='직군을 선택해주세요'
                bgColor='bg-gray-50 w-full'
                borderColor='border-gray-200'
                SmPadding='py-2.5'
              />
            </div>
          </div>

          <Button
            type='button'
            className={`w-full py-2.5 text-sm font-medium flex items-center justify-center gap-1 mt-auto ${
              isAddDisabled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
            onClick={() => !isAddDisabled && setIsAdding(true)}
            disabled={isAddDisabled}
          >
            <Plus size={16} />새 질문 추가
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestionManagement;
