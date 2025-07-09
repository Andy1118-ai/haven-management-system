import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:transform hover:scale-105 hover:shadow-lg btn-pulse';
  
  const variants = {
    primary: 'bg-primary-sage text-white hover:bg-primary-sage-dark focus:ring-primary-sage animate-pulse-gentle',
    secondary: 'bg-accent-sky text-white hover:bg-accent-sky-dark focus:ring-accent-sky',
    outline: 'border border-primary-sage bg-white text-primary-sage-dark hover:bg-primary-sage hover:text-white focus:ring-primary-sage',
    ghost: 'text-primary-sage-dark hover:text-primary-sage hover:bg-primary-sage/10 focus:ring-primary-sage',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 loading-dots" />
      ) : Icon ? (
        <Icon className="w-4 h-4 mr-2 transition-transform duration-300" />
      ) : null}
      {children}
    </button>
  );
};