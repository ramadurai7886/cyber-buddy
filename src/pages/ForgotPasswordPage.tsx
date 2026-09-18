import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, PhoneCall, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="w-full max-w-md space-y-6 animate-in fade-in">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-brand-600 flex items-center justify-center text-white mx-auto shadow-md">
            <Shield className="w-6 h-6 stroke-[2.2]" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Passwordless Verification
          </h2>
          <p className="text-xs text-slate-500">
            In Cyber Buddy, there are no passwords to remember or forget.
          </p>
        </div>

        <Card className="p-6 sm:p-8 space-y-5 border-slate-200 dark:border-slate-800 text-center">
          <div className="p-4 rounded-xl bg-cyber-500/10 border border-cyber-500/20 text-xs text-slate-700 dark:text-slate-300 text-left space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-cyber-600 dark:text-cyber-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Direct Phone & OTP Verification
            </div>
            <p>
              Your account is authenticated safely via 6-digit One-Time Password (OTP) sent to your mobile phone number.
            </p>
          </div>

          <Link to="/login" className="inline-block w-full">
            <Button variant="primary" size="md" className="w-full font-bold">
              Go to Phone / OTP Login
            </Button>
          </Link>

          <div className="pt-2">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-200">
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Home
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
