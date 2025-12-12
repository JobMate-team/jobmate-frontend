import { atom } from 'jotai';

const pageAtom = atom<number>(1);
const isModalOpenAtom = atom<boolean>(false);
const isLogoutModalAtom = atom<boolean>(false);
const isAdminLoginModalAtom = atom<boolean>(false);
const isAdminModeAtom = atom<boolean>(false);
const historyRefreshAtom = atom<number>(0);

export {
  pageAtom,
  isModalOpenAtom,
  isLogoutModalAtom,
  isAdminLoginModalAtom,
  isAdminModeAtom,
  historyRefreshAtom,
};
