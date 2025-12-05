import Button from '../common/Button';

interface ModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal = ({ onConfirm, onCancel }: ModalProps) => {
  return (
    <div className='fixed inset-0 bg-black/40 flex justify-center items-center'>
      <div className='bg-white rounded-[10px] flex flex-col overflow-hidden px-5 py-10 space-y-3 w-80'>
        <p className='text-center font-semibold text-xl'>로그아웃 하시겠습니까?</p>
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
            로그아웃
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
