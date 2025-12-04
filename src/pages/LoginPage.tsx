import { KakaoIcon, LogoIcon } from '@/assets';
import Button from '@/components/common/Button';
import { showToast } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <main className='relative bg-gray-50 min-h-dvh flex justify-center items-center p-4'>
      <section className='w-full max-w-sm p-4'>
        {/* 아이콘 */}
        <div className='flex justify-center'>
          <div className='flex justify-center items-center rounded-3xl mb-10 bg-black w-30 h-30'>
            <LogoIcon />
          </div>
        </div>

        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-1'>JobMate.AI</h1>
          <p className='text-gray-700 min-h-12 whitespace-pre-line'>
            AI 면접 코칭으로 합격을 준비하세요
          </p>
        </div>

        <div className='flex items-center gap-5 mx-5'>
          <Button
            type='submit'
            className='w-full bg-[#FEE500] font-medium px-4 py-3 gap-2'
            onClick={() => {
              navigate('/role');
              showToast.success('카카오 로그인 성공!');
            }}
          >
            <KakaoIcon /> 카카오로 로그인
          </Button>
        </div>

        <p className='text-center text-[13px] text-[#6A7282] mt-4'>
          카카오 계정으로 간편하게 시작하세요
        </p>
      </section>

      <p className='absolute bottom-6 text-center w-full text-xs text-[#6A7282]'>
        로그인 시 서비스 이용약관 및 <br />
        개인정보 처리방침에 동의하게 됩니다
      </p>
    </main>
  );
};

export default LoginPage;
