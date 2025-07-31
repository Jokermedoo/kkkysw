import React, { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient' | 'neon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  glow?: boolean;
  pulse?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    icon: Icon, 
    iconPosition = 'left',
    loading = false,
    glow = false,
    pulse = false,
    children, 
    className = '', 
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = 'relative inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group';
    
    const variants = {
      primary: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl focus:ring-blue-500/25',
      secondary: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 shadow-lg hover:shadow-xl focus:ring-blue-500/25',
      ghost: 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-blue-500/25',
      gradient: 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl focus:ring-purple-500/25',
      neon: 'bg-gray-900 text-white border-2 border-cyan-400 shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/50 hover:bg-cyan-400 hover:text-gray-900 focus:ring-cyan-400/25'
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      xl: 'px-10 py-5 text-xl'
    };

    const glowEffect = glow ? 'animate-pulse shadow-2xl' : '';
    const pulseEffect = pulse ? 'animate-pulse' : '';

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${glowEffect} ${pulseEffect} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        
        {/* Content */}
        <div className="relative flex items-center space-x-2 space-x-reverse">
          {loading ? (
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
              <span>{children}</span>
              {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
            </>
          )}
        </div>

        {/* Glow Effect */}
        {glow && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
