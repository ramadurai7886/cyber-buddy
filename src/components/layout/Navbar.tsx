import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Shield,
  Heart,
  PhoneCall,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Phone,
  Sparkles,
  Lock,
} from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { QuickExitButton } from '../common/QuickExitButton';
import { Button } from '../common/Button';

export const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hotlinesOpen, setHotlinesOpen] = useState(false);
  const hotlinesRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  // Close hotlines popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (hotlinesRef.current && !hotlinesRef.current.contains(event.target as Node)) {
        setHotlinesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: t.nav.emergencyHelp, href: '/emergency', badge: 'SOS' },
    { name: t.nav.wellnessCorner, href: '/wellness' },
    { name: t.nav.helplines, href: '/helplines' },
    { name: t.nav.myDashboard, href: '/dashboard' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const quickHotlines = [
    { number: '1930', label: 'National Cyber Crime', sub: '24/7 Financial & Cyber' },
    { number: '181', label: 'Women Helpline', sub: 'Domestic & Cyber Abuse' },
    { number: '112', label: 'All-India Emergency', sub: 'Police, Fire, Ambulance' },
    { number: '1800-599-0019', label: 'KIRAN Mental Health', sub: 'Toll-free Counseling' },
  ];

  return (
    <header className="sticky top-2 z-40 w-full px-3 sm:px-6 lg:px-8 transition-all">
      <div className="max-w-7xl mx-auto backdrop-blur-xl bg-white/85 dark:bg-slate-950/85 border border-slate-200/90 dark:border-slate-800/90 shadow-md shadow-slate-900/5 dark:shadow-slate-950/50 rounded-2xl transition-all">
        <div className="flex items-center justify-between h-16 px-4 sm:px-5 gap-2 sm:gap-4">
          {/* Logo & Product Name */}
          <div className="flex items-center gap-4 lg:gap-6">
            <Link
              to="/"
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 rounded-xl p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5 fill-white/20 stroke-[2.4]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-base sm:text-lg tracking-tight text-slate-900 dark:text-slate-100 font-sans">
                    {t.common.appName}
                  </span>
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-current animate-pulse" />
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 -mt-1 font-semibold tracking-wide">
                  {t.common.subTitle}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    isActive(link.href)
                      ? 'text-rose-600 dark:text-rose-400 bg-rose-500/10 shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.name}
                    {link.badge && (
                      <span className="px-1.5 py-0.2 text-[9px] font-mono font-extrabold uppercase rounded bg-rose-500 text-white leading-tight">
                        {link.badge}
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Controls & Quick Exit */}
          <div className="hidden md:flex items-center gap-2">
            {/* Quick Hotline Dialer Dropdown */}
            <div className="relative" ref={hotlinesRef}>
              <button
                type="button"
                onClick={() => setHotlinesOpen(!hotlinesOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-all focus:outline-none"
                aria-label="Quick Dial Helplines"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
                <span>Helplines</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${hotlinesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {hotlinesOpen && (
                <div className="absolute right-0 mt-2 w-72 p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-slate-400">
                      Emergency Crisis Numbers
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/60 mt-1">
                    {quickHotlines.map(h => (
                      <a
                        key={h.number}
                        href={`tel:${h.number.replace(/-/g, '')}`}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors group"
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                            {h.label}
                          </span>
                          <span className="text-[10px] text-slate-400">{h.sub}</span>
                        </div>
                        <span className="px-2 py-1 rounded-lg text-xs font-mono font-black bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                          {h.number}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Exit Safety Button */}
            <QuickExitButton />

            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-0.5" />

            <LanguageSelector />
            <ThemeToggle />

            {isAuthenticated ? (
              <div className="flex items-center gap-1.5 pl-1">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                >
                  <User className="w-3.5 h-3.5 text-cyber-500" />
                  <span className="max-w-[80px] truncate">{user?.name}</span>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-rose-500"
                  aria-label="Log Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </Button>
              </div>
            ) : (
              <Link to="/login" className="pl-1">
                <Button variant="secondary" size="sm" className="font-bold text-xs rounded-xl">
                  {t.nav.signIn}
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <QuickExitButton compact />
            <LanguageSelector />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 px-4 pt-3 pb-5 space-y-4 animate-in slide-in-from-top-3">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 text-xs font-bold rounded-xl flex items-center justify-between ${
                    isActive(link.href)
                      ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-mono font-black rounded bg-rose-500 text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Emergency Hotline Bar for Mobile Drawer */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-amber-700 dark:text-amber-400 block">
                Immediate Crisis Dials
              </span>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:1930"
                  className="p-2 rounded-lg bg-white dark:bg-slate-900 flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-100 shadow-sm"
                >
                  <span>1930 Cyber</span>
                  <Phone className="w-3.5 h-3.5 text-cyber-500" />
                </a>
                <a
                  href="tel:181"
                  className="p-2 rounded-lg bg-white dark:bg-slate-900 flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-100 shadow-sm"
                >
                  <span>181 Women</span>
                  <Phone className="w-3.5 h-3.5 text-rose-500" />
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-500 font-semibold">Appearance</span>
              <ThemeToggle />
            </div>

            {isAuthenticated ? (
              <div className="flex flex-col gap-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500">
                  Signed in as <strong>{user?.name}</strong>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  leftIcon={<LogOut className="w-4 h-4 text-rose-500" />}
                  className="w-full text-rose-500 justify-center font-bold"
                >
                  {t.nav.logOut}
                </Button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full justify-center mt-1 font-bold">
                  {t.nav.signIn}
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
