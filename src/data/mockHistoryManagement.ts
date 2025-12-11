import type { HistoryResponse } from '@/types/historyManagement';

export const MOCK_HISTORY_RESPONSE: HistoryResponse = {
  resultType: 'SUCCESS',
  error: null,
  success: [
    {
      id: 1,
      created_at: '2025-12-07T05:32:55.000Z',
      user_name: '김주원',
      job_category_name: 'IT',
      question_title: '자기소개 부탁드립니다.',
      company_name: '네이버',
      user_email: 'juwon.kim@example.com',
      answer:
        '안녕하세요. 저는 다양한 분야에 관심을 갖고 새로운 도전을 즐기는 사람입니다. 꾸준한 배움을 통해 스스로 성장하고, 경험을 통해 얻은 통찰을 실제 프로젝트나 사람들과의 협업에서 자연스럽게 녹여내는 것을 좋아합니다.',
      ai_feedback:
        '위 자기소개는 전공, 기술 역량, 학습 의지, 협업 경험 등을 균형 있게 담고 있어 개발자 자기소개로 적합합니다. 다만 강점의 근거가 되는 구체적인 사례가 추가되면 더 설득력 있는 내용이 될 수 있습니다.',
      model_answer:
        'Situation: 저는 4인 팀으로 진행한 졸업 프로젝트에서 핵심 기능 구현이 지연되는 위기 상황을 경험했습니다. Task: 프로젝트 성공을 위해 팀원 간 협업과 문제 해결이 필요하다고 판단했습니다.',
    },
    {
      id: 2,
      created_at: '2025-12-07T04:15:20.000Z',
      user_name: '박민수',
      job_category_name: '기획',
      question_title: '기획 단계에서 가장 중요하게 고려하는 요소는 무엇인가요?',
      company_name: '카카오',
      user_email: 'minsu.park@example.com',
      answer:
        '사용자의 니즈를 정확히 파악하는 것이 가장 중요하다고 생각합니다. 데이터 분석과 사용자 피드백을 통해 근거 있는 기획을 도출하려 노력합니다.',
      ai_feedback:
        '사용자 중심의 사고방식은 좋으나, 구체적으로 어떤 데이터를 활용했는지 예시를 들면 더 좋습니다.',
      model_answer:
        '기획 단계에서는 시장 분석과 타겟 사용자의 페르소나 설정이 선행되어야 하며, 이를 바탕으로 차별화된 가치를 도출해야 합니다.',
    },
    {
      id: 3,
      created_at: '2025-12-06T18:40:00.000Z',
      user_name: '이영희',
      job_category_name: '디자인',
      question_title: '포트폴리오에서 가장 자신 있는 작업물은 무엇인가요?',
      company_name: '라인플러스',
      user_email: 'younghee.lee@example.com',
      answer:
        '최근 진행했던 리브랜딩 프로젝트입니다. 기존 브랜드의 정체성을 유지하면서도 현대적인 감각을 더해 사용자 반응이 30% 상승했습니다.',
      ai_feedback:
        '성과를 수치로 제시한 점이 매우 좋습니다. 디자인 프로세스에 대한 설명도 조금 더 덧붙이면 완벽할 것 같습니다.',
      model_answer:
        'OOO 프로젝트입니다. 해당 프로젝트에서는 사용자 경험 개선을 위해 간결한 UI를 도입했고, 그 결과 체류 시간이 20% 증가했습니다.',
    },
    {
      id: 4,
      created_at: '2025-12-06T14:22:10.000Z',
      user_name: '최준호',
      job_category_name: 'IT',
      question_title: 'React의 라이프사이클에 대해 설명해주세요.',
      company_name: '당근마켓',
      user_email: 'junho.choi@example.com',
      answer:
        '컴포넌트가 생성(Mount), 업데이트(Update), 제거(Unmount)되는 과정을 말합니다. useEffect 훅을 통해 이를 관리할 수 있습니다.',
      ai_feedback:
        '기본적인 개념은 잘 이해하고 계십니다. 클래스형 컴포넌트와 함수형 컴포넌트의 차이점도 함께 언급하면 좋습니다.',
      model_answer:
        'React 컴포넌트는 마운트, 업데이트, 언마운트 단계를 거칩니다. 함수형 컴포넌트에서는 useEffect를 사용하여 사이드 이펙트를 처리합니다.',
    },
    {
      id: 5,
      created_at: '2025-12-05T09:10:05.000Z',
      user_name: '정수진',
      job_category_name: '마케팅',
      question_title: 'SNS 마케팅에서 가장 중요한 지표는 무엇이라고 생각하나요?',
      company_name: '쿠팡',
      user_email: 'sujin.jung@example.com',
      answer:
        '도달률과 참여율이라고 생각합니다. 아무리 좋은 콘텐츠라도 타겟에게 도달하지 않으면 의미가 없기 때문입니다.',
      ai_feedback:
        '핵심 지표를 잘 짚어주셨습니다. 전환률(ROAS)에 대한 언급도 추가되면 비즈니스 관점에서도 어필이 될 것입니다.',
      model_answer:
        '캠페인 목적에 따라 다르겠지만, 브랜드 인지도 측면에서는 도달률, 실제 성과 측면에서는 전환률을 중요하게 봅니다.',
    },
    {
      id: 6,
      created_at: '2025-12-05T08:00:00.000Z',
      user_name: '강현우',
      job_category_name: '영업',
      question_title: '고객의 거절을 어떻게 대처하시나요?',
      company_name: '삼성전자',
      user_email: 'hyunwoo.kang@example.com',
      answer:
        '거절의 이유를 먼저 파악하고, 그에 맞는 대안을 제시하거나 추후 다시 연락드릴 기회를 만듭니다.',
      ai_feedback:
        '침착한 대응 태도가 돋보입니다. 구체적인 성공 사례를 하나 곁들이면 신뢰도가 높아질 것입니다.',
      model_answer:
        '거절을 끝이 아닌 정보 수집의 기회로 삼습니다. 고객의 우려 사항을 경청하고 이를 해소할 수 있는 맞춤형 솔루션을 제안합니다.',
    },
    {
      id: 7,
      created_at: '2025-12-04T22:30:45.000Z',
      user_name: '윤아름',
      job_category_name: '인사',
      question_title: '우리 회사의 인재상에 대해 어떻게 생각하시나요?',
      company_name: 'LG에너지솔루션',
      user_email: 'areum.yoon@example.com',
      answer:
        '도전과 협력을 중시하는 점이 저의 가치관과 잘 맞습니다. 특히 실패를 두려워하지 않는 문화가 인상 깊었습니다.',
      ai_feedback:
        '회사에 대한 관심도가 잘 드러납니다. 본인의 경험과 연결 지어 설명하면 더욱 좋겠습니다.',
      model_answer:
        "회사의 핵심 가치인 '상호 존중'과 '끊임없는 혁신'에 깊이 공감합니다. 저 또한 전 직장에서...",
    },
    {
      id: 8,
      created_at: '2025-12-04T16:55:30.000Z',
      user_name: '송민재',
      job_category_name: 'IT',
      question_title: 'RESTful API란 무엇인가요?',
      company_name: '우아한형제들',
      user_email: 'minjae.song@example.com',
      answer: 'HTTP 메서드를 활용하여 자원의 CRUD 작업을 수행하는 API 설계 방식입니다.',
      ai_feedback:
        '핵심을 잘 요약해주셨습니다. REST의 제약 조건(Stateless, Cacheable 등)에 대해서도 언급하면 전문성을 더 보여줄 수 있습니다.',
      model_answer:
        'RESTful API는 자원을 URI로 표현하고 HTTP Method를 통해 해당 자원의 상태를 주고받는 것을 의미합니다.',
    },
    {
      id: 9,
      created_at: '2025-12-03T11:20:15.000Z',
      user_name: '김서진',
      job_category_name: '기획',
      question_title: '경쟁사 분석은 어떻게 진행하시나요?',
      company_name: '토스',
      user_email: 'seojin.kim@example.com',
      answer:
        '주로 시장 점유율, 서비스 기능, 사용자 리뷰 등을 종합적으로 분석하여 SWOT 분석을 수행합니다.',
      ai_feedback:
        '분석 방법론을 구체적으로 언급한 점이 좋습니다. 분석 후 도출된 인사이트를 어떻게 활용했는지 덧붙여보세요.',
      model_answer:
        '직접 경쟁사와 간접 경쟁사를 구분하고, 사용자 여정(User Journey)을 비교 분석하여 우리의 차별점을 도출합니다.',
    },
    {
      id: 10,
      created_at: '2025-12-03T10:05:55.000Z',
      user_name: '이도윤',
      job_category_name: '디자인',
      question_title: '디자인 시스템 구축 경험이 있나요?',
      company_name: '현대자동차',
      user_email: 'doyun.lee@example.com',
      answer:
        '네, 이전 회사에서 버튼, 타이포그래피, 컬러 팔레트 등을 정의하여 디자인 일관성을 높인 경험이 있습니다.',
      ai_feedback:
        '구체적인 경험을 언급하여 신뢰감을 줍니다. 구축 과정에서 개발자와의 협업 방식도 어필하면 좋습니다.',
      model_answer:
        '네, Figma를 활용하여 컴포넌트 라이브러리를 만들고, 개발팀과 Storybook을 연동하여 효율적인 협업 시스템을 구축했습니다.',
    },
    {
      id: 11,
      created_at: '2025-12-02T19:40:22.000Z',
      user_name: '박하은',
      job_category_name: '마케팅',
      question_title: '퍼포먼스 마케팅이란 무엇인가요?',
      company_name: '아모레퍼시픽',
      user_email: 'haeun.park@example.com',
      answer:
        '데이터를 기반으로 광고 효율을 측정하고 최적화하여 성과를 극대화하는 마케팅 활동입니다.',
      ai_feedback:
        '정의가 명확합니다. 본인이 다뤄본 주요 툴(GA4, Meta Ads 등)을 언급하면 실무 역량을 보여줄 수 있습니다.',
      model_answer:
        '퍼포먼스 마케팅은 데이터를 통해 고객의 행동을 추적하고, ROI를 분석하여 마케팅 예산을 효율적으로 집행하는 것을 목표로 합니다.',
    },
    {
      id: 12,
      created_at: '2025-12-02T13:15:40.000Z',
      user_name: '최지훈',
      job_category_name: 'IT',
      question_title: '클로저(Closure)에 대해 설명해주세요.',
      company_name: '구글코리아',
      user_email: 'jihun.choi@example.com',
      answer:
        '함수와 그 함수가 선언될 당시의 렉시컬 환경의 조합입니다. 외부 변수를 기억하고 접근할 수 있게 해줍니다.',
      ai_feedback:
        '정확한 정의입니다. 클로저가 활용되는 실제 예시(데이터 은닉, 커링 등)를 들면 이해도를 증명하기 좋습니다.',
      model_answer:
        '클로저는 반환된 내부 함수가 자신이 선언됐을 때의 환경(Scope)을 기억하여, 외부 함수가 종료된 후에도 변수에 접근할 수 있는 기능입니다.',
    },
    {
      id: 13,
      created_at: '2025-12-01T15:50:33.000Z',
      user_name: '정우성',
      job_category_name: '영업',
      question_title: '본인의 영업 노하우가 있다면?',
      company_name: 'CJ제일제당',
      user_email: 'woosung.jung@example.com',
      answer:
        '고객의 말을 경청하고 공감하는 것입니다. 신뢰 관계가 형성되면 제안 수락 확률이 높아집니다.',
      ai_feedback:
        "기본에 충실한 답변입니다. 구체적인 에피소드를 통해 '경청'이 어떤 성과로 이어졌는지 보여주세요.",
      model_answer:
        '사전 조사를 철저히 하여 고객의 잠재적인 니즈까지 파악하고, 단순 판매가 아닌 솔루션 파트너로서 접근하는 것입니다.',
    },
    {
      id: 14,
      created_at: '2025-12-01T09:00:10.000Z',
      user_name: '김태태',
      job_category_name: 'IT',
      question_title: 'CI/CD가 무엇인지 설명해주세요.',
      company_name: 'SK텔레콤',
      user_email: 'taetae.kim@example.com',
      answer:
        '지속적 통합과 지속적 배포를 의미하며, 개발 과정을 자동화하여 효율성을 높이는 방법입니다.',
      ai_feedback:
        '개념은 맞습니다. 사용해본 CI/CD 도구(Jenkins, GitHub Actions)나 경험을 덧붙이면 좋습니다.',
      model_answer:
        'CI/CD는 코드 변경 사항을 자동으로 빌드, 테스트, 배포하는 파이프라인을 구축하여 소프트웨어 품질과 배포 속도를 높이는 방식입니다.',
    },
    {
      id: 15,
      created_at: '2025-11-30T21:12:45.000Z',
      user_name: '한지민',
      job_category_name: '인사',
      question_title: '노사 갈등 발생 시 어떻게 대처하겠습니까?',
      company_name: '포스코',
      user_email: 'jimin.han@example.com',
      answer: '양측의 입장을 충분히 듣고 법적 기준과 회사 규정을 검토하여 중재안을 마련하겠습니다.',
      ai_feedback:
        '균형 잡힌 시각이 돋보입니다. 감정적인 부분을 케어하는 방법이나 소통 채널 운영에 대한 아이디어도 추가해보세요.',
      model_answer:
        '우선 사실 관계를 명확히 파악하고, 노사 협의회를 통해 공식적인 대화의 장을 마련하여 상생할 수 있는 합의점을 찾겠습니다.',
    },
    {
      id: 16,
      created_at: '2025-11-30T14:45:00.000Z',
      user_name: '류승룡',
      job_category_name: '기획',
      question_title: '실패한 프로젝트 경험이 있나요?',
      company_name: '엔씨소프트',
      user_email: 'ryu@example.com',
      answer:
        '네, 일정 관리를 잘못해서 출시가 지연된 적이 있습니다. 이후로는 간트 차트를 활용해 일정을 꼼꼼히 관리하고 있습니다.',
      ai_feedback:
        '솔직한 인정과 개선 노력이 잘 드러납니다. 실패를 통해 배운 교훈을 현재 업무에 어떻게 적용하고 있는지 강조해주세요.',
      model_answer:
        '네, 초기 요구사항 분석이 미흡하여 재작업이 발생한 경험이 있습니다. 이를 통해 커뮤니케이션의 중요성을 깨닫고...',
    },
    {
      id: 17,
      created_at: '2025-11-29T17:30:20.000Z',
      user_name: '이하늬',
      job_category_name: '디자인',
      question_title: '협업 시 갈등 해결 방법은?',
      company_name: '크래프톤',
      user_email: 'honey@example.com',
      answer: '상대방의 의도를 먼저 파악하고, 데이터나 레퍼런스를 통해 객관적인 근거로 설득합니다.',
      ai_feedback:
        '논리적인 접근 방식이 좋습니다. 감정적인 충돌을 피하기 위한 본인만의 커뮤니케이션 스킬도 언급하면 좋습니다.',
      model_answer:
        '디자인 의도를 논리적으로 설명하되, 개발자나 기획자의 피드백을 수용하여 더 나은 결과물을 만드는 방향으로 조율합니다.',
    },
    {
      id: 18,
      created_at: '2025-11-29T10:10:05.000Z',
      user_name: '진선규',
      job_category_name: '마케팅',
      question_title: '콘텐츠 마케팅의 핵심은?',
      company_name: '넷플릭스',
      user_email: 'jin@example.com',
      answer: '고객에게 유용한 정보를 제공하여 브랜드 신뢰도를 쌓는 것입니다.',
      ai_feedback:
        '정확합니다. 스토리텔링이나 채널별 최적화 전략에 대해서도 살짝 언급하면 깊이 있는 답변이 될 것입니다.',
      model_answer:
        '타겟 오디언스가 공감할 수 있는 스토리텔링을 통해 브랜드 메시지를 자연스럽게 전달하고 팬덤을 형성하는 것입니다.',
    },
    {
      id: 19,
      created_at: '2025-11-28T12:00:00.000Z',
      user_name: '이동휘',
      job_category_name: 'IT',
      question_title: '비동기 프로그래밍이 필요한 이유는?',
      company_name: '아마존웹서비스',
      user_email: 'donghwi@example.com',
      answer:
        '오래 걸리는 작업을 기다리지 않고 다른 작업을 먼저 처리하여 성능을 높이기 위해서입니다.',
      ai_feedback:
        '핵심을 잘 짚으셨습니다. 자바스크립트의 비동기 처리 방식(Callback, Promise, Async/Await)을 예로 들면 좋습니다.',
      model_answer:
        'I/O 작업 등 시간이 소요되는 로직이 메인 스레드를 차단하지 않도록 하여 사용자 경험(UX)과 애플리케이션 반응성을 유지하기 위함입니다.',
    },
    {
      id: 20,
      created_at: '2025-11-28T09:30:15.000Z',
      user_name: '공명',
      job_category_name: '영업',
      question_title: '영업 목표를 달성하지 못했을 때 어떻게 하나요?',
      company_name: 'GS리테일',
      user_email: 'gong@example.com',
      answer: '부족한 부분을 분석하고 다음 달 계획에 반영하여 만회하겠습니다.',
      ai_feedback:
        '긍정적인 마인드입니다. 구체적으로 어떤 부분을 분석할 것인지(활동량, 전환율 등) 언급하면 더 전문적으로 보입니다.',
      model_answer:
        '원인을 객관적으로 분석(파이프라인 점검, 활동량 부족 등)하고, 팀장님께 피드백을 구하여 즉시 개선 액션 플랜을 수립하겠습니다.',
    },
  ],
};
