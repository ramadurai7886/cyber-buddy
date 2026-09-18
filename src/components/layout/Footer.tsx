import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, PhoneCall, Globe, Lock } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-brand-600 flex items-center justify-center text-white shadow-sm">
                <Shield className="w-4 h-4 fill-white/20 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-base text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-1.5">
                {t.common.appName}
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-md text-slate-500 dark:text-slate-400">
              {t.common.tagline}. A confidential, trauma-informed digital first-aid ecosystem providing immediate reassurance, psychological support, and official cyber reporting tools for women across India.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Lock className="w-3 h-3" />
                100% On-Device Encrypted
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                <Heart className="w-3 h-3 fill-current" />
                Free 24/7 Government Support
              </span>
            </div>
          </div>

          {/* Quick Helplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              {t.helplines.title}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="tel:1930" className="hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1.5">
                  <PhoneCall className="w-3 h-3 text-cyber-500" />
                  <span>National Cyber Crime: <strong>1930</strong></span>
                </a>
              </li>
              <li>
                <a href="tel:181" className="hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1.5">
                  <PhoneCall className="w-3 h-3 text-rose-500" />
                  <span>Women Helpline: <strong>181</strong></span>
                </a>
              </li>
              <li>
                <a href="tel:18005990019" className="hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1.5">
                  <PhoneCall className="w-3 h-3 text-emerald-500" />
                  <span>KIRAN Counseling: <strong>1800-599-0019</strong></span>
                </a>
              </li>
              <li>
                <a href="tel:112" className="hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1.5">
                  <PhoneCall className="w-3 h-3 text-amber-500" />
                  <span>Police Emergency: <strong>112</strong></span>
                </a>
              </li>
            </ul>
          </div>

          {/* Language Selector Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyber-500" />
              Language (11 Languages)
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Choose your preferred native language:
            </p>
            <LanguageSelector variant="full" />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Cyber Buddy. Dedicated to women safety and dignity in India.</p>
          <div className="flex items-center gap-3">
            <Link to="/emergency" className="hover:text-rose-500">Emergency Help</Link>
            <span>•</span>
            <Link to="/wellness" className="hover:text-rose-500">Wellness Corner</Link>
            <span>•</span>
            <Link to="/helplines" className="hover:text-rose-500">Legal Rights & Helplines</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
