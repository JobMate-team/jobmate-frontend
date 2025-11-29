import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  children,
  type,
  icon,
  iconPosition = 'left',
  className,
  disabled = false,
  onClick,
}: ButtonProps) => {
  const baseStyle =
    'px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:brightness-90 transition-all'; // 버튼 기본 스타일

  return (
    <button
      type={type}
      className={clsx(baseStyle, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </button>
  );
};

export default Button;
