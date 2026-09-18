import React from 'react';
import { Card } from '../common/Card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  description?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend = 'neutral',
  icon,
  description,
}) => {
  return (
    <Card glowOnHover className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-50">
            {value}
          </div>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-cyber-600 dark:text-cyber-400 border border-slate-200 dark:border-slate-700/60">
          {icon}
        </div>
      </div>

      {(change || description) && (
        <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
          {change && (
            <span
              className={`inline-flex items-center gap-1 font-medium ${
                trend === 'up'
                  ? 'text-emerald-500'
                  : trend === 'down'
                  ? 'text-rose-500'
                  : 'text-slate-500'
              }`}
            >
              {trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
              {trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
              {trend === 'neutral' && <Minus className="w-3.5 h-3.5" />}
              {change}
            </span>
          )}
          {description && (
            <span className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
              {description}
            </span>
          )}
        </div>
      )}
    </Card>
  );
};
