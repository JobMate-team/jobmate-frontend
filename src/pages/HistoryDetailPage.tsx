import { useParams } from 'react-router-dom';

const mockHistoryItems = [
  {
    id: 1,
    category: '경험',
    date: '오늘',
    question: '코드 리뷰에서 가장 중요하게 생각하는 것은?',
    answer:
      '코드 컨벤션을 지켰는지 확인하면서 리뷰를 하는 것이 가장 중요하다고 생각합니다. 왜냐하면 중요하다고 생각하기 때문입니다.',
  },
  {
    id: 2,
    category: '인성',
    date: '25.10.27',
    question: '인성 문제있어요?',
    answer: '없는데요? 왜 물어보세요 그런거',
  },
  {
    id: 3,
    category: '개발',
    date: '24.9.10',
    question: '개발이 좋으세요? 아니면 고양이발이 좋으세요?',
    answer:
      '저는 개인적으로 고양이 발이 더 좋습니다. 고양이 발바닥을 보시면 핑크색 젤리가 있는데 그게 참 야무지거든요.',
  },
];

const HistoryDetailPage = () => {
  const { id } = useParams();
  const item = mockHistoryItems.find((h) => h.id === Number(id));

  if (!item) return <p>존재하지 않는 히스토리입니다.</p>;

  return (
    <div className='p-6 space-y-4'>
      <h2 className='text-2xl font-semibold'>{item.category}</h2>
      <p className='text-gray-500'>{item.date}</p>

      <div className='mt-4 p-4 bg-white rounded-xl border border-gray-200'>
        <p className='font-medium text-lg mb-2'>{item.question}</p>
        <p className='text-gray-700'>{item.answer}</p>
      </div>
    </div>
  );
};

export default HistoryDetailPage;
