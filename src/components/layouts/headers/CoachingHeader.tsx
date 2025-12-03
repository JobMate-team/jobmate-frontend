const CoachingHeader = () => {
  const coachStep = [
    { id: 1, content: '1. 질문 선택' },
    { id: 2, content: '2. 답변 작성' },
    { id: 3, content: '3. 피드백' },
  ];

  return (
    <div className='flex flex-col p-6'>
      <h3 className='text-white text-lg font-semibold mb-2'>면접 코칭</h3>
      <div className='flex gap-3'>
        {coachStep.map((step) => (
          <div key={step.id} className='bg-[#D1D1D1] rounded-lg text-xs font-medium px-2 py-1'>
            {step.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoachingHeader;
