import { atom } from 'jotai';
import type { UserProfile } from '@/api/user';

const pageAtom = atom<number>(1);
const isModalOpenAtom = atom<boolean>(false);
const isLogoutModalAtom = atom<boolean>(false);
const isAdminLoginModalAtom = atom<boolean>(false);
const isAdminModeAtom = atom<boolean>(false);
const historyRefreshAtom = atom<number>(0);
const reviewRefreshAtom = atom<number>(0);
const userProfileAtom = atom<UserProfile | null>(null);

// coaching
const jobCategoryIdAtom = atom<number | null>(null);
const roleIdAtom = atom<number | null>(null);
const companyIdAtom = atom<number | null>(null);
const questionIdAtom = atom<number | null>(null);
const feedbackLoadingAtom = atom<boolean>(false);
const aiFeedbackAtom = atom({
  summarizedTalent: '',
  companyAdvice: '',
  totalReview: '',
  improvementPoints: [] as string[],
  exampleAnswer: '',
});
const coachingIdAtom = atom<number | null>(null);

export {
  pageAtom,
  isModalOpenAtom,
  isLogoutModalAtom,
  isAdminLoginModalAtom,
  isAdminModeAtom,
  historyRefreshAtom,
  jobCategoryIdAtom,
  roleIdAtom,
  companyIdAtom,
  questionIdAtom,
  feedbackLoadingAtom,
  aiFeedbackAtom,
  reviewRefreshAtom,
  userProfileAtom,
  coachingIdAtom,
};
