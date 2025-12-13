import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

interface DropDownProps {
  items: string[];
  selected: string | null;
  placeholder?: string;
  // eslint-disable-next-line no-unused-vars
  onSelect: (item: string) => void;
  bgColor?: string;
  borderColor?: string;
  SmPadding?: string;
  disabled?: boolean;
  onDisabledClick?: () => void;
}

const DropDown = ({
  items,
  selected,
  placeholder,
  onSelect,
  bgColor = 'bg-[#F3F3F5]',
  borderColor = 'border-gray-300',
  SmPadding = 'py-2.5 sm:py-3',
  disabled,
  onDisabledClick,
}: DropDownProps) => {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // --- 드롭다운 위치 계산 ---
  let dropdownStyle: React.CSSProperties = {};

  if (buttonRef.current) {
    const rect = buttonRef.current.getBoundingClientRect();
    dropdownStyle = {
      position: 'absolute',
      top: rect.bottom + 8,
      left: rect.left,
      width: buttonRef.current.offsetWidth,
      zIndex: 100,
    };
  }

  // 화면 중앙 체크
  const isDropDownCentered = () => {
    if (!buttonRef.current) return true;
    const rect = buttonRef.current.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;

    // 중앙 기준 ±80px 범위 안이면 OK
    return Math.abs(elementCenter - viewportCenter) <= 40;
  };

  // --- 스크롤 이동 후 OPEN ---
  const handleToggle = () => {
    if (disabled) {
      onDisabledClick?.();
      return;
    }

    if (!open) {
      const isCenter = isDropDownCentered();

      if (isCenter) setOpen(true);
      else {
        buttonRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        setTimeout(() => setOpen(true), 150);
      }
    } else {
      setOpen(false);
    }
  };

  // --- 스크롤 잠금 ---
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const preventScroll = (e: TouchEvent) => {
      if (dropdownRef.current?.contains(e.target as Node)) {
        return; // 드롭다운 내부는 스크롤 허용
      }
      e.preventDefault();
    };

    document.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [open]);

  const closeDropdown = () => {
    setOpen(false);
  };

  const handleSelect = (item: string) => {
    onSelect(item);
    closeDropdown();
  };

  // 애니메이션 처리
  useEffect(() => {
    if (open) requestAnimationFrame(() => setAnimate(true));
    else setAnimate(false);
  }, [open]);

  // 외부 클릭/ESC 감지
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (buttonRef.current?.contains(target)) return;
      if (dropdownRef.current?.contains(target)) return;

      closeDropdown();
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDropdown();
    };

    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [open]);

  return (
    <>
      {/* Trigger */}
      <button
        type='button'
        ref={buttonRef}
        onClick={handleToggle}
        className={clsx(
          bgColor,
          SmPadding,
          'rounded-lg pr-2 pl-4 max-sm:text-sm flex justify-between items-center outline-none gap-2 border w-full',
          open ? borderColor : 'border-transparent',
        )}
      >
        <p
          className={clsx(
            'whitespace-normal wrap-break-word flex-1 text-left leading-5',
            selected ? 'text-black' : 'text-[#717182]',
          )}
        >
          {selected ?? placeholder}
        </p>
        <div className={clsx('transition-transform duration-300', open && 'rotate-180')}>
          <ChevronDown size={20} stroke='#717182' />
        </div>
      </button>

      {/* Portal + overlay */}
      {open &&
        createPortal(
          <>
            {/* Overlay (스크린 전체 클릭/스크롤 차단) */}
            <div className='fixed inset-0 z-50 bg-transparent' onClick={closeDropdown} />

            {/* 실제 드롭다운 */}
            <div
              ref={dropdownRef}
              className={clsx(
                'bg-white shadow-lg rounded-lg border border-[#E5E5E5] p-3 transition-all duration-150 ease-out z-50 max-h-70 thin-scrollbar min-w-50 wrap-break-word dropdown-scroll',
                animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2',
              )}
              style={dropdownStyle}
            >
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className='cursor-pointer rounded-lg sm:p-4 p-2.5 hover:bg-gray-100 max-sm:text-sm whitespace-normal wrap-break-word break-keep leading-5'
                  onClick={() => handleSelect(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </>,
          document.body,
        )}
    </>
  );
};

export default DropDown;
