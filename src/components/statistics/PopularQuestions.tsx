import type { PopularQuestion } from '@/types/statistics';

interface PopularQuestionsProps {
    popularQuestions: PopularQuestion[];
}

const PopularQuestions = ({ popularQuestions }: PopularQuestionsProps) => {
    return (
        <div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col h-full'>
            <h2 className='text-lg font-bold text-gray-900 mb-6'>인기 질문 TOP 5</h2>
            <div className='flex flex-col gap-3 flex-1'>
                {popularQuestions.map((item, index) => (
                    <div
                        key={item.id}
                        className='flex items-center justify-between p-4 bg-gray-50 rounded-lg gap-3'
                    >
                        <div className='flex items-center gap-3'>
                            <div className='w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold shrink-0'>
                                {index + 1}
                            </div>
                            <span className='text-gray-900 text-sm font-medium break-keep'>{item.content}</span>
                        </div>
                        <div className='px-2 py-1 bg-black text-white text-xs rounded-full font-medium shrink-0 whitespace-nowrap'>
                            {item.used_count}회
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularQuestions;
