import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyber' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyber',
  size = 'sm',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 font-medium tracking-wide',
    md: 'text-xs px-3 py-1 font-semibold',
  };

  const variantStyles = {
    cyber: 'bg-cyber-500/10 text-cyber-700 dark:text-cyber-400 border border-cyber-500/30',
    success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30',
    error: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/30',
    neutral: 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full uppercase ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
