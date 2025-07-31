import React, { forwardRef } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'neon' | 'gradient' | 'minimal';
  hover?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', hover = true, glow = false, children, className = '', ...props }, ref) => {
    const baseClasses = 'relative rounded-3xl transition-all duration-500';
    
    const variants = {
      default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg',
      glass: 'bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-2xl',
      neon: 'bg-gray-900 border-2 border-cyan-400 shadow-lg shadow-cyan-400/25',
      gradient: 'bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-purple-200 dark:border-purple-700 shadow-lg',
      minimal: 'bg-gray-50 dark:bg-gray-800/50 border-0 shadow-sm'
    };

    const hoverEffect = hover ? 'hover:scale-105 hover:-translate-y-2 hover:shadow-2xl' : '';
    const glowEffect = glow ? 'shadow-2xl shadow-blue-500/25' : '';

    return (
      <div
        ref={ref}
        className={`${baseClasses} ${variants[variant]} ${hoverEffect} ${glowEffect} ${className}`}
        {...props}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Glow Ring */}
        {glow && (
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl opacity-20 blur-lg animate-pulse"></div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
