import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>}
        <input
          ref={ref}
          className={`block w-full rounded-lg border-0 bg-white/5 py-2.5 px-4 text-white placeholder-gray-500 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm transition-all ${error ? 'ring-red-500/50' : ''} ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
