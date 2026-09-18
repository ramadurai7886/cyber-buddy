import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';
import { LanguageCode } from '../../types/translations';

export const LanguageSelector: React.FC<{ variant?: 'compact' | 'full'; className?: string }> = ({
  variant = 'compact',
  className = '',
}) => {
  const { language, setLanguage, supportedLanguages, currentLanguageOption } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 hover:border-cyber-500/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-400"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select application language"
      >
        <Globe className="w-3.5 h-3.5 text-cyber-500" />
        <span>{variant === 'compact' ? currentLanguageOption.nativeName : `${currentLanguageOption.nativeName} (${currentLanguageOption.name})`}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-80 overflow-y-auto">
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
            Select Language (11 Languages)
          </div>
          {supportedLanguages.map(item => {
            const isSelected = item.code === language;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => handleSelect(item.code)}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors ${
                  isSelected
                    ? 'bg-cyber-500/10 text-cyber-600 dark:text-cyber-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{item.flag}</span>
                  <div>
                    <div className="font-medium">{item.nativeName}</div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500">{item.name}</div>
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-cyber-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
