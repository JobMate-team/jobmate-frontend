import SideBar from '@/components/layouts/SideBar';

const HomePage = () => {
  const features = [
    {
      icon: '🤖',
      title: 'AI 실시간 피드백',
      description: '답변을 분석하여 즉시 개선점을 제시합니다',
    },
    {
      icon: '🎯',
      title: '직무별 맞춤 코칭',
      description: '각 직무에 특화된 질문과 피드백을 제공합니다',
    },
    {
      icon: '📈',
      title: '모범 답변 예시',
      description: 'AI가 생성한 모범 답변으로 학습하세요',
    },
    {
      icon: '🏆',
      title: '합격 후기 공유',
      description: '실제 합격자들의 경험을 확인하세요',
    },
  ];

  return (
    <div className='flex h-screen bg-gray-50'>
      <SideBar />

      {/* 메인 컨텐츠 */}
      <main className='flex-1 overflow-auto'>
        <div className='max-w-6xl mx-auto p-8'>
          {/* 환영 카드 */}
          <div className='bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white mb-8 shadow-lg'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='w-12 h-12 bg-white/20 rounded-full flex items-center justify-center'>
                <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z' />
                </svg>
              </div>
              <div>
                <h2 className='text-2xl font-bold'>오늘의 면접 연습</h2>
                <p className='text-blue-100'>시작할 때 면접을 준비해보세요</p>
              </div>
            </div>
            <button className='bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-md'>
              지금 시작하기 →
            </button>
          </div>

          {/* 기능 카드 */}
          <div className='grid grid-cols-2 gap-6 mb-8'>
            {features.map((feature, index) => (
              <div
                key={index}
                className='bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100'
              >
                <div className='text-4xl mb-4'>{feature.icon}</div>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>{feature.title}</h3>
                <p className='text-sm text-gray-600 leading-relaxed'>{feature.description}</p>
              </div>
            ))}
          </div>

          {/* 오늘의 팁 */}
          <div className='bg-linear-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200'>
            <div className='flex items-start gap-3'>
              <span className='text-2xl'>💡</span>
              <div>
                <h3 className='font-bold text-gray-900 mb-3'>오늘의 팁</h3>
                <div className='bg-white rounded-lg p-4 mb-3 shadow-sm'>
                  <h4 className='font-semibold text-gray-900 mb-2'>STAR 기법을 활용하세요</h4>
                  <p className='text-sm text-gray-700 leading-relaxed mb-3'>
                    면접 답변 시 Situation → Task → Action → Result 순서로 설명하면 더 명확해져요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
