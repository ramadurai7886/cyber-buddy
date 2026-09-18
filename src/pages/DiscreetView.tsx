import React, { useState } from 'react';
import { CloudSun, Wind, Droplets, Compass, Search, Calendar, CheckSquare, Shield } from 'lucide-react';
import { useDiscreet } from '../context/DiscreetContext';

export const DiscreetView: React.FC = () => {
  const { exitDiscreetMode } = useDiscreet();
  const [pinInput, setPinInput] = useState('');
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinError, setPinError] = useState(false);

  const handleUnlock = () => {
    // Demo unlock accepts default PIN 1234 or simple continue
    if (pinInput === '1234' || pinInput === '') {
      exitDiscreetMode();
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-4 sm:p-6 font-sans select-none">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Fake Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <CloudSun className="w-8 h-8 text-amber-500" />
            <div>
              <h1 className="text-lg font-bold">Daily Weather & Productivity</h1>
              <p className="text-xs text-slate-500">Live Weather Radar & Local Forecast</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search city..."
                defaultValue="New Delhi"
                className="pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Current Weather Card */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl p-6 sm:p-8 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider bg-white/20 px-2.5 py-1 rounded-full">
                Live Conditions
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">New Delhi, India</h2>
              <p className="text-sm opacity-90">Partly Cloudy • Clean Air Index 82</p>
            </div>
            <div className="flex items-center gap-4">
              <CloudSun className="w-16 h-16 text-amber-300 animate-pulse" />
              <div className="text-5xl sm:text-6xl font-extrabold font-mono">29°C</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20 text-xs">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 opacity-80" />
              <div>
                <div className="opacity-75">Humidity</div>
                <div className="font-bold">48%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 opacity-80" />
              <div>
                <div className="opacity-75">Wind Speed</div>
                <div className="font-bold">14 km/h</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 opacity-80" />
              <div>
                <div className="opacity-75">Pressure</div>
                <div className="font-bold">1012 hPa</div>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast & Daily To-Do */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h3 className="text-sm font-bold flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Calendar className="w-4 h-4 text-blue-500" />
              5-Day Outlook
            </h3>
            <div className="space-y-3 text-xs">
              {[
                { day: 'Today', temp: '29° / 20°', condition: 'Sunny' },
                { day: 'Tomorrow', temp: '31° / 21°', condition: 'Clear Sky' },
                { day: 'Thursday', temp: '28° / 19°', condition: 'Mild Breeze' },
                { day: 'Friday', temp: '27° / 18°', condition: 'Passing Clouds' },
                { day: 'Saturday', temp: '30° / 20°', condition: 'Sunny' },
              ].map(item => (
                <div key={item.day} className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-700/50">
                  <span className="font-medium">{item.day}</span>
                  <span className="text-slate-500">{item.condition}</span>
                  <span className="font-mono font-semibold">{item.temp}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h3 className="text-sm font-bold flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <CheckSquare className="w-4 h-4 text-emerald-500" />
              Personal Notes & Schedule
            </h3>
            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <span>Grocery list: Milk, Almonds, Green Tea</span>
                <span className="text-[10px] text-emerald-500 font-semibold">Done</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <span>Call dentist for regular appointment</span>
                <span className="text-[10px] text-amber-500 font-semibold">Pending</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <span>Review monthly utility budget</span>
                <span className="text-[10px] text-slate-400">Next week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Discreet Return to App Trigger */}
        <div className="pt-8 text-center">
          <button
            type="button"
            onClick={() => setShowPinModal(true)}
            className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-2 rounded"
          >
            • System Settings / Resume Session •
          </button>
        </div>
      </div>

      {/* Discrete Unlock Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl text-center">
            <div className="w-10 h-10 rounded-xl bg-cyber-500/10 text-cyber-600 mx-auto flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Return to Cyber Buddy
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enter your session PIN or click continue when safe.
            </p>

            <input
              type="password"
              maxLength={4}
              value={pinInput}
              onChange={e => setPinInput(e.target.value)}
              placeholder="PIN (Demo: 1234 or leave blank)"
              className="w-full text-center tracking-widest text-lg font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5 focus:outline-none focus:ring-2 focus:ring-cyber-500"
            />

            {pinError && (
              <p className="text-xs text-rose-500 font-medium">Incorrect PIN</p>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowPinModal(false)}
                className="flex-1 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Keep Weather Screen
              </button>
              <button
                type="button"
                onClick={handleUnlock}
                className="flex-1 py-2 text-xs rounded-lg bg-cyber-500 hover:bg-cyber-600 text-slate-950 font-bold shadow-sm"
              >
                Resume Safely
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
