import Button from './Button';

interface ModalProps {
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal = ({ title, content, onConfirm, onCancel }: ModalProps) => {
  return (
    <div className='fixed inset-0 bg-black/50 flex justify-center items-center'>
      <div className='bg-white rounded-[10px] flex flex-col overflow-hidden px-5 py-8 space-y-3 w-[360px]'>
        <p className='text-center font-extrabold text-xl'>{title}</p>
        <p className='text-center font-normal text-sm text-[#717182] px-8'>{content}</p>
        <Button
          type='button'
          onClick={onConfirm}
          className='bg-black text-white text-sm font-semibold mt-1'
        >
          삭제
        </Button>
        <Button
          type='button'
          onClick={onCancel}
          className='bg-white border border-[#DADADA] text-sm font-semibold'
        >
          취소
        </Button>
      </div>
    </div>
  );
};

export default Modal;
