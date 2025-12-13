export const jobItems = ['기획', 'IT', '마케팅', '디자인', '영업', '인사', '재무', '연구'];

export const CATEGORIES = ['전체', ...jobItems];

export const coachStep = [
  { id: 1, content: '1. 질문 선택' },
  { id: 2, content: '2. 답변 작성' },
  { id: 3, content: '3. 피드백' },
];

export const JOB_CATEGORY_MAP: Record<string, number> = {
  기획: 1,
  IT: 2,
  마케팅: 3,
  디자인: 4,
  영업: 5,
  인사: 6,
  재무: 7,
  연구: 8,
};
