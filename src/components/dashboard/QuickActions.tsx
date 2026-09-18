import React from 'react';
import { Play, GitBranch, Cpu, FileCheck, Sparkles } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useTranslation } from '../../context/LanguageContext';

export interface QuickActionsProps {
  onRunScan: () => void;
  onAuditRepo: () => void;
  onLaunchSandbox: () => void;
  onExportCompliance: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onRunScan,
  onAuditRepo,
  onLaunchSandbox,
  onExportCompliance,
}) => {
  const { t } = useTranslation();

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyber-500" />
          {t.dashboard.quickActions.title}
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Button
          variant="primary"
          size="sm"
          onClick={onRunScan}
          leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
          className="w-full justify-center text-xs py-2.5"
        >
          {t.dashboard.quickActions.newScan}
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={onAuditRepo}
          leftIcon={<GitBranch className="w-3.5 h-3.5 text-cyber-500" />}
          className="w-full justify-center text-xs py-2.5"
        >
          {t.dashboard.quickActions.auditRepo}
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={onLaunchSandbox}
          leftIcon={<Cpu className="w-3.5 h-3.5 text-brand-500" />}
          className="w-full justify-center text-xs py-2.5"
        >
          {t.dashboard.quickActions.sandbox}
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={onExportCompliance}
          leftIcon={<FileCheck className="w-3.5 h-3.5 text-emerald-500" />}
          className="w-full justify-center text-xs py-2.5"
        >
          {t.dashboard.quickActions.compliance}
        </Button>
      </div>
    </Card>
  );
};
