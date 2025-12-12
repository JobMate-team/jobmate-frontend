import { toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import {
  getQuestionTemplates,
  postQuestionTemplate,
  patchQuestionTemplate,
  deleteQuestionTemplate,
} from '@/api/question';
import QuestionManagement from '@/components/question/QuestionManagement';
import QuestionStats from '@/components/question/QuestionStats';
import QuestionList from '@/components/question/QuestionList';
import { Outlet } from 'react-router-dom';
import Modal from '@/components/common/Modal';
interface QuestionItem {
  id?: number;
  category: string;
  type: string;
  question: string;
}

const QuestionManagementPage = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>('전체 보기');
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [jobCategories, setJobCategories] = useState<{ [key: string]: number }>({});

  const [editingQuestion, setEditingQuestion] = useState<{
    index: number;
    data: QuestionItem;
  } | null>(null);
  const [deletingQuestion, setDeletingQuestion] = useState<QuestionItem | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestionTemplates();
        if (response.resultType === 'SUCCESS' && response.success) {
          const apiQuestions = response.success.list.map((item) => ({
            id: item.id,
            category: item.question_type,
            type: item.job_category_name,
            question: item.content,
          }));
          setQuestions(apiQuestions);

          // 직무 이름 -> ID 매핑 생성
          const categoryMap: { [key: string]: number } = {};
          response.success.stats.categories.forEach((cat) => {
            categoryMap[cat.job_category_name] = cat.job_category_id;
          });
          setJobCategories(categoryMap);
        } else {
          // 필요시 data.error 처리
          console.error('질문 조회 실패:', response.error);
        }
      } catch (error) {
        console.error('질문 조회 중 에러 발생:', error);
        // API 실패 시 mock 데이터 사용 (개발 중 백엔드가 없을 때 유용)
        // setQuestions(mockQuestions);
      }
    };

    fetchQuestions();
  }, []);

  const handleAddQuestion = async (question: string, category: string) => {
    if (!selectedJob || selectedJob === '전체 보기') return;

    try {
      const jobCategoryId = jobCategories[selectedJob];
      if (!jobCategoryId) {
        console.error('직무 ID를 찾을 수 없습니다:', selectedJob);
        // TODO: 사용자에게 알림?
        return;
      }

      const response = await postQuestionTemplate({
        content: question,
        job_category_id: jobCategoryId,
        question_type: category,
      });

      if (response.resultType === 'SUCCESS') {
        const newQuestion = {
          id: response.success.question.id,
          category: category,
          type: selectedJob, // 현재 선택된 직군이 타입이 됨
          question: question,
        };
        setQuestions([newQuestion, ...questions]);
        toast.success('질문이 성공적으로 추가되었습니다.');
      } else {
        console.error('질문 추가 실패:', response.error);
        if (response.error?.errorCode === 'ADMIN_ONLY') {
          // alert('관리자 전용 기능입니다.');
          toast.error('관리자 전용 기능입니다.');
        } else {
          // alert(response.error?.reason || '질문 추가에 실패했습니다.');
          toast.error(response.error?.reason || '질문 추가에 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('질문 추가 중 에러 발생:', error);
      // alert('질문 추가 중 오류가 발생했습니다.');
      toast.error('질문 추가 중 오류가 발생했습니다.');
    }
  };

  const handleEditQuestion = (originalQuestion: QuestionItem) => {
    const index = questions.findIndex((q) => q === originalQuestion);
    if (index !== -1) {
      setEditingQuestion({ index, data: originalQuestion });
    }
  };

  const handleUpdateQuestion = async (question: string, category: string) => {
    if (!editingQuestion || !editingQuestion.data.id) {
      console.error('수정할 질문 정보가 없거나 ID가 없습니다.');
      return;
    }

    // 수정 시 직무는 변경하지 않으므로 기존 데이터 사용
    // 만약 직무 수정도 필요하다면 UI에 직무 선택이 있어야 하지만 현재 디자인엔 없음
    // 기존 질문의 type 즉 job name을 이용해 ID를 찾아야 함
    const jobName = editingQuestion.data.type;
    const jobCategoryId = jobCategories[jobName];

    if (!jobCategoryId) {
      toast.error('직무 정보를 찾을 수 없습니다.');
      return;
    }

    try {
      const response = await patchQuestionTemplate(editingQuestion.data.id, {
        content: question,
        job_category_id: jobCategoryId,
        question_type: category,
      });

      if (response.resultType === 'SUCCESS') {
        const updatedQuestions = [...questions];
        updatedQuestions[editingQuestion.index] = {
          ...editingQuestion.data,
          question,
          category,
        };

        setQuestions(updatedQuestions);
        setEditingQuestion(null);
        toast.success('질문이 성공적으로 수정되었습니다.');
      } else {
        console.error('질문 수정 실패:', response.error);
        toast.error(response.error?.reason || '질문 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('질문 수정 중 에러 발생:', error);
      toast.error('질문 수정 중 오류가 발생했습니다.');
    }
  };

  const handleCancelEdit = () => {
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (question: QuestionItem) => {
    setDeletingQuestion(question);
  };

  const handleConfirmDelete = async () => {
    if (!deletingQuestion || !deletingQuestion.id) {
      console.error('삭제할 질문 정보가 없거나 ID가 없습니다.');
      setDeletingQuestion(null);
      return;
    }

    try {
      const response = await deleteQuestionTemplate(deletingQuestion.id);

      if (response.resultType === 'SUCCESS') {
        setQuestions(questions.filter((q) => q !== deletingQuestion));
        setDeletingQuestion(null);
        toast.success('질문이 성공적으로 삭제되었습니다.');
      } else {
        console.error('질문 삭제 실패:', response.error);
        if (response.error?.errorCode === 'ADMIN_ONLY') {
          toast.error('관리자 전용 기능입니다.');
        } else {
          toast.error(response.error?.reason || '질문 삭제에 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('질문 삭제 중 에러 발생:', error);
      toast.error('질문 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className='space-y-6 pb-30'>
      <div className='hidden sm:flex items-center justify-between mt-10'>
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
