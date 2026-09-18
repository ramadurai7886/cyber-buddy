import React from 'react';
import { MentalWellnessCorner } from '../components/wellness/MentalWellnessCorner';

export const WellnessPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        <MentalWellnessCorner />
      </div>
    </div>
  );
};
