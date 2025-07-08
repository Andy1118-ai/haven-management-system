import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationError {
  field: string;
  message: string;
}

export const validateField = (value: any, rules: ValidationRule, fieldName: string): string | null => {
  if (rules.required && (!value || value.toString().trim() === '')) {
    return `${fieldName} is required`;
  }

  if (value && rules.minLength && value.toString().length < rules.minLength) {
    return `${fieldName} must be at least ${rules.minLength} characters`;
  }

  if (value && rules.maxLength && value.toString().length > rules.maxLength) {
    return `${fieldName} must not exceed ${rules.maxLength} characters`;
  }

  if (value && rules.pattern && !rules.pattern.test(value.toString())) {
    return `${fieldName} format is invalid`;
  }

  if (rules.custom) {
    return rules.custom(value);
  }

  return null;
};

export const validateForm = (data: Record<string, any>, rules: Record<string, ValidationRule>): ValidationError[] => {
  const errors: ValidationError[] = [];

  Object.entries(rules).forEach(([field, rule]) => {
    const error = validateField(data[field], rule, field);
    if (error) {
      errors.push({ field, message: error });
    }
  });

  return errors;
};

// Common validation patterns
export const validationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(\+254|0)[17]\d{8}$/, // Kenyan phone number format
  kenyanId: /^\d{8}$/, // Kenyan ID number format
  postalCode: /^\d{5}$/, // Kenyan postal code format
};

// Form error display component
export const FormErrors: React.FC<{ errors: ValidationError[] }> = ({ errors }) => {
  if (errors.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
      <div className="flex">
        <AlertCircle className="w-5 h-5 text-red-400 mr-2 mt-0.5" />
        <div>
          <h3 className="text-sm font-medium text-red-800">
            Please correct the following errors:
          </h3>
          <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index}>{error.message}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};