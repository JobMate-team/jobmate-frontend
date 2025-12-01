import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ children, type, className, disabled = false, onClick }: ButtonProps) => {
  const baseStyle =
    'px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:brightness-90 transition-all'; // 버튼 기본 스타일

  return (
    <button
      type={type}
      className={clsx(baseStyle, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
