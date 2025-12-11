interface ReviewDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function ReviewDeleteModal({
    isOpen,
    onClose,
    onConfirm,
}: ReviewDeleteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden animate-fade-in text-center p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    해당 후기를 삭제하시겠습니까?
                </h3>
                <p className="text-gray-500 mb-8">
                    이 작업은 되돌릴 수 없습니다.
                </p>

                <div className="flex flex-col space-y-3">
                    <button
                        onClick={onConfirm}
                        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                        삭제
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full bg-white text-black py-3 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}
