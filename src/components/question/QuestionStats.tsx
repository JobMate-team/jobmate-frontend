interface Question {
  category: string;
  type: string;
  question: string;
}

interface QuestionStatsProps {
  questions: Question[];
}

const QuestionStats = ({ questions }: QuestionStatsProps) => {
  // 직군별 카운트 계산
  const jobCounts = questions.reduce(
    (acc, q) => {
      acc[q.type] = (acc[q.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const stats = [
    { label: '전체 질문', count: questions.length, icon: null },
    { label: '기획', count: jobCounts['기획'] || 0, icon: '📋' },
    { label: 'IT', count: jobCounts['IT'] || 0, icon: '💻' },
    { label: '마케팅', count: jobCounts['마케팅'] || 0, icon: '📊' },
    { label: '디자인', count: jobCounts['디자인'] || 0, icon: '🎨' },
    { label: '영업', count: jobCounts['영업'] || 0, icon: '💼' },
    { label: '인사', count: jobCounts['인사'] || 0, icon: '👥' },
  ];

  return (
    <div className='bg-white p-6 rounded-lg border border-gray-100'>
      <h3 className='font-bold text-gray-900 mb-4'>통계</h3>
      <div className='flex flex-col gap-2'>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className='flex items-center justify-between pt-2 pb-2 rounded-lg cursor-pointer hover:bg-gray-50 text-gray-600 transition-colors'
          >
            <div className='flex items-center gap-2'>
              {stat.icon && <span>{stat.icon}</span>}
              <span className='text-sm'>{stat.label}</span>
            </div>
            <span className='text-xs font-medium px-2 py-0.5 rounded-md bg-black text-white'>
              {stat.count}개
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionStats;
