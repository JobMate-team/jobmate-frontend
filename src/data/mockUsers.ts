import type { User } from '@/types/User';

const JOBS = ['기획', 'IT', '마케팅', '디자인', '영업', '인사', '재무', '연구'];

const generateMockUsers = (): User[] => {
  const users: User[] = [];
  let idCounter = 1;

  JOBS.forEach((job) => {
    const count = Math.floor(Math.random() * (50 - 15 + 1)) + 15;

    for (let i = 0; i < count; i++) {
      const num = idCounter;
      users.push({
        id: num,
        name: `김철수${num}`,
        email: `kim${num}@example.com`,
        job: job,
        joinDate: '2025. 11. 15.',
        coachingCount: Math.floor(Math.random() * 50) + 1,
        reviewCount: Math.floor(Math.random() * 5) + 0,
      });
      idCounter++;
    }
  });

  return users;
};

export const MOCK_USERS: User[] = generateMockUsers();
