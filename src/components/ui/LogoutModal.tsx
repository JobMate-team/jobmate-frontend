import Button from '../common/Button';

interface ModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal = ({ onConfirm, onCancel }: ModalProps) => {
  const isAdminMode = localStorage.getItem('adminMode') !== null;

  return (
    <div onClick={onCancel} className='fixed inset-0 bg-black/40 flex justify-center items-center'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white rounded-[10px] flex flex-col overflow-hidden px-5 py-10 space-y-3 w-80'
      >
        <div>
          <p className='text-center font-semibold text-xl'>
            {isAdminMode ? '관리자 모드를 종료합니다' : '로그아웃 하시겠습니까?'}
          </p>

          <p className='text-center text-[#767676] mt-1'>로그인 페이지로 이동합니다</p>
        </div>

        <div className='flex items-center justify-center gap-3 mt-3'>
          <Button
            type='button'
            onClick={onCancel}
            className='bg-white border border-[#DADADA] font-medium p-3 flex-1'
          >
            취소
          </Button>
          <Button
            type='button'
            onClick={onConfirm}
            className='bg-black text-white font-medium p-3 flex-1'
          >
            {isAdminMode ? '확인' : '로그아웃'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
