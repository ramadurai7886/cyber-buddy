import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowOnHover?: boolean;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glowOnHover = false,
  interactive = false,
  ...props
}) => {
  return (
    <div
      className={`rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm p-6 shadow-sm transition-all duration-200 ${
        glowOnHover ? 'hover:border-cyber-500/40 hover:shadow-glow-sm' : ''
      } ${interactive ? 'hover:-translate-y-0.5 cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
