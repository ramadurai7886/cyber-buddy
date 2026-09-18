import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Shield,
  Heart,
  PhoneCall,
  Menu,
  X,
  User,
  LogOut,
  AlertOctagon,
  Sparkles,
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
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: t.nav.emergencyHelp, href: '/emergency' },
    { name: t.nav.wellnessCorner, href: '/wellness' },
    { name: t.nav.helplines, href: '/helplines' },
    { name: t.nav.myDashboard, href: '/dashboard' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Product Name */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-400 rounded-lg p-1"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-brand-600 flex items-center justify-center text-white shadow-sm">
                <Shield className="w-5 h-5 fill-white/20 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-slate-100">
                    {t.common.appName}
                  </span>
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 -mt-1 font-medium">
                  {t.common.subTitle}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    isActive(link.href)
                      ? 'text-rose-600 dark:text-rose-400 bg-rose-500/10'
                      : 'text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Controls & Quick Exit */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Quick Exit Safety Button */}
            <QuickExitButton />

            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

            <LanguageSelector />
            <ThemeToggle />

            {isAuthenticated ? (
              <div className="flex items-center gap-2 pl-2">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  <User className="w-3.5 h-3.5 text-cyber-500" />
                  <span>{user?.name}</span>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-slate-500 hover:text-rose-500"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </Button>
              </div>
            ) : (
              <Link to="/login" className="pl-1">
                <Button variant="secondary" size="sm">
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
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 animate-in slide-in-from-top-4">
          <div className="flex flex-col gap-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg"
              >
                {link.name}
              </Link>
            ))}

            <div className="h-px bg-slate-200 dark:bg-slate-800 my-2" />

            <div className="flex items-center justify-between px-3 py-1">
              <span className="text-xs text-slate-500">Theme</span>
              <ThemeToggle />
            </div>

            {isAuthenticated ? (
              <div className="flex flex-col gap-2 pt-2">
                <div className="px-3 py-1 text-xs text-slate-500">
                  Signed in as <strong>{user?.name}</strong>
                </div>
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleLogout}
                  leftIcon={<LogOut className="w-4 h-4 text-rose-500" />}
                  className="w-full text-rose-500"
                >
                  {t.nav.logOut}
                </Button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full justify-center mt-2">
                  {t.nav.signIn}
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
