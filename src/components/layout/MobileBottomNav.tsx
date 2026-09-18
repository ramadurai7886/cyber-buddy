import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Heart, ShieldAlert, PhoneCall, LayoutDashboard } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

export const MobileBottomNav: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const isEmergency = location.pathname.startsWith('/emergency');

  // Don't show inside the emergency wizard to maximize screen space for evidence
  if (isEmergency) {
    return null;
  }

  const navItems = [
    {
      to: '/',
      label: 'Home',
      icon: Home,
    },
    {
      to: '/wellness',
      label: 'Calm',
      icon: Heart,
    },
    {
      to: '/emergency',
      label: 'SOS Help',
      icon: ShieldAlert,
      isEmergencyButton: true,
    },
    {
      to: '/helplines',
      label: 'Helplines',
      icon: PhoneCall,
    },
    {
      to: '/dashboard',
      label: 'Vault',
      icon: LayoutDashboard,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation Dock"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-200/90 dark:border-slate-800/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)] safe-area-bottom"
    >
      <div className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
        {navItems.map(item => {
          if (item.isEmergencyButton) {
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="relative -top-5 flex flex-col items-center group focus:outline-none"
                aria-label="Emergency Help SOS"
              >
                <div className="relative">
                  {/* Outer pulse ring */}
                  <span className="absolute -inset-1 rounded-full bg-rose-500/40 animate-ping" />
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-rose-600 to-red-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/40 border-2 border-white dark:border-slate-950 transition-transform active:scale-95 group-hover:scale-105">
                    <ShieldAlert className="w-7 h-7 stroke-[2.2]" />
                  </div>
                </div>
                <span className="text-[10px] font-extrabold text-rose-600 dark:text-rose-400 mt-0.5 tracking-tight">
                  SOS HELP
                </span>
              </NavLink>
            );
          }

          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 h-full py-1 text-center transition-colors select-none ${
                  isActive
                    ? 'text-rose-600 dark:text-rose-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1 rounded-lg transition-transform ${
                      isActive ? 'bg-rose-500/10 scale-110' : ''
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] leading-tight mt-0.5">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
