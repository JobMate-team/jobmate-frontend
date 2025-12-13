import { X } from 'lucide-react';
import Button from '../common/Button';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adminLoginSchema, type adminLoginType } from '@/schema/adminLoginSchema';
import { useSetAtom } from 'jotai';
import { isAdminLoginModalAtom } from '@/atoms';
import { useNavigate } from 'react-router-dom';
import { showToast } from '@/utils/toast';
import { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { useMutation } from '@tanstack/react-query';
import { postAdminLogin } from '@/api/auth';
import { getUserProfile } from '@/api/user';
import { userProfileAtom } from '@/atoms';

const AdminLoginModal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const setIsAdminLoginModalOpen = useSetAtom(isAdminLoginModalAtom);
  const setUserProfile = useSetAtom(userProfileAtom);

  const navigate = useNavigate();

  const adminLoginMutation = useMutation({
    mutationFn: postAdminLogin,
    onSuccess: async () => {
      showToast.success('관리자 로그인에 성공했습니다.');
      setIsAdminLoginModalOpen(false);

      localStorage.setItem('adminMode', 'true');
      try {
        const adminProfile = await getUserProfile();
        if (adminProfile) {
          setUserProfile(adminProfile);
        }
      } catch (error) {
        console.error('Failed to fetch admin profile:', error);
      }

      navigate('/home', { replace: true });
    },
    onError: () => {
      showToast.error('관리자 로그인에 실패했습니다.');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<adminLoginType>({
    resolver: zodResolver(adminLoginSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<adminLoginType> = async (data) => {
    adminLoginMutation.mutate(data);
  };

  return (
    <div
      onClick={() => setIsAdminLoginModalOpen(false)}
      className='fixed inset-0 bg-black/40 flex justify-center items-center z-50'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white rounded-xl flex flex-col overflow-hidden p-6 w-90 max-w-[90%] relative'
      >
        <button
          className='absolute right-6 top-6 text-gray-500 hover:text-black transition'
          onClick={() => setIsAdminLoginModalOpen(false)}
        >
          <X size={20} />
        </button>

        <h2 className='text-xl font-semibold mb-10 text-center'>관리자 로그인</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col mb-6'>
            <label className='text-gray-600 mb-2 text-sm'>이메일</label>
            <input
              type='email'
              className={clsx(
                'border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500 transition',
                errors.email && 'border-red-500',
              )}
              placeholder='이메일을 입력하세요'
              {...register('email')}
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-2 text-left'>{errors.email.message}</p>
            )}
          </div>

          <div className='flex flex-col mb-8'>
            <label className='text-gray-600 mb-2 text-sm'>비밀번호</label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                className={clsx(
                  'w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500 transition',
                  errors.password && 'border-red-500',
                )}
                placeholder='비밀번호를 입력하세요'
                {...register('password')}
              />
              <button
                type='button'
                onClick={() => setShowPassword((prev) => !prev)}
                className='absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600'
              >
                {showPassword ? <IoEyeOutline size={22} /> : <IoEyeOffOutline size={22} />}
              </button>
            </div>
            {errors.password && (
              <p className='text-red-500 text-sm mt-2 text-left'>{errors.password.message}</p>
            )}
          </div>

          <Button type='submit' className='bg-black text-white py-3 rounded-lg w-full'>
            로그인
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
