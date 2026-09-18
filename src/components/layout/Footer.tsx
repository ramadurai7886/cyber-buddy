import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Heart,
  PhoneCall,
  Globe,
  Lock,
  ExternalLink,
  EyeOff,
  CheckCircle2,
  FileCheck,
} from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  const hotlines = [
    {
      num: '1930',
      title: 'National Cyber Crime Reporting',
      sub: 'Ministry of Home Affairs (MHA)',
      color: 'border-cyber-500/30 bg-cyber-500/5 text-cyber-700 dark:text-cyber-300',
    },
    {
      num: '181',
      title: 'Women Helpline (Toll-Free)',
      sub: 'NCW 24/7 Domestic & Cyber Safety',
      color: 'border-rose-500/30 bg-rose-500/5 text-rose-700 dark:text-rose-300',
    },
    {
      num: '1800-599-0019',
      title: 'KIRAN Mental Health Line',
      sub: '24/7 Psychological First-Aid',
      color: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300',
    },
    {
      num: '112',
      title: 'All-India Emergency Police',
      sub: 'Immediate Distress & Physical Safety',
      color: 'border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-300',
    },
  ];

  const officialPortals = [
    {
      name: 'cybercrime.gov.in',
      url: 'https://cybercrime.gov.in',
      desc: 'Official MHA Cybercrime Reporting Portal',
    },
    {
      name: 'StopNCII.org',
      url: 'https://stopncii.org',
      desc: 'Free non-consensual image hash prevention',
    },
    {
      name: 'ncw.nic.in',
      url: 'http://ncw.nic.in',
      desc: 'National Commission for Women India',
    },
    {
      name: 'takeitdown.ncmec.org',
      url: 'https://takeitdown.ncmec.org',
      desc: 'Removal tool for minors / under-18 media',
    },
  ];

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 transition-colors">
      {/* Helpline Dialing Cards Strip */}
      <div className="border-b border-slate-100 dark:border-slate-800/80 py-8 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
            <div>
              <span className="text-xs font-mono font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Official Indian Government Helplines
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                Immediate Emergency Call Directory
              </h3>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <EyeOff className="w-3.5 h-3.5 text-rose-500" />
              <span>All calls are toll-free and confidential across India</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {hotlines.map(h => (
              <a
                key={h.num}
                href={`tel:${h.num.replace(/-/g, '')}`}
                className={`p-3.5 rounded-2xl border transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between group ${h.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wide opacity-80">
                      Emergency Dial
                    </span>
                    <PhoneCall className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-lg font-black font-mono tracking-tight text-slate-900 dark:text-slate-50">
                    {h.num}
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-current/10">
                  <div className="text-xs font-bold leading-tight text-slate-800 dark:text-slate-200">
                    {h.title}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {h.sub}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand & Mission Column (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 flex items-center justify-center text-white shadow-sm">
                <Shield className="w-5 h-5 fill-white/20 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-1.5">
                {t.common.appName}
                <Heart className="w-4 h-4 text-rose-500 fill-current animate-pulse" />
              </span>
            </div>

            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 max-w-md">
              {t.common.tagline}. Designed specifically for Indian women facing online harassment, blackmail, morphed images, and cyber threats. Providing instantaneous trauma-informed reassurance, evidence preservation, and official complaint drafting.
            </p>

            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <Lock className="w-4 h-4 shrink-0" />
                <span>Zero-Knowledge Architecture: Evidence stays encrypted on your device.</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400">
                <EyeOff className="w-4 h-4 shrink-0" />
                <span>Press Esc anytime for disguised Calculator & Weather radar.</span>
              </div>
            </div>
          </div>

          {/* Official Portals (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-cyber-500" />
              Official Redressal Portals
            </h4>
            <div className="space-y-2">
              {officialPortals.map(p => (
                <a
                  key={p.url}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl block border border-slate-200/60 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 transition-colors group"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400">
                    <span>{p.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-rose-500" />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{p.desc}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Language Switcher & Navigation (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-cyber-500" />
              Language (11 Languages)
            </h4>
            <p className="text-[11px] text-slate-400">
              Select your preferred Indian native script:
            </p>
            <div className="pt-1">
              <LanguageSelector variant="full" />
            </div>

            <div className="pt-3 flex flex-col gap-1.5 text-xs">
              <Link to="/emergency" className="hover:text-rose-500 font-semibold flex items-center gap-1.5">
                <span>🚨</span> Emergency Cyber Wizard
              </Link>
              <Link to="/wellness" className="hover:text-rose-500 font-semibold flex items-center gap-1.5">
                <span>🌱</span> Somatic Calm & Affirmations
              </Link>
              <Link to="/helplines" className="hover:text-rose-500 font-semibold flex items-center gap-1.5">
                <span>⚖️</span> IT Act Legal Rights Directory
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Cyber Buddy. Dedicated to women's digital safety, dignity, and autonomy across India.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-emerald-500 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> 100% Client-Side Private
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
