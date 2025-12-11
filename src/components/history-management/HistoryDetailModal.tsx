import type { HistoryRecord } from '@/types/historyManagement';
import { X } from 'lucide-react';

interface HistoryDetailModalProps {
  record: HistoryRecord;
  onClose: () => void;
}

const HistoryDetailModal = ({ record, onClose }: HistoryDetailModalProps) => {
  // 상세 값 결정 (목 데이터에 없는 경우 기본값 사용)
  const email = record.user_email || 'kim@example.com';
  const answer = record.answer || '답변 내용이 없습니다.';
  const aiFeedback = record.ai_feedback || 'AI 피드백이 없습니다.';
  const modelAnswer = record.model_answer || '모범 답변이 없습니다.';

  // 날짜 표시 형식 포맷팅
  const dateObj = new Date(record.created_at);
  const formattedDate = `${dateObj.getFullYear()}. ${dateObj.getMonth() + 1}. ${dateObj.getDate()}`;

  return (
    <div className='fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4'>
      <div className='bg-white rounded-lg flex flex-col w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-lg relative'>
        {/* 헤더 / 닫기 버튼 */}
        <div className='absolute top-4 right-4 z-10'>
          <button onClick={onClose} className='text-gray-400 hover:text-gray-600 p-1'>
            <X size={24} />
          </button>
        </div>

        <div className='p-8 overflow-y-auto custom-scrollbar flex flex-col gap-6'>
          {/* 사용자 정보 섹션 */}
          <div>
            <h3 className='text-base font-bold text-gray-900 mb-2'>사용자 정보</h3>
            <div className='bg-gray-50 rounded-lg p-4 text-sm text-gray-700 flex flex-col gap-1'>
              <p>이름: {record.user_name}</p>
              <p>이메일: {email}</p>
              <p>직군: {record.job_category_name}</p>
              <p>일시: {formattedDate}</p>
            </div>
          </div>

          {/* 질문 */}
          <div>
            <h3 className='text-base font-bold text-gray-900 mb-2'>질문</h3>
            <div className='bg-black text-white rounded-lg p-4 text-sm font-medium'>
              {record.question_title}
            </div>
          </div>

          {/* 답변 */}
          <div>
            <h3 className='text-base font-bold text-gray-900 mb-2'>답변</h3>
            <div className='bg-white border border-gray-200 rounded-lg p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap'>
              {answer}
            </div>
          </div>

          {/* AI 피드백 */}
          <div>
            <h3 className='text-base font-bold text-gray-900 mb-2'>AI 피드백</h3>
            <div className='bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap'>
              {aiFeedback}
            </div>
          </div>

          {/* 모범 답변 예시 */}
          <div>
            <h3 className='text-base font-bold text-gray-900 mb-2'>모범 답변 예시</h3>
            <div className='bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap'>
              {modelAnswer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryDetailModal;
