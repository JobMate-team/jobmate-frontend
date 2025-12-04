import { atom } from 'jotai';

const pageAtom = atom<number>(1);
const isModalOpenAtom = atom<boolean>(false);
const isMyPageOpenAtom = atom<boolean>(false);

export { pageAtom, isModalOpenAtom, isMyPageOpenAtom };
