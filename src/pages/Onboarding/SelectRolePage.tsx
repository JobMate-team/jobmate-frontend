import { Logo } from '@/assets';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';
import {
  IoMdPaper,
  IoMdDesktop,
  IoMdStats,
  IoIosBrush,
  IoMdBriefcase,
  IoMdPeople,
  IoIosFlask,
} from 'react-icons/io';
import { HiSpeakerphone } from 'react-icons/hi';
import { useState } from 'react';
import clsx from 'clsx';
import { showToast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { patchJobCate } from '@/api/auth';

const roleList = [
  { id: 1, icon: <IoMdPaper size={28} />, name: '기획' },
  { id: 2, icon: <IoMdDesktop size={28} />, name: 'IT' },
  { id: 3, icon: <HiSpeakerphone size={28} />, name: '마케팅' },
  { id: 4, icon: <IoIosBrush size={28} />, name: '디자인' },
  { id: 5, icon: <IoMdBriefcase size={28} />, name: '영업' },
  { id: 6, icon: <IoMdPeople size={28} />, name: '인사' },
  { id: 7, icon: <IoMdStats size={28} />, name: '재무' },
  { id: 8, icon: <IoIosFlask size={28} />, name: '연구' },
];

const SelectRolePage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  const selectJobMutation = useMutation({
    mutationFn: (selectedRole: number) => patchJobCate(selectedRole),
    onSuccess: () => {
      showToast.success('환영합니다!');
      navigate('/home', { replace: true });
    },
    onError: () => {
      showToast.error('직군 선택에 실패했습니다.');
    },
  });

  const handleSubmit = () => {
    if (!selectedRole) {
      showToast.error('직군을 선택해주세요.');
      return;
    }
    selectJobMutation.mutate(selectedRole); // 선택된 id 전달
  };

  return (
    <main className='bg-gray-50 min-h-dvh flex justify-center items-center p-4'>
      <section className='w-full max-w-sm p-4'>
        {/* 아이콘 */}
        <div className='flex justify-center mb-5'>
          <Logo className='w-20 h-20' />
        </div>

        <div className='text-center'>
          <h1 className='text-2xl font-semibold mb-1'>어떤 직무에 지원하시나요?</h1>
          <p className='text-gray-700 min-h-12 whitespace-pre-line'>
            선택하신 직무에 맞는 맞춤형 코칭을 제공해드립니다
          </p>
        </div>

        <ul className='grid grid-cols-2 gap-4 mb-9'>
          {roleList.map((role) => {
            const isSelected = selectedRole === role.id;

            return (
              <li
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={clsx(
                  'flex flex-col justify-center items-center gap-1 h-30 rounded-2xl bg-white cursor-pointer active:scale-95 transition',
                  isSelected
                    ? 'border-2 border-gray-500'
                    : 'border border-[#DADADA] hover:border-2 hover:border-gray-400',
                )}
              >
                {role.icon}
                <p className='text-xl'>{role.name}</p>
              </li>
            );
          })}
        </ul>

        <footer className='flex items-center gap-5'>
          <Button
            type='submit'
            className='w-full bg-black text-white font-medium px-4 py-3'
            onClick={handleSubmit}
          >
            시작하기
          </Button>
        </footer>
      </section>
    </main>
  );
};

export default SelectRolePage;
