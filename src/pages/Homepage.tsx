import { FirstHomeIcon, ForthHomeIcon, LogoIcon, SecondHomeIcon, ThirdomeIcon } from '@/assets';
import MobileNav from '@/components/layouts/MobileNav';
import SideBar from '@/components/layouts/SideBar';

const HomePage = () => {
  const features = [
    {
      icon: <FirstHomeIcon />,
      title: 'AI 실시간 피드백',
      description: '답변을 분석하여 즉시 개선점을 제시합니다',
    },
    {
      icon: <SecondHomeIcon />,
      title: '직무별 맞춤 코칭',
      description: '각 직무에 특화된 질문과 피드백을 제공합니다',
    },
    {
      icon: <ThirdomeIcon />,
      title: '모범 답변 예시',
      description: 'AI가 생성한 모범 답변으로 학습하세요',
    },
    {
      icon: <ForthHomeIcon />,
      title: '합격 후기 공유',
      description: '실제 합격자들의 경험을 확인하세요',
    },
  ];

  return (
    <div className='flex h-screen bg-gray-50'>
      <SideBar />
      <main className='flex-1 overflow-auto'>
        <div className='max-w-6xl mx-auto p-8'>
          <div className='bg-black rounded-2xl p-8 text-white mb-8 shadow-lg'>
            <div className='flex flex-col gap-5 mb-6'>
              <p className='text-lg'>안녕하세요. 정찬원님! 👋🏻 </p>
              <div className='flex flex-row gap-3'>
                <LogoIcon className='w-12 h-12' />
                <div>
                  <h2 className='text-2xl font-bold'>오늘의 면접 연습</h2>
                  <p className='text-gray-200'>시작할 때 면접을 준비해보세요</p>
                </div>
              </div>
            </div>
            <button className='bg-white text-black font-semibold px-20 py-3 rounded-lg hover:bg-gray-200 transition'>
              지금 시작하기 →
            </button>
          </div>

          <div className='grid lg:grid-cols-2 grid-cols-1 gap-6 mb-8'>
            {features.map((feature, idx) => (
              <div
                key={idx}
                className='bg-white rounded-xl p-6 cursor-pointer border border-[#E5E5E5]'
              >
                <div className='mb-4'>{feature.icon}</div>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>{feature.title}</h3>
                <p className='text-sm text-gray-600 leading-relaxed'>{feature.description}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className='font-bold text-[22px] text-gray-900 mb-3'>오늘의 팁 💡</h3>
            <div className='bg-white rounded-lg p-6 mb-18 sm:mb-6 border border-[#E5E5E5]'>
              <h4 className='font-semibold text-xl'>STAR 기법을 활용하세요</h4>
              <p className='text-gray-900 leading-relaxed mb-6 my-6'>
                면접 답변 시 Situation(상황), Task(과제), Action(행동), Result(결과) 순서로
                구조화하면 더 명확하고 설득력있는 답변이 됩니다.
              </p>
              <p className='text-gray-600 leading-relaxed'>
                예: "프로젝트 기한이 촉박했던 상황에서(S), 효율적인 업무 분담이 필요했고(T),
                팀원들과 협의하여 우선순위를 정했으며(A), 결과적으로 기한 내 성공적으로
                완료했습니다(R)."
              </p>
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
};

export default HomePage;
