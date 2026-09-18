import React from 'react';
import { EyeOff, AlertTriangle } from 'lucide-react';
import { useDiscreet } from '../../context/DiscreetContext';

export const QuickExitButton: React.FC<{ className?: string; compact?: boolean }> = ({
  className = '',
  compact = false,
}) => {
  const { triggerQuickExit } = useDiscreet();

  return (
    <button
      type="button"
      onClick={triggerQuickExit}
      title="Instantly hide this screen and show weather utility (Shortcut: Esc or Alt+Q)"
      aria-label="Quick Exit to discreet screen"
      className={`inline-flex items-center gap-1.5 font-bold rounded-lg transition-all duration-150 active:scale-95 text-white bg-rose-600 hover:bg-rose-700 shadow-sm border border-rose-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 select-none ${
        compact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-1.5 text-xs'
      } ${className}`}
    >
      <EyeOff className="w-3.5 h-3.5 shrink-0" />
      <span>{compact ? 'Exit' : 'Quick Exit'}</span>
    </button>
  );
};
