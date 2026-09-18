import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  ExternalLink,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Scale,
  Camera,
  UserX,
  MessageSquareWarning,
  Compass,
  AlertTriangle,
  Flame,
} from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

export const LandingPage: React.FC = () => {
  const { t, language, setLanguage, supportedLanguages } = useTranslation();
  const navigate = useNavigate();

  // Embedded Somatic Breathing Mini-Widget State
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [breathSeconds, setBreathSeconds] = useState(4);
  const [selectedCrimeTab, setSelectedCrimeTab] = useState<number>(0);

  // Breathing cycle timer
  useEffect(() => {
    if (!breathingActive) return;

    const interval = setInterval(() => {
      setBreathSeconds(prev => {
        if (prev > 1) {
          return prev - 1;
        } else {
          // Switch phase
          setBreathPhase(current => {
            switch (current) {
              case 'Inhale':
                return 'Hold';
              case 'Hold':
                return 'Exhale';
              case 'Exhale':
                return 'Rest';
              case 'Rest':
                return 'Inhale';
            }
          });
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [breathingActive]);

  // Direct 1-Click Triage Incident Launchers
  const triageIncidents = [
    {
      icon: Flame,
      label: 'Threatened with Photo Leak',
      sub: 'Blackmail, demands for money or compliance',
      color: 'border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300 hover:bg-rose-500/20',
      query: 'Someone is blackmailing me and threatening to leak private photos or intimate messages',
      chipLabel: t.wizard.chipThreat,
    },
    {
      icon: Camera,
      label: 'Deepfakes & Morphed Photos',
      sub: 'Face swapped onto obscene images or videos',
      color: 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20',
      query: 'My personal face or photos were morphed into explicit pictures or deepfakes without consent',
      chipLabel: t.wizard.chipMorphed,
    },
    {
      icon: UserX,
      label: 'Fake Profile & Impersonation',
      sub: 'Instagram, Facebook or WhatsApp impersonation',
      color: 'border-brand-500/40 bg-brand-500/10 text-brand-700 dark:text-brand-300 hover:bg-brand-500/20',
      query: 'Someone created a fake account with my photos and contact details to defame or harass me',
      chipLabel: t.wizard.chipFakeProfile,
    },
    {
      icon: MessageSquareWarning,
      label: 'Abusive Messages & Doxxing',
      sub: 'Continuous harassment, obscenity, phone calls',
      color: 'border-cyber-500/40 bg-cyber-500/10 text-cyber-700 dark:text-cyber-300 hover:bg-cyber-500/20',
      query: 'Receiving persistent abusive, vulgar messages, insults, and harassment from unknown numbers',
      chipLabel: t.wizard.chipAbuse,
    },
    {
      icon: Compass,
      label: 'Cyberstalking & Tracking',
      sub: 'Obsessive monitoring across social platforms',
      color: 'border-purple-500/40 bg-purple-500/10 text-purple-700 dark:text-purple-300 hover:bg-purple-500/20',
      query: 'Someone is obsessively tracking my location, following my profiles, and monitoring my activity',
      chipLabel: t.wizard.chipStalking,
    },
  ];

  const handleLaunchTriage = (incident: typeof triageIncidents[0]) => {
    navigate('/emergency', {
      state: {
        query: incident.query,
        chipLabel: incident.chipLabel,
      },
    });
  };

  // 5 Detailed Cyber Crimes for the Interactive Explorer
  const crimeDetails = [
    {
      title: 'Private Photo Blackmail & Sextortion',
      tag: 'IT Act 66E, 67A • IPC 506',
      badge: 'Criminal Offence (Non-Bailable)',
      desc: 'Extortionists threaten to leak intimate media to your family, college, or colleagues unless money or further explicit content is sent.',
      remedies: [
        'DO NOT send any money or compromise: Extortion demands never stop after payment.',
        'Do not delete the chat history: Screenshots with timestamps, phone numbers, and UPI IDs are crucial evidence.',
        'Upload cryptographic perceptual hash to StopNCII.org to prevent publication across Instagram, Facebook, TikTok, etc.',
        'Immediate Police Action: File under IT Act Sec 66E (Violation of privacy) and Sec 67A (Transmitting sexually explicit material).',
      ],
      punishment: 'Up to 5 to 7 years rigorous imprisonment + mandatory fines.',
      query: 'Someone is blackmailing me and threatening to leak private photos or intimate messages',
      chipLabel: t.wizard.chipThreat,
    },
    {
      title: 'AI Deepfakes & Morphed Media',
      tag: 'IT Rules 2021 Rule 3(2)(b) • IT Act 66E',
      badge: 'Mandatory 24-Hr Takedown',
      desc: 'Generative AI tools used to graft a woman’s face onto pornography or explicit imagery to cause reputational damage.',
      remedies: [
        'Intermediary 24-Hour Law: Under Rule 3(2)(b) of the IT Rules 2021, platforms MUST remove non-consensual morphed sexual content within 24 hours of receiving a complaint.',
        'Generate StopNCII Hash: Generates a 100% on-device hash from your local browser without ever uploading your actual photo.',
        'File an urgent grievance with the platform Grievance Officer and submit an online complaint on cybercrime.gov.in.',
      ],
      punishment: 'Up to 3 to 5 years imprisonment under Sec 66E & 67.',
      query: 'My personal face or photos were morphed into explicit pictures or deepfakes without consent',
      chipLabel: t.wizard.chipMorphed,
    },
    {
      title: 'Fake Profiles & Personation',
      tag: 'IT Act 66D • IPC 419, 500',
      badge: 'Cheating by Personation',
      desc: 'Perpetrators create cloned accounts using your name, photos, and contact info to solicit money, spread rumors, or send vulgar messages in your name.',
      remedies: [
        'Capture the profile URL, account handles, and any posts before the scammer renames or deletes the profile.',
        'Request friends and family to report the profile directly to Instagram / Facebook as "Impersonating Someone I Know".',
        'Lodge a cyber police report under IT Act Sec 66D (Cheating by personation using computer resource).',
      ],
      punishment: 'Up to 3 years imprisonment + fine under IT Act 66D.',
      query: 'Someone created a fake account with my photos and contact details to defame or harass me',
      chipLabel: t.wizard.chipFakeProfile,
    },
    {
      title: 'Cyberstalking & Doxxing',
      tag: 'IPC 354D • IPC 509',
      badge: 'Cognizable Police Offence',
      desc: 'Obsessive online monitoring, creating unwanted alt-accounts to bypass blocks, or publishing personal home addresses, phone numbers, and workplaces.',
      remedies: [
        'Under Section 354D of Indian Penal Code, any man who monitors the use by a woman of the internet, email, or electronic communication commits cyberstalking.',
        'Do not confront or engage: Maintain timestamped records of every message, call, or attempt to contact.',
        'Call the Women Helpline 181 for immediate legal, medical, and police intervention.',
      ],
      punishment: 'Up to 3 years for first conviction, up to 5 years for subsequent convictions.',
      query: 'Someone is obsessively tracking my location, following my profiles, and monitoring my activity',
      chipLabel: t.wizard.chipStalking,
    },
    {
      title: 'Financial Cyber Fraud & Extortion Scams',
      tag: 'IT Act 66C, 66D • National 1930 Helpline',
      badge: '24-Hour Golden Window',
      desc: 'Frauds involving fake video calls (digital arrest, loan app extortion, sextortion calls) demanding urgent UPI or bank transfers.',
      remedies: [
        'Golden Hour Action: Call the National Cyber Crime Helpline at 1930 IMMEDIATELY.',
        'Helpline 1930 connects with the Citizen Financial Cyber Fraud Reporting System to freeze the fraudulent money in transit before the criminal withdraws it.',
        'Immediately block debit cards and UPI VPAs through your bank mobile app.',
      ],
      punishment: 'Strict non-bailable fraud charges and asset forfeiture.',
      query: 'I was trapped in a financial cyber scam, loan app threat, or extorted through UPI transfer',
      chipLabel: t.wizard.chipDontKnow,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. TOP EMERGENCY BROADCAST RIBBON */}
      <div className="bg-slate-900 dark:bg-black text-white px-3 sm:px-4 py-2 text-xs border-b border-rose-500/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
            </span>
            <span className="font-mono font-bold tracking-wider text-[11px] text-rose-300 uppercase">
              Official Indian Emergency Assistance
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-5 font-mono text-[11px] font-bold">
            <a
              href="tel:1930"
              className="hover:text-rose-300 flex items-center gap-1 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-cyber-400" /> 1930 Cyber
            </a>
            <a
              href="tel:181"
              className="hover:text-rose-300 flex items-center gap-1 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-rose-400" /> 181 Women
            </a>
            <a
              href="tel:18005990019"
              className="hover:text-rose-300 flex items-center gap-1 transition-colors hidden sm:flex"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" /> 1800-599-0019 Calm
            </a>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-slate-400 text-[10px] hidden md:inline-flex items-center gap-1">
              <EyeOff className="w-3 h-3 text-rose-400" /> Press <kbd className="px-1 py-0.2 bg-slate-800 rounded font-mono text-slate-200">Esc</kbd> for disguised Calculator/Weather
            </span>
          </div>
        </div>
      </div>

      {/* 2. SPLIT BENTO-GRID CRISIS FIRST-AID HERO */}
      <section className="relative overflow-hidden py-8 sm:py-12 lg:py-16 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-rose-50/50 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* LEFT COLUMN: CRISIS FIRST-AID COMMAND & INSTANT TRIAGE (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Trauma-Informed Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/25 text-xs font-bold">
                  <Shield className="w-3.5 h-3.5 fill-rose-500/20 text-rose-600" />
                  <span>Trauma-Informed Cyber First-Aid & Legal Armor for Indian Women</span>
                </div>

                {/* Primary Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-slate-50 leading-[1.15]">
                  Targeted Online? <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-rose-600 via-brand-600 to-cyber-500 bg-clip-text text-transparent">
                    You Are Not Alone. It Is Not Your Fault.
                  </span>
                </h1>

                {/* Empathetic Subtitle */}
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-medium">
                  If someone is blackmailing you with photos, stalking your profiles, or spreading deepfakes — Cyber Buddy provides immediate emotional reassurance, encrypted evidence locking, and an official police complaint draft in minutes.
                </p>
              </div>

              {/* 1-CLICK LIVE CRISIS TRIAGE SELECTOR */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Select Your Emergency to Start Immediate First-Aid:
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {triageIncidents.map((incident, idx) => {
                    const Icon = incident.icon;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleLaunchTriage(incident)}
                        className={`p-3 rounded-xl border text-left transition-all duration-150 active:scale-[0.98] group flex items-start gap-2.5 shadow-sm ${incident.color}`}
                      >
                        <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-900/80 shadow-sm shrink-0">
                          <Icon className="w-4 h-4 text-current" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                              {incident.label}
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 group-hover:text-rose-500 transition-all shrink-0" />
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {incident.sub}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Trust & Zero-Knowledge Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                  <Lock className="w-3.5 h-3.5" /> 100% On-Device Encrypted
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-500/20">
                  <ShieldAlert className="w-3.5 h-3.5" /> Zero Server Logs or Tracking
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                  <Users className="w-3.5 h-3.5" /> 11 Indian Languages
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN: HIGH-CONTRAST DUAL ACTION CARDS (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
              {/* CARD 1: EMERGENCY MODE (CRIMSON GLOW CARD) */}
              <div className="relative rounded-3xl border-2 border-rose-500 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xl shadow-rose-500/10 hover:shadow-2xl hover:shadow-rose-500/20 transition-all duration-200 flex flex-col justify-between group overflow-hidden">
                {/* Soft gradient accent */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-3.5 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/30">
                      <ShieldAlert className="w-6 h-6 stroke-[2.4]" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-extrabold bg-rose-500 text-white tracking-wide shadow-sm">
                      NO LOGIN NEEDED
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                      {t.hero.opt1Title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                      Immediate crisis first-aid. Works anonymously without an account.
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs font-medium text-slate-700 dark:text-slate-300 pt-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>{t.hero.opt1Feature1}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>Automated Sensitive Image Blurring & PIN Locker</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>{t.hero.opt1Feature3}</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 relative z-10">
                  <Link to="/emergency" className="block w-full">
                    <Button
                      variant="primary"
                      size="lg"
                      rightIcon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                      className="w-full justify-center bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-md shadow-rose-600/30 rounded-xl"
                    >
                      {t.hero.opt1Btn}
                    </Button>
                  </Link>
                  <p className="text-[11px] text-center text-slate-400 mt-2 font-mono">
                    100% Confidential • Device Encrypted
                  </p>
                </div>
              </div>

              {/* CARD 2: SAFETY VAULT / SIGN IN MODE */}
              <div className="relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-sm hover:border-slate-400 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-between">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-cyber-500" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      SAFETY VAULT
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                      {t.hero.opt2Title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      For victims managing ongoing cases, evidence timelines & trusted circles.
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyber-500 shrink-0" />
                      <span>{t.hero.opt2Feature1}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyber-500 shrink-0" />
                      <span>Trusted Emergency Circle SOS with GPS tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyber-500 shrink-0" />
                      <span>{t.hero.opt2Feature3}</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <Link to="/login" className="block w-full">
                    <Button
                      variant="secondary"
                      size="lg"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      className="w-full justify-center text-sm font-bold rounded-xl"
                    >
                      {t.hero.opt2Btn}
                    </Button>
                  </Link>
                  <p className="text-[11px] text-center text-slate-400 mt-2 font-mono">
                    Free secure backup • 1-click account wipe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LIVE HOMEPAGE SOMATIC CALM MINI-WIDGET */}
      <section className="py-12 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-cyan-500/10 dark:from-emerald-950/20 dark:via-teal-950/10 dark:to-cyan-950/20 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-emerald-500/25 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                <Heart className="w-3.5 h-3.5 fill-current text-emerald-500" />
                <span>Feeling Panicked or Shaking?</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
                Take a 60-Second Guided Breath
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
                Your heart rate may be high right now. Box breathing (4-4-4-4) lowers cortisol and resets your nervous system before you make any decisions.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Button
                  variant={breathingActive ? 'secondary' : 'primary'}
                  size="md"
                  onClick={() => setBreathingActive(!breathingActive)}
                  leftIcon={breathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  className={breathingActive ? 'rounded-xl' : 'bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md shadow-emerald-600/20'}
                >
                  {breathingActive ? 'Pause Breathing' : 'Start Calm Breathing'}
                </Button>

                <Link to="/wellness">
                  <Button variant="ghost" size="md" rightIcon={<ArrowRight className="w-4 h-4" />} className="rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    Visit Wellness Corner
                  </Button>
                </Link>
              </div>
            </div>

            {/* Breathing Circle Visualizer */}
            <div className="relative flex flex-col items-center justify-center shrink-0 w-44 h-44">
              <div
                className={`w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-1000 shadow-xl ${
                  breathingActive
                    ? breathPhase === 'Inhale'
                      ? 'scale-110 border-emerald-500 bg-emerald-500/15 shadow-emerald-500/30'
                      : breathPhase === 'Hold'
                      ? 'scale-105 border-teal-500 bg-teal-500/20 shadow-teal-500/30'
                      : breathPhase === 'Exhale'
                      ? 'scale-90 border-cyan-500 bg-cyan-500/10 shadow-cyan-500/20'
                      : 'scale-95 border-emerald-400 bg-emerald-500/10'
                    : 'scale-100 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800'
                }`}
              >
                <span className="text-xs font-mono font-black uppercase text-emerald-700 dark:text-emerald-300 tracking-wider">
                  {breathingActive ? breathPhase : 'Ready'}
                </span>
                <span className="text-3xl font-black font-mono text-slate-900 dark:text-slate-50 mt-0.5">
                  {breathingActive ? breathSeconds : '4s'}
                </span>
                <span className="text-[10px] text-slate-400 font-medium mt-1">
                  {breathingActive ? 'Breathe slowly' : 'Tap to start'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE CRIME FIRST-AID & LEGAL EXPLORER (BENTO GRID) */}
      <section className="py-14 sm:py-18 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <Badge variant="cyber">Legal Armor & Immediate First-Aid</Badge>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
              Know Your Legal Rights Under Indian Law
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Indian law provides strong criminal penalties against cyber harassment. Select any crime below to view immediate remedies and legal provisions:
            </p>
          </div>

          {/* Crime Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {crimeDetails.map((crime, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedCrimeTab(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCrimeTab === idx
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {crime.title.split('&')[0]}
              </button>
            ))}
          </div>

          {/* Active Crime Explorer Card */}
          {(() => {
            const activeCrime = crimeDetails[selectedCrimeTab];
            return (
              <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60 shadow-xl max-w-5xl mx-auto animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wide">
                      {activeCrime.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-0.5">
                      {activeCrime.title}
                    </h3>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-800 font-mono text-xs font-bold text-slate-800 dark:text-slate-200 self-start sm:self-auto">
                    {activeCrime.tag}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 items-start">
                  <div className="md:col-span-7 space-y-4">
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                      {activeCrime.desc}
                    </p>

                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                        Immediate Action Steps:
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-200">
                        {activeCrime.remedies.map((remedy, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{remedy}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="md:col-span-5 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-rose-500">
                        Punishment for Offender
                      </span>
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-1">
                        {activeCrime.punishment}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                      <Button
                        variant="primary"
                        size="md"
                        onClick={() =>
                          navigate('/emergency', {
                            state: {
                              query: activeCrime.query,
                              chipLabel: activeCrime.chipLabel,
                            },
                          })
                        }
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                        className="w-full justify-center bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md"
                      >
                        Launch Emergency Wizard for this Case
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 5. COMPLETE 360° SAFETY SUPPORT (5 PILLARS) */}
      <section className="py-14 sm:py-18 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <Badge variant="cyber">Complete 360° Victim Architecture</Badge>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
              Why Cyber Buddy is Different
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Other cyber tools focus solely on police reports. Cyber Buddy is designed around the victim's emotional, technical, and legal reality:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="p-5 space-y-2.5 rounded-2xl hover:border-cyber-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyber-500/15 text-cyber-600 flex items-center justify-center font-black text-sm">
                01
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">Technical First-Aid</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Automated screenshot blurring, device PIN locker, StopNCII perceptual hash takedown, and police-ready complaint drafts.
              </p>
            </Card>

            <Card className="p-5 space-y-2.5 rounded-2xl hover:border-rose-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-600 flex items-center justify-center font-black text-sm">
                02
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">Emotional Reassurance</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Instant crisis grounding, somatic 4-4-4 breathing, trauma-informed reassurance, and direct calls to free 24/7 counselors.
              </p>
            </Card>

            <Card className="p-5 space-y-2.5 rounded-2xl hover:border-brand-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-brand-500/15 text-brand-600 flex items-center justify-center font-black text-sm">
                03
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">Indian Legal Armor</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Specific sections of IT Act 2000 (66E, 67A) and BNS/IPC (354D, 506, 509) automatically matched to the incident.
              </p>
            </Card>

            <Card className="p-5 space-y-2.5 rounded-2xl hover:border-emerald-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center font-black text-sm">
                04
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">Zero-Knowledge Privacy</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                100% on-device cryptography. No unencrypted evidence ever touches a central server. Disguised Quick Exit with PIN lock.
              </p>
            </Card>

            <Card className="p-5 space-y-2.5 rounded-2xl hover:border-amber-400 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center font-black text-sm">
                05
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">Long-Term Healing</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dedicated Wellness Corner with sound therapy, recovery affirmations, self-care journaling, and digital safety hardening guides.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 6. MULTILINGUAL NATIVE MATRIX (11 INDIAN LANGUAGES) */}
      <section className="py-14 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="cyber">Available in 11 Indian Languages</Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Language Should Never Be a Barrier to Safety
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Switch Cyber Buddy into your mother tongue with a single tap. All 14 wizard steps, emotional support, and legal guidance react instantly:
          </p>

          <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto pt-2">
            {supportedLanguages.map(item => (
              <button
                key={item.code}
                type="button"
                onClick={() => setLanguage(item.code)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold border transition-all duration-150 active:scale-95 flex items-center gap-2 ${
                  language === item.code
                    ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-rose-400'
                }`}
              >
                <span>{item.flag}</span>
                <span>{item.nativeName}</span>
                <span className="text-[10px] opacity-75 font-mono">({item.name})</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
