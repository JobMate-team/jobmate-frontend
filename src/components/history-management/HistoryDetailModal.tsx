import { useEffect } from 'react';
import type { HistoryRecord } from '@/types/historyManagement';
import { X } from 'lucide-react';

interface HistoryDetailModalProps {
  record: HistoryRecord;
  onClose: () => void;
}

const HistoryDetailModal = ({ record, onClose }: HistoryDetailModalProps) => {
  // 모달 마운트 시 body 스크롤 잠금, 언마운트 시 해제
  useEffect(() => {
    // body scroll lock
    document.body.style.overflow = 'hidden';

    // ESC close
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // 상세 값 결정 (목 데이터에 없는 경우 기본값 사용)
  const email = record.user_email || 'kim@example.com';
  const answer = record.answer || '답변 내용이 없습니다.';
  const aiFeedback = record.ai_feedback || 'AI 피드백이 없습니다.';

  // 날짜 표시 형식 포맷팅
  const dateObj = new Date(record.created_at);
  const formattedDate = `${dateObj.getFullYear()}. ${dateObj.getMonth() + 1}. ${dateObj.getDate()}`;

  // AI 피드백 파싱 관련 로직
  let parsedFeedback = null;
  try {
    if (record.ai_feedback) {
      parsedFeedback = JSON.parse(record.ai_feedback);
    }
  } catch {
    // 파싱 실패 시 일반 텍스트로 표시
    parsedFeedback = null;
  }

  // AI 피드백 렌더링 함수
  const renderAiFeedback = () => {
    if (!record.ai_feedback) return 'AI 피드백이 없습니다.';

    if (parsedFeedback) {
      return (
        <div className='flex flex-col gap-4'>
          {/* 인재상 & 맞춤 조언 */}
          {parsedFeedback['요약된_인재상'] && (
            <div className='bg-blue-50 p-4 rounded-lg'>
              <h4 className='font-bold text-blue-900 mb-2 flex items-center gap-2 text-sm sm:text-base'>
                인재상 요약
              </h4>
              <p className='text-xs sm:text-sm text-blue-800 leading-relaxed'>
                {parsedFeedback['요약된_인재상']}
              </p>
            </div>
          )}

          {parsedFeedback['기업_맞춤_조언'] && (
            <div className='bg-green-50 p-4 rounded-lg'>
              <h4 className='font-bold text-green-900 mb-2 flex items-center gap-2 text-sm sm:text-base'>
                기업 맞춤 조언
              </h4>
              <p className='text-xs sm:text-sm text-green-800 leading-relaxed'>
                {parsedFeedback['기업_맞춤_조언']}
              </p>
            </div>
          )}

          {/* 전체 총평 */}
          {parsedFeedback['전체_총평'] && (
            <div>
              <h4 className='font-bold text-gray-900 mb-2 text-sm sm:text-base'>전체 총평</h4>
              <p className='text-xs sm:text-sm text-gray-700 leading-relaxed'>
                {parsedFeedback['전체_총평']}
              </p>
            </div>
          )}

          {/* 개선 포인트 */}
          {parsedFeedback['개선포인트'] && Array.isArray(parsedFeedback['개선포인트']) && (
            <div>
              <h4 className='font-bold text-gray-900 mb-2 text-sm sm:text-base'>개선 포인트</h4>
              <ul className='list-disc list-inside space-y-1'>
                {parsedFeedback['개선포인트'].map((point: string, idx: number) => (
                  <li key={idx} className='text-xs sm:text-sm text-gray-700 leading-relaxed'>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    }

    // JSON 형태가 아닐 경우 그냥 텍스트 출력
    return <div className='whitespace-pre-wrap text-xs sm:text-sm'>{aiFeedback}</div>;
  };

  // 모범 답변 렌더링 함수
  const renderModelAnswer = () => {
    if (!record.model_answer) return '모범 답변이 없습니다.';

    const answer = record.model_answer;
    // (서론), (본론), (결론) 구분 파싱
    // 정규식으로 나누기. 괄호 포함해서 나누기 위해 capture group 사용하지 않거나, 직접 인덱스 찾기 등.
    // 간단하게 split으로 처리.
    // 예시: "요약문 (서론) 서론내용 (본론) 본론내용 (결론) 결론내용"

    const introIndex = answer.indexOf('(서론)');
    const bodyIndex = answer.indexOf('(본론)');
    const conclusionIndex = answer.indexOf('(결론)');

    // 3가지 키워드가 모두 존재해야 포맷팅 적용
    if (introIndex !== -1 && bodyIndex !== -1 && conclusionIndex !== -1) {
      const summary = answer.substring(0, introIndex).trim();
      const intro = answer.substring(introIndex + 4, bodyIndex).trim();
      const body = answer.substring(bodyIndex + 4, conclusionIndex).trim();
      const conclusion = answer.substring(conclusionIndex + 4).trim();

      return (
        <div className='flex flex-col gap-4'>
          {/* 요약 (서론 앞부분이 있다면) */}
          {summary && (
            <div className='border-l-4 border-blue-500 pl-4 py-1'>
              <h4 className='font-bold text-blue-900 mb-1 text-sm sm:text-base'>핵심 요약</h4>
              <p className='text-xs sm:text-sm text-gray-700 leading-relaxed'>{summary}</p>
            </div>
          )}

          <div className='grid gap-4'>
            {/* 서론 */}
            <div className='border-l-4 border-blue-500 pl-4 py-1'>
              <h4 className='font-bold text-blue-900 mb-1 text-sm sm:text-base'>서론</h4>
              <p className='text-xs sm:text-sm text-gray-700 leading-relaxed'>{intro}</p>
            </div>

            {/* 본론 */}
            <div className='border-l-4 border-blue-500 pl-4 py-1'>
              <h4 className='font-bold text-blue-900 mb-1 text-sm sm:text-base'>본론</h4>
              <p className='text-xs sm:text-sm text-gray-700 leading-relaxed'>{body}</p>
            </div>

            {/* 결론 */}
            <div className='border-l-4 border-blue-500 pl-4 py-1'>
              <h4 className='font-bold text-blue-900 mb-1 text-sm sm:text-base'>결론</h4>
              <p className='text-xs sm:text-sm text-gray-700 leading-relaxed'>{conclusion}</p>
            </div>
          </div>
        </div>
      );
    }

    // 포맷에 맞지 않으면 그냥 출력
    return <div className='whitespace-pre-wrap text-xs sm:text-sm'>{answer}</div>;
  };

  return (
    <div className='fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4'>
      <div className='bg-white rounded-lg flex flex-col w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-lg relative'>
        {/* 헤더 / 닫기 버튼 */}
        <div className='absolute top-4 right-4 z-10'>
          <button onClick={onClose} className='text-gray-400 hover:text-gray-600 p-1'>
            <X size={24} />
          </button>
        </div>

        {/* 
            스크롤바 숨김 처리:
            Chrome/Safari/Opera: [&::-webkit-scrollbar]:hidden 
            IE/Edge: [-ms-overflow-style:'none']
            Firefox: [scrollbar-width:'none']
            반응형 패딩: p-4 (mobile) sm:p-8 (desktop)
        */}
        <div
          className='p-4 sm:p-8 overflow-y-auto flex flex-col gap-6 [&::-webkit-scrollbar]:hidden'
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* 사용자 정보 섹션 */}
          <div>
            <h3 className='text-sm sm:text-base font-bold text-gray-900 mb-2'>사용자 정보</h3>
            <div className='bg-gray-50 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-gray-700 flex flex-col gap-1 break-all'>
              <p>
                <span className='font-semibold'>이름:</span> {record.user_name}
              </p>
              <p>
                <span className='font-semibold'>이메일:</span> {email}
              </p>
              <p>
                <span className='font-semibold'>직군:</span> {record.job_category_name}
              </p>
              <p>
                <span className='font-semibold'>일시:</span> {formattedDate}
              </p>
            </div>
          </div>

          {/* 질문 */}
          <div>
            <h3 className='text-sm sm:text-base font-bold text-gray-900 mb-2'>질문</h3>
            <div className='bg-black text-white rounded-lg p-3 sm:p-4 text-xs sm:text-sm font-medium'>
              {record.question_title}
            </div>
          </div>

          {/* 답변 */}
          <div>
            <h3 className='text-sm sm:text-base font-bold text-gray-900 mb-2'>답변</h3>
            <div className='bg-white border border-gray-200 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-wrap'>
              {answer}
            </div>
          </div>

          {/* AI 피드백 */}
          <div>
            <h3 className='text-sm sm:text-base font-bold text-gray-900 mb-2'>AI 피드백</h3>
            <div className='bg-white border border-gray-200 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-gray-700 leading-relaxed'>
              {renderAiFeedback()}
            </div>
          </div>

          {/* 모범 답변 예시 */}
          <div>
            <h3 className='text-sm sm:text-base font-bold text-gray-900 mb-2'>모범 답변 예시</h3>
            <div className='bg-blue-50 border border-blue-100 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-gray-700 leading-relaxed'>
              {renderModelAnswer()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryDetailModal;
