import QuestionItem from './QuestionItem';

interface Question {
  category: string;
  type: string;
  question: string;
}

interface QuestionListProps {
  selectedJob: string | null;
  questions: Question[];
  onEdit: (question: Question) => void; // eslint-disable-line no-unused-vars
  onDelete: (question: Question) => void; // eslint-disable-line no-unused-vars
}

const QuestionList = ({ selectedJob, questions, onEdit, onDelete }: QuestionListProps) => {
  const filteredQuestions = questions.filter((q) =>
    !selectedJob || selectedJob === '전체 보기' ? true : q.type === selectedJob,
  );

  return (
    <div className='bg-white p-6 rounded-lg border border-gray-200 flex flex-col gap-4 h-full'>
      <div className='flex items-center justify-between mb-2'>
        <h3 className='font-bold text-gray-900 text-lg'>질문 목록</h3>
        <span className='bg-black text-white text-xs font-bold px-2 py-1 rounded-lg'>
          {filteredQuestions.length}개
        </span>
      </div>

      <div className='flex flex-col gap-3 lg:overflow-y-auto pr-2 thin-scrollbar lg:h-[calc(100vh-240px)]'>
        {filteredQuestions.map((q, idx) => (
          <QuestionItem
            key={idx}
            category={q.category}
            jobGroup={q.type}
            question={q.question}
            onEdit={() => onEdit(q)}
            onDelete={() => onDelete(q)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
