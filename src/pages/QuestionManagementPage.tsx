import { useState } from 'react';
import QuestionManagement from '@/components/question/QuestionManagement';
import QuestionStats from '@/components/question/QuestionStats';
import QuestionList from '@/components/question/QuestionList';
import Modal from '@/components/common/Modal'; // Import Modal
import { mockQuestions } from '@/data/questionData';
import { Outlet } from 'react-router-dom';

const QuestionManagementPage = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>('전체 보기');
  const [questions, setQuestions] = useState(mockQuestions);
  const [editingQuestion, setEditingQuestion] = useState<{
    index: number;
    data: { category: string; type: string; question: string };
  } | null>(null);
  const [deletingQuestion, setDeletingQuestion] = useState<{
    category: string;
    type: string;
    question: string;
  } | null>(null);

  const handleAddQuestion = (question: string, category: string) => {
    if (!selectedJob || selectedJob === '전체 보기') return;

    const newQuestion = {
      category: category,
      type: selectedJob, // The current selected job becomes the type
      question: question,
    };

    setQuestions([newQuestion, ...questions]);
  };

  const handleEditQuestion = (originalQuestion: {
    category: string;
    type: string;
    question: string;
  }) => {
    const index = questions.findIndex((q) => q === originalQuestion);
    if (index !== -1) {
      setEditingQuestion({ index, data: originalQuestion });
    }
  };

  const handleUpdateQuestion = (question: string, category: string) => {
    if (!editingQuestion) return;

    const updatedQuestions = [...questions];
    updatedQuestions[editingQuestion.index] = {
      ...editingQuestion.data,
      question,
      category,
    };

    setQuestions(updatedQuestions);
    setEditingQuestion(null);
  };

  const handleCancelEdit = () => {
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (question: { category: string; type: string; question: string }) => {
    setDeletingQuestion(question);
  };

  const handleConfirmDelete = () => {
    if (deletingQuestion) {
      setQuestions(questions.filter((q) => q !== deletingQuestion));
      setDeletingQuestion(null);
    }
  };

  return (
    <div className='space-y-6 pb-30'>
      <div className='flex items-center justify-between mt-10'>
        <div className='flex flex-col'>
          <h1 className='text-2xl font-semibold mb-2'>질문 템플릿 관리</h1>
          <p className='text-[#717182] mb-6'>직무별 면접 질문 템플릿을 관리합니다</p>
        </div>
      </div>

      <div className='flex flex-col lg:grid lg:grid-cols-12 gap-6 h-auto lg:h-[calc(100vh-140px)]'>
        <div className='w-full lg:col-span-3 flex flex-col gap-6 h-auto lg:h-full'>
          <QuestionManagement
            selectedJob={selectedJob}
            onSelectJob={setSelectedJob}
            onAddQuestion={handleAddQuestion}
            editingQuestion={editingQuestion?.data}
            onUpdateQuestion={handleUpdateQuestion}
            onCancelEdit={handleCancelEdit}
            className='flex-1'
          />
          <QuestionStats questions={questions} />
        </div>
        <div className='w-full lg:col-span-9 h-auto lg:h-full'>
          <QuestionList
            selectedJob={selectedJob}
            questions={questions}
            onEdit={handleEditQuestion}
            onDelete={handleDeleteQuestion}
          />
        </div>
      </div>

      {deletingQuestion && (
        <Modal
          title='해당 질문을 삭제하시겠습니까?'
          content='이 작업은 되돌릴 수 없습니다.'
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingQuestion(null)}
        />
      )}

      <Outlet />
    </div>
  );
};

export default QuestionManagementPage;
