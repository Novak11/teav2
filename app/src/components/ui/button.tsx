import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide uppercase',
          {
            'bg-black text-white hover:bg-neutral-800 active:bg-neutral-900': variant === 'primary',
            'bg-white text-black border border-black hover:bg-black hover:text-white': variant === 'secondary',
            'border border-neutral-300 text-neutral-900 hover:border-black': variant === 'outline',
            'text-neutral-600 hover:text-black': variant === 'ghost',
            'text-neutral-900 underline-offset-4 hover:underline': variant === 'link',
          },
          {
            'text-xs px-4 py-2': size === 'sm',
            'text-xs px-6 py-3': size === 'md',
            'text-sm px-8 py-4': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
