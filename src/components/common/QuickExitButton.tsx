import React from 'react';
import { EyeOff } from 'lucide-react';
import { useDiscreet } from '../../context/DiscreetContext';
import { useTranslation } from '../../context/LanguageContext';

export const QuickExitButton: React.FC<{ className?: string; compact?: boolean }> = ({
  className = '',
  compact = false,
}) => {
  const { triggerQuickExit } = useDiscreet();
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={() => triggerQuickExit()}
      title={`${t.common.quickExitHint} (Press Esc key anytime)`}
      aria-label={t.common.quickExit}
      className={`inline-flex items-center gap-1.5 font-extrabold rounded-xl transition-all duration-150 active:scale-95 text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-600/20 border border-rose-500/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 select-none group ${
        compact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-1.5 text-xs'
      } ${className}`}
    >
      <EyeOff className="w-3.5 h-3.5 shrink-0 group-hover:animate-pulse" />
      <span>{compact ? 'Exit' : t.common.quickExit}</span>
      {!compact && (
        <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[9px] font-mono font-black bg-rose-800/60 rounded text-rose-200 border border-rose-400/30 ml-0.5">
          Esc
        </kbd>
      )}
    </button>
  );
};
