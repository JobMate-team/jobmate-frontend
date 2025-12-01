import { KakaoIcon, LogoIcon } from '@/assets';
import Button from '@/components/common/Button';

const LoginPage = () => {
  return (
    <div className='relative bg-gray-50 h-dvh flex justify-center items-center p-4'>
      <div className='w-full max-w-sm p-4'>
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
            type='button'
            className='w-full bg-[#FEE500] font-medium'
            onClick={() => {
              console.log('로그인 버튼 클릭');
            }}
          >
            <KakaoIcon /> 카카오로 로그인
          </Button>
        </div>

        <p className='text-center text-[13px] text-[#6A7282] mt-4'>
          카카오 계정으로 간편하게 시작하세요
        </p>
      </div>

      <p className='absolute bottom-6 text-center w-full text-xs text-[#6A7282]'>
        로그인 시 서비스 이용약관 및 <br />
        개인정보 처리방침에 동의하게 됩니다
      </p>
    </div>
  );
};

export default LoginPage;
