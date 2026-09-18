import React from 'react';
import { Shield, Lock, Terminal, Globe, Heart } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyber-500 to-brand-600 flex items-center justify-center text-slate-950">
                <Shield className="w-4 h-4 text-slate-950 stroke-[2.2]" />
              </div>
              <span className="font-bold text-base text-slate-900 dark:text-slate-100 tracking-tight">
                CyberBuddy Studio
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm text-slate-600 dark:text-slate-400">
              {t.footer.description}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                SOC2 Type II Ready
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-cyber-500/10 text-cyber-600 dark:text-cyber-400 border border-cyber-500/20">
                <Lock className="w-3 h-3" />
                Zero-Telemetry Local Scan
              </span>
            </div>
          </div>

          {/* Nav Column 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              {t.footer.product}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-cyber-500 transition-colors">SAST & DAST Engine</a></li>
              <li><a href="#features" className="hover:text-cyber-500 transition-colors">AI Code Hardening</a></li>
              <li><a href="#how-it-works" className="hover:text-cyber-500 transition-colors">CI/CD Guardrails</a></li>
              <li><a href="#assistant" className="hover:text-cyber-500 transition-colors">Local Threat Copilot</a></li>
            </ul>
          </div>

          {/* Nav Column 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              {t.footer.resources}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#architecture" className="hover:text-cyber-500 transition-colors">Architecture Overview</a></li>
              <li><a href="#multilingual" className="hover:text-cyber-500 transition-colors">11 Indic Languages</a></li>
              <li><a href="#compliance" className="hover:text-cyber-500 transition-colors">Security Benchmark</a></li>
              <li><a href="/dashboard" className="hover:text-cyber-500 transition-colors">Studio Console</a></li>
            </ul>
          </div>

          {/* Nav Column 3: Language & Localization */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyber-500" />
              Language
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Select your native Indian language:
            </p>
            <LanguageSelector variant="full" />
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CyberBuddy Studio. {t.footer.rights}</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Built with precision for developers
            </span>
            <span>•</span>
            <span className="font-mono text-[11px]">v2.4.0-stable</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
