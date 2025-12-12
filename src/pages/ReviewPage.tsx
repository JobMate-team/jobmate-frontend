import Button from '@/components/common/Button';
import { FiCalendar } from 'react-icons/fi';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { IoBusinessSharp } from 'react-icons/io5';
import { LuBriefcaseBusiness } from 'react-icons/lu';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';
import { ThumbsUp } from 'lucide-react';
import UpScrollButton from '@/components/ui/UpScrollButton';
import Modal from '@/components/common/Modal';
import { showToast } from '@/utils/toast';
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import DropDown from '@/components/ui/Dropdown';
import { jobItems, JOB_CATEGORY_MAP } from '@/data/coachItems';
import { useAtomValue } from 'jotai';
import { isAdminModeAtom, reviewRefreshAtom } from '@/atoms';
import {
  getUserReviews,
  toggleReviewLike,
  fetchUserReviewDetail,
  deleteMyReview,
  type UserReview,
} from '@/api/review';
import { getUserProfile } from '@/api/user';

const ReviewPage = () => {
  const [openIds, setOpenIds] = useState<number[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSortOrder, SetIsSortOrder] = useState(true);
  const [selectedJob, setSelectedJob] = useState<string>('전체');
  const [isPopular, setIsPopular] = useState(false);
  const navigate = useNavigate();

  const isAdminMode = useAtomValue(isAdminModeAtom);
  const reviewRefresh = useAtomValue(reviewRefreshAtom);

  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  useEffect(() => {
    // 현재 로그인한 사용자 정보 가져오기
    getUserProfile().then((user) => {
      if (user) {
        setCurrentUserId(user.id);
      }
    });
  }, []);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 10;

  // 스크롤 감지
  useEffect(() => {
    const mainElement = document.querySelector('main');

    const handleScroll = () => {
      if (mainElement && mainElement.scrollTop > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll);
      return () => mainElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const fetchReviews = useCallback(async () => {
    try {
      const jobCategoryId = selectedJob ? JOB_CATEGORY_MAP[selectedJob] : undefined;
      // 인기순이 선택되면 'popular', 아니면 기본값 'latest'
      const sort = isPopular ? 'popular' : 'latest';

      const data = await getUserReviews({
        sort,
        job_category_id: jobCategoryId,
        limit: LIMIT,
        offset: offset,
      });

      if (data.length < LIMIT) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      if (offset === 0) {
        setReviews(data);
      } else {
        setReviews((prev) => [...prev, ...data]);
      }

      // 데이터 보정: 각 리뷰에 대해 상세 정보를 가져와서 liked, user_id 등을 업데이트
      // N+1 요청이 발생하지만, 리스트 API에서 정보가 부족하여 클라이언트 측에서 처리
      if (data.length > 0) {
        const enrichedData = await Promise.all(
          data.map(async (review) => {
            const detail = await fetchUserReviewDetail(review.id);
            if (detail) {
              return {
                ...review,
                liked: detail.liked,
                user_id: detail.user_id, // user_id도 확실하게 업데이트
                // 필요한 경우 다른 필드도 업데이트
              };
            }
            return review;
          }),
        );

        // 상태 업데이트
        setReviews((prev) =>
          prev.map((r) => {
            const enriched = enrichedData.find((e) => e.id === r.id);
            return enriched || r;
          }),
        );
      }
    } catch (error) {
      console.error('Failed to fetch reviews', error);
      showToast.error('리뷰를 불러오는데 실패했습니다.');
    }
  }, [selectedJob, isPopular, offset]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews, reviewRefresh]);

  const handleDelete = async () => {
    if (!deleteTargetId) return;

    try {
      const success = await deleteMyReview(deleteTargetId);
      if (success) {
        showToast.success('리뷰가 성공적으로 삭제되었습니다.');
        setOffset(0);
        fetchReviews();
      }
    } catch (error: unknown) {
      const err = error as { reason?: string };
      if (err && err.reason) {
        showToast.error(err.reason);
      } else {
        showToast.error('리뷰 삭제에 실패했습니다.');
      }
    } finally {
      setIsModalOpen(false);
      setDeleteTargetId(null);
    }
  };

  const loadMore = () => {
    setOffset((prev) => prev + LIMIT);
  };

  const filterJobItems = ['전체', ...jobItems];

  return (
    <div className='space-y-5 relative pb-30 '>
      <div className='hidden sm:flex items-center justify-between'>
        <div className='flex flex-col mt-10'>
          <h3 className='text-2xl font-semibold mb-2'>면접 후기</h3>
          <p className='text-[#717182] mb-6'>
            면접 경험을 공유하고 다른 취준생들이 남긴 후기에서 인사이트를 얻어보세요
          </p>
        </div>
        <Button
          type='button'
          onClick={() => navigate('/review/create')}
          className='bg-black text-white font-medium text-sm px-2.5 py-2 border border-[#E5E5E5] whitespace-nowrap'
        >
          <FaPlus size={16} />
          후기 작성
        </Button>
      </div>

      <div className='flex justify-between items-center'>
        <div className='flex gap-3'>
          <div className='border border-gray-300 rounded-lg sm:h-10 h-9 flex items-center'>
            <DropDown
              items={filterJobItems}
              selected={selectedJob}
              placeholder='직군'
              onSelect={(job) => {
                setSelectedJob(job);
                setOffset(0);
              }}
              bgColor='bg-white'
              borderColor='border-transparent'
              SmPadding='sm:py-[8px] py-[6px]'
            />
          </div>

          <Button
            type='button'
            onClick={() => {
              setIsPopular((prev) => !prev);
              setOffset(0);
            }}
            className={clsx(
              'px-4 max-sm:text-sm sm:h-10 h-9 flex items-center border',
              isPopular ? 'bg-black text-white' : 'bg-white border-gray-300 hover:bg-gray-200',
            )}
          >
            인기순
          </Button>
        </div>

        <Button
          type='button'
          onClick={() => {
            SetIsSortOrder((prev) => !prev);
            // 클라이언트 사이드 정렬이므로 offset 초기화 안 함
          }}
          className='text-sm px-3 text-gray-700 h-10 flex items-center hover:text-gray-900'
        >
          {isSortOrder ? '최신순' : '오래된순'}
        </Button>
      </div>

      {reviews.length === 0 ? (
        <div className='text-center py-20 text-gray-500'>등록된 후기가 없습니다.</div>
      ) : (
        (isPopular || isSortOrder ? reviews : [...reviews].reverse()).map((data) => {
          const isOpen = openIds.includes(data.id);
          const isOwner = currentUserId === data.user_id;

          return (
            <div
              key={data.id}
              className='bg-white rounded-xl px-6 py-5 border border-[#E5E5E5] flex flex-col gap-4'
            >
              <div className='flex items-center justify-between pl-2'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-full bg-black flex items-center justify-center font-medium text-lg text-white'>
                    {(data.user_name || data.nickname || '').charAt(0)}
                  </div>
                  <div>
                    <p className='text-lg font-medium'>{data.user_name || data.nickname}</p>
                    <p className='text-[#6A7282] text-sm flex items-center gap-1'>
                      <FiCalendar size={16} />
                      {data.created_at.split('T')[0]}
                    </p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <button
                    type='button'
                    onClick={async (e) => {
                      e.stopPropagation();
                      const response = await toggleReviewLike(data.id);
                      if (response.resultType === 'SUCCESS' && response.success) {
                        const isLiked = response.success.liked;
                        setReviews((prev) =>
                          prev.map((r) =>
                            r.id === data.id
                              ? {
                                  ...r,
                                  liked: isLiked,
                                  likes: isLiked ? r.likes + 1 : r.likes - 1,
                                }
                              : r,
                          ),
                        );
                      } else if (response.error) {
                        if (response.error.errorCode === 'ADMIN_CANNOT_LIKE') {
                          showToast.error('관리자는 좋아요 기능을 사용할 수 없습니다.');
                        } else {
                          showToast.error(response.error.reason || '좋아요 처리에 실패했습니다.');
                        }
                      }
                    }}
                    className='flex items-center gap-1 mr-4 text-[#717182] hover:text-blue-500 transition-colors'
                  >
                    <ThumbsUp
                      size={20}
                      className={data.liked ? 'text-blue-500 fill-blue-500' : ''}
                    />
                    <p>{data.likes}</p>
                  </button>
                  {(isOwner || isAdminMode) && (
                    <>
                      <button
                        type='button'
                        onClick={() => navigate(`/review/edit/${data.id}`)}
                        className='bg-white rounded-full p-2 hover:brightness-90 transition outline-none'
                      >
                        <FaRegEdit size={16} className='text-[#7371cc]' />
                      </button>

                      <button
                        type='button'
                        onClick={() => {
                          setDeleteTargetId(data.id);
                          setIsModalOpen(true);
                        }}
                        className='bg-white rounded-full p-2 hover:brightness-90 transition outline-none'
                      >
                        <FaRegTrashAlt size={16} className='text-[#FB2C36]' />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className='flex items-center gap-2 mb-1 pl-2'>
                <div className='flex items-center text-xs border border-[#E5E5E5] rounded-lg p-1 px-2 gap-1'>
                  <IoBusinessSharp size={14} />
                  {data.company_name}
                </div>
                <div className='flex items-center text-xs border border-[#E5E5E5] rounded-lg p-1 px-2 gap-1'>
                  <LuBriefcaseBusiness size={14} />
                  {data.job_category_name}
                </div>
              </div>
              <p className='text-[#364153] leading-[22px] line-clamp-4 whitespace-pre-wrap'>
                {data.content}
              </p>

              {isOpen && (
                <div className='bg-[#F3F3F5] rounded-xl p-6 flex flex-col gap-4 mt-3'>
                  <p className='font-semibold'>💡 면접 준비 팁</p>
                  <p className='text-[#364153] leading-5 whitespace-pre-wrap'>
                    {data.interview_tip}
                  </p>
                </div>
              )}

              <div className='flex items-center justify-center'>
                <button
                  type='button'
                  onClick={() =>
                    setOpenIds((prev) =>
                      prev.includes(data.id)
                        ? prev.filter((id) => id !== data.id)
                        : [...prev, data.id],
                    )
                  }
                  className='flex flex-row items-center gap-1 mt-1 cursor-pointer outline-none hover:text-[#585858]'
                >
                  <ChevronDown size={20} className={clsx(isOpen ? 'rotate-180' : 'rotate-0')} />
                  <span className='text-sm font-medium'>{isOpen ? '접기' : '더보기'}</span>
                </button>
              </div>
            </div>
          );
        })
      )}

      {hasMore && reviews.length > 0 && (
        <div className='flex justify-center mt-6'>
          <Button
            type='button'
            onClick={loadMore}
            className='bg-white border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 text-sm'
          >
            더보기
          </Button>
        </div>
      )}

      {isModalOpen && (
        <Modal
          title='해당 후기를 삭제하시겠습니까?'
          content='이 작업은 되돌릴 수 없습니다.'
          onCancel={() => setIsModalOpen((prev) => !prev)}
          onConfirm={handleDelete}
        />
      )}

      {showScrollTop && <UpScrollButton />}
      <Outlet />
    </div>
  );
};

export default ReviewPage;
