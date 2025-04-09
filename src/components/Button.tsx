'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  external?: boolean;
}

export default function Button({
  children,
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  rounded = 'full',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'right',
  onClick,
  className = '',
  ariaLabel,
  external = false,
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:from-red-700 hover:to-red-800 focus:ring-red-500',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600/10 focus:ring-red-500',
    ghost: 'bg-transparent text-red-600 hover:bg-red-600/10 focus:ring-red-500',
    danger: 'bg-red-700 text-white hover:bg-red-800 focus:ring-red-500',
  };
  
  const sizeClasses = {
    sm: 'py-1.5 px-4 text-xs',
    md: 'py-2 px-5 text-sm',
    lg: 'py-3 px-8 text-base',
    xl: 'py-4 px-10 text-lg',
  };
  
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };
  
  const disabledClasses = disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';
  const widthClasses = fullWidth ? 'w-full' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClasses[rounded]} ${disabledClasses} ${widthClasses} ${className}`;
  
  const content = (
    <>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </>
  );
  
  const motionProps = {
    whileHover: !disabled ? { scale: 1.03 } : undefined,
    whileTap: !disabled ? { scale: 0.97 } : undefined,
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  };

  if (href) {
    const linkProps = {
      href,
      className: classes,
      ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
      'aria-label': ariaLabel,
    };

    return (
      <motion.div {...motionProps}>
        <Link {...linkProps}>{content}</Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={ariaLabel}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
} 