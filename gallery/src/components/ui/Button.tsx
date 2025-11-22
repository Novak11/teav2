'use client';

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'font-mono text-xs uppercase tracking-wider transition-all',
          'border-2 focus:outline-none focus:ring-2 focus:ring-void-red focus:ring-offset-2 focus:ring-offset-void-black',
          {
            'bg-void-white text-void-black border-void-white hover:bg-void-red hover:border-void-red hover:text-void-white':
              variant === 'default',
            'bg-transparent text-void-white border-void-white hover:bg-void-white hover:text-void-black':
              variant === 'outline',
            'bg-transparent text-void-white border-transparent hover:text-void-red':
              variant === 'ghost',
          },
          {
            'px-6 py-3': size === 'default',
            'px-8 py-4 text-sm': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
