import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ShieldAlert,
  Heart,
  PhoneCall,
  Lock,
  ArrowRight,
  Sparkles,
  Zap,
  Users,
  EyeOff,
  Smile,
  FileCheck,
  CheckCircle2,
  AlertOctagon,
  ChevronRight,
} from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const LandingPage: React.FC = () => {
  const { language, setLanguage, supportedLanguages } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Panic Helplines Quick Banner */}
      <div className="bg-rose-600 text-white px-4 py-2 text-xs font-semibold">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span className="flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            In Immediate Danger? 24/7 National Emergency Helplines:
          </span>
          <div className="flex items-center gap-4 font-mono text-[11px] font-bold">
            <a href="tel:1930" className="hover:underline flex items-center gap-1">
              <PhoneCall className="w-3 h-3" /> Cyber Crime: 1930
            </a>
            <a href="tel:181" className="hover:underline flex items-center gap-1">
              <PhoneCall className="w-3 h-3" /> Women Helpline: 181
            </a>
            <a href="tel:18005990019" className="hover:underline flex items-center gap-1">
              <PhoneCall className="w-3 h-3" /> Counseling (KIRAN): 1800-599-0019
            </a>
          </div>
        </div>
      </div>

      {/* HERO / FIRST PAGE: 2 PRIMARY OPTIONS */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-rose-50/40 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/25 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Confidential First-Aid & Counseling for Women in India</span>
          </div>

          {/* Headline & Tagline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 max-w-4xl mx-auto leading-tight">
              From Fear to Action, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-rose-600 via-brand-500 to-cyber-500 bg-clip-text text-transparent">
                From Silence to Justice.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              If you are facing online blackmail, morphed photos, fake profiles, cyberstalking, or abusive threats — Cyber Buddy provides immediate emotional first-aid, evidence locking, and official reporting guidance.
            </p>
          </div>

          {/* FIRST PAGE: 2 PRIMARY WORKFLOW CHOICES */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
            {/* OPTION 1: EMERGENCY MODE (NO LOGIN) */}
            <div className="relative rounded-2xl border-2 border-rose-500/80 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-200 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-rose-500 text-white shadow-md">
                    <ShieldAlert className="w-7 h-7" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400">
                    NO LOGIN REQUIRED
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                    1. Emergency Help
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    For victims who are panicked and need immediate help right now.
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>Instant AI situation assessment & "NOT your fault" reassurance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>Free 24/7 Government Counseling (KIRAN 1800-599-0019)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>Lock screenshots locally with device PIN</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>Auto-draft formal complaint for cybercrime.gov.in</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <Link to="/emergency" className="block w-full">
                  <Button
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="w-full justify-center bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md"
                  >
                    Start Emergency Help
                  </Button>
                </Link>
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  100% Confidential • Stays on device
                </p>
              </div>
            </div>

            {/* OPTION 2: NORMAL MODE (LOGIN / PROFILE) */}
            <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm hover:border-slate-400 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                    <Shield className="w-7 h-7 text-cyber-500" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    REGISTERED PROFILE
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                    2. Normal Mode
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    For users who want to save cases, track progress, and access long-term support.
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyber-500 shrink-0" />
                    <span>Track case progress with step-by-step checklist</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyber-500 shrink-0" />
                    <span>Biometric & PIN-locked private evidence vault</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyber-500 shrink-0" />
                    <span>Permanent access to Mental Wellness Corner</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyber-500 shrink-0" />
                    <span>Emergency SOS alert to trusted contact</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <Link to="/login" className="block w-full">
                  <Button
                    variant="secondary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="w-full justify-center text-sm font-semibold"
                  >
                    Login / Create Profile
                  </Button>
                </Link>
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  Verify via phone OTP in seconds
                </p>
              </div>
            </div>
          </div>

          {/* Quick Exit Alert Reminder */}
          <div className="pt-2">
            <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
              <EyeOff className="w-4 h-4 text-rose-500" />
              <span>
                Safety Tip: The <strong>Quick Exit</strong> button at the top instantly hides this app with a benign Weather forecast.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* WHAT MAKES CYBER BUDDY SPECIAL */}
      <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="cyber">Complete 360° Victim Support</Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mt-2">
              Why Cyber Buddy is Different
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              No other cybercrime application in India combines technical, emotional, and legal support in one safe space.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="p-5 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-cyber-500/15 text-cyber-600 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Technical Help</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Evidence collection, automated image blurring, device PIN locker, and formal complaint drafting.
              </p>
            </Card>

            <Card className="p-5 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-600 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Emotional Help</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Reassurance ("NOT your fault"), panic relief, and direct calls to free 24/7 counseling helplines.
              </p>
            </Card>

            <Card className="p-5 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-brand-500/15 text-brand-600 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Legal Guidance</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                IT Act & BNS legal provisions breakdown, step-by-step guidance for cybercrime.gov.in.
              </p>
            </Card>

            <Card className="p-5 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Social Support</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Anonymous survivor recovery stories and community resilience sharing.
              </p>
            </Card>

            <Card className="p-5 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center font-bold">
                5
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Long-Term Healing</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Mental Wellness Corner with guided breathing, daily recovery affirmations, and safety hardening.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* MULTILINGUAL ACCESSIBILITY SECTION */}
      <section className="py-14 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="cyber">Available in 11 Indian Languages</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            Language Should Never Be a Barrier to Safety
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Switch Cyber Buddy into your mother tongue with a single tap:
          </p>

          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto pt-2">
            {supportedLanguages.map(item => (
              <button
                key={item.code}
                type="button"
                onClick={() => setLanguage(item.code)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  language === item.code
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-400'
                }`}
              >
                <span className="mr-1.5">{item.flag}</span>
                <span>{item.nativeName}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
