import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Skeleton } from '../common/Skeleton';
import { SecurityActivity } from '../../types/dashboard';
import { useTranslation } from '../../context/LanguageContext';
import { ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

export interface ActivityTableProps {
  activities: SecurityActivity[];
  isLoading?: boolean;
  isEmpty?: boolean;
}

export const ActivityTable: React.FC<ActivityTableProps> = ({
  activities,
  isLoading = false,
  isEmpty = false,
}) => {
  const { t } = useTranslation();

  const getSeverityBadge = (severity: SecurityActivity['severity']) => {
    switch (severity) {
      case 'Critical':
        return <Badge variant="error">Critical</Badge>;
      case 'High':
        return <Badge variant="warning">High</Badge>;
      case 'Medium':
        return <Badge variant="warning">Medium</Badge>;
      case 'Low':
        return <Badge variant="neutral">Low</Badge>;
      case 'Clean':
        return <Badge variant="success">Clean</Badge>;
    }
  };

  const getStatusBadge = (status: SecurityActivity['status']) => {
    switch (status) {
      case 'Fixed':
        return (
          <span className="inline-flex items-center gap-1 text-xs text-emerald-500 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> Fixed
          </span>
        );
      case 'Investigating':
        return (
          <span className="inline-flex items-center gap-1 text-xs text-amber-500 font-medium">
            <Clock className="w-3.5 h-3.5" /> Investigating
          </span>
        );
      case 'Blocked':
        return (
          <span className="inline-flex items-center gap-1 text-xs text-rose-500 font-medium">
            <ShieldAlert className="w-3.5 h-3.5" /> Blocked
          </span>
        );
      case 'Monitoring':
        return (
          <span className="inline-flex items-center gap-1 text-xs text-cyber-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" /> Monitoring
          </span>
        );
    }
  };

  return (
    <Card className="p-0 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            {t.dashboard.recentActivity.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.dashboard.recentActivity.subtitle}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="p-6 space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      ) : isEmpty || activities.length === 0 ? (
        <div className="py-12 px-4 text-center">
          <ShieldAlert className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            {t.dashboard.recentActivity.emptyState}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-mono text-[11px]">
              <tr>
                <th className="px-6 py-3 font-semibold">{t.dashboard.recentActivity.colTarget}</th>
                <th className="px-6 py-3 font-semibold">{t.dashboard.recentActivity.colType}</th>
                <th className="px-6 py-3 font-semibold">{t.dashboard.recentActivity.colSeverity}</th>
                <th className="px-6 py-3 font-semibold">{t.dashboard.recentActivity.colStatus}</th>
                <th className="px-6 py-3 font-semibold text-right">{t.dashboard.recentActivity.colTime}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {activities.map(item => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-6 py-3.5 font-mono text-slate-900 dark:text-slate-100 font-medium">
                    {item.target}
                  </td>
                  <td className="px-6 py-3.5 text-slate-600 dark:text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[11px]">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">{getSeverityBadge(item.severity)}</td>
                  <td className="px-6 py-3.5">{getStatusBadge(item.status)}</td>
                  <td className="px-6 py-3.5 text-right font-mono text-slate-400">
                    {item.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};
