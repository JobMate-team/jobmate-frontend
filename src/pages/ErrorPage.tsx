const ErrorPage = () => {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen text-center bg-gray-50'>
      <h1 className='text-3xl font-bold mb-4'>문제가 발생했습니다</h1>
      <p className='mb-8'>페이지를 불러오는 중 오류가 발생했습니다.</p>
      <a
        href='/home'
        className='px-4 py-3 rounded-xl border-2 border-gray-400 bg-white hover:brightness-90 transition'
      >
        홈으로 돌아가기
      </a>
    </main>
  );
};

export default ErrorPage;
