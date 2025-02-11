import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2',
          'text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);