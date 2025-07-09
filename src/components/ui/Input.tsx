import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  helpText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon: Icon,
  helpText,
  className = '',
  ...props
}) => {
  const inputClasses = `
    w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-sage focus:border-primary-sage transition-all duration-300 hover:shadow-md font-body
    ${error ? 'border-red-500' : 'border-primary-sage/30'}
    ${Icon ? 'pl-10' : ''}
    ${className}
  `;

  return (
    <div className="space-y-1 animate-slide-in-up">
      {label && (
        <label className="block text-sm font-heading font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-sage transition-colors duration-300" />
        )}
        <input
          className={inputClasses}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 font-body animate-slide-in-left">{error}</p>
      )}
      {helpText && !error && (
        <p className="text-sm text-gray-500 font-body">{helpText}</p>
      )}
    </div>
  );
};