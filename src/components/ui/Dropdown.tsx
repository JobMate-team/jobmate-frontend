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
}

const DropDown = ({ items, selected, placeholder, onSelect }: DropDownProps) => {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  let dropdownStyle: React.CSSProperties = {};

  if (buttonRef.current) {
    const rect = buttonRef.current.getBoundingClientRect();
    dropdownStyle = {
      position: 'absolute',
      top: rect.bottom + 8,
      left: rect.left,
      width: buttonRef.current.offsetWidth,
    };
  }

  const handleSelect = (item: string) => {
    onSelect(item);
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setAnimate(true));
    } else {
      setAnimate(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (buttonRef.current?.contains(target)) return;
      if (dropdownRef.current?.contains(target)) return;
      setOpen(false);
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
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
      {/* Trigger Button */}
      <button
        type='button'
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className={clsx(
          'bg-[#F3F3F5] rounded-lg p-2.5 px-4 text-sm flex justify-between outline-none',
          open ? 'border border-gray-300' : 'border border-transparent',
        )}
      >
        <p className={clsx(selected ? 'text-black font-medium' : 'text-[#717182]')}>
          {selected ?? placeholder}
        </p>
        <div className={clsx('transition-transform duration-300', open && 'rotate-180')}>
          <ChevronDown size={20} stroke='#717182' />
        </div>
      </button>

      {/* Portal dropdown */}
      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            className={clsx(
              ' bg-white shadow-lg rounded-lg border border-[#E5E5E5] p-3 transition-all duration-150 ease-out',
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2',
            )}
            style={dropdownStyle}
          >
            {items.map((item) => (
              <div
                key={item}
                className='cursor-pointer rounded-lg p-2.5 hover:bg-gray-100 text-sm'
                onClick={() => handleSelect(item)}
              >
                {item}
              </div>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
};

export default DropDown;
