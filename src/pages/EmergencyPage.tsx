import React from 'react';
import { EmergencyWizard } from '../components/emergency/EmergencyWizard';

export const EmergencyPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 transition-colors">
      <EmergencyWizard />
    </div>
  );
};
