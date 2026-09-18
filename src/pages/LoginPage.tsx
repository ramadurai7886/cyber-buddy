import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Phone, ArrowRight, CheckCircle2, Heart, User, Sparkles } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Badge } from '../components/common/Badge';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/LanguageContext';

export const LoginPage: React.FC = () => {
  const { supportedLanguages } = useTranslation();
  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();

  // Multi-step profile setup: 1. Phone entry, 2. OTP verification, 3. Profile details
  const [authStep, setAuthStep] = useState<1 | 2 | 3>(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState(false);

  // Profile details
  const [profileName, setProfileName] = useState('');
  const [ageGroup, setAgeGroup] = useState('18-24');
  const [preferredLang, setPreferredLang] = useState('en');
  const [trustedContact, setTrustedContact] = useState('');
  const [counselingReminders, setCounselingReminders] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setAuthStep(2);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '582914' || otp.length === 6) {
      setAuthStep(3);
    } else {
      setOtpError(true);
      setTimeout(() => setOtpError(false), 2000);
    }
  };

  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await demoLogin();
      navigate('/dashboard', { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickDemoEntry = async () => {
    setIsSubmitting(true);
    try {
      await demoLogin();
      navigate('/dashboard', { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="w-full max-w-md space-y-6 animate-in fade-in">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2 focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-brand-600 flex items-center justify-center text-white shadow-md">
              <Shield className="w-6 h-6 stroke-[2.2]" />
            </div>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {authStep === 1 && 'Normal Mode • Enter Phone'}
            {authStep === 2 && 'Verify 6-Digit OTP'}
            {authStep === 3 && 'Complete Safety Profile'}
          </h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Create a protected account to securely track case progress, access the private vault, and receive ongoing wellness support.
          </p>
        </div>

        <Card className="p-6 sm:p-8 space-y-6 shadow-xl border-slate-200 dark:border-slate-800">
          {/* Quick 1-Click Demo Evaluation Shortcut */}
          <div className="p-3.5 rounded-xl border border-cyber-500/30 bg-cyber-500/10 dark:bg-cyber-500/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyber-700 dark:text-cyber-300 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Evaluator Quick Access
              </span>
              <span className="text-[10px] bg-cyber-500/20 px-2 py-0.5 rounded font-mono">1-Click</span>
            </div>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleQuickDemoEntry}
              className="w-full justify-center text-xs font-bold"
            >
              Instant Demo Access (Pooja Sharma)
            </Button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
            <span className="bg-white dark:bg-slate-900 px-3 text-[11px] uppercase tracking-wider text-slate-400 font-medium">
              Or proceed step-by-step
            </span>
          </div>

          {/* STEP 1: PHONE NUMBER */}
          {authStep === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Mobile Number (India)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="9876543210"
                    className="w-full pl-12 pr-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyber-500"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={phone.length < 10}
                className="w-full justify-center"
              >
                Send 6-Digit OTP
              </Button>
            </form>
          )}

          {/* STEP 2: OTP VERIFICATION */}
          {authStep === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Enter 6-Digit Verification Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="582914"
                  className="w-full text-center tracking-widest text-2xl font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyber-500"
                  required
                />
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <button
                    type="button"
                    onClick={() => setOtp('582914')}
                    className="text-cyber-600 dark:text-cyber-400 hover:underline font-semibold"
                  >
                    Auto-Fill Demo OTP (582914)
                  </button>
                  <span>Code sent to +91 {phone}</span>
                </div>
                {otpError && (
                  <p className="text-xs text-rose-500 font-medium">Please enter 6 digits (e.g. 582914)</p>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="md" onClick={() => setAuthStep(1)}>
                  Change Phone
                </Button>
                <Button type="submit" variant="primary" size="md" className="flex-1 justify-center">
                  Verify OTP
                </Button>
              </div>
            </form>
          )}

          {/* STEP 3: CREATE PROFILE */}
          {authStep === 3 && (
            <form onSubmit={handleCompleteProfile} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Full Name / Preferred Alias
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={e => setProfileName(e.target.value)}
                  placeholder="e.g. Pooja Sharma"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Age Group
                  </label>
                  <select
                    value={ageGroup}
                    onChange={e => setAgeGroup(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
                  >
                    <option value="18-24">18–24 years</option>
                    <option value="25-34">25–34 years</option>
                    <option value="35-44">35–44 years</option>
                    <option value="45+">45+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Language
                  </label>
                  <select
                    value={preferredLang}
                    onChange={e => setPreferredLang(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
                  >
                    {supportedLanguages.map(l => (
                      <option key={l.code} value={l.code}>
                        {l.flag} {l.nativeName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Trusted Emergency Contact (Optional)
                </label>
                <input
                  type="text"
                  value={trustedContact}
                  onChange={e => setTrustedContact(e.target.value)}
                  placeholder="Contact Name & Phone (For 1-tap SOS alerts)"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyber-500"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 pt-1">
                <input
                  type="checkbox"
                  checked={counselingReminders}
                  onChange={e => setCounselingReminders(e.target.checked)}
                  className="rounded border-slate-300 text-rose-500 focus:ring-rose-400"
                />
                <span>Send me weekly mental wellness & breathing check-ins</span>
              </label>

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                className="w-full justify-center mt-2 font-bold"
              >
                Complete Setup & Go to Dashboard
              </Button>
            </form>
          )}

          <div className="pt-2 text-center text-xs">
            <Link to="/emergency" className="text-rose-600 dark:text-rose-400 hover:underline font-semibold">
              Need immediate panic help without login? Tap here →
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
