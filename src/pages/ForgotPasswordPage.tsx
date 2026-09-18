import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError(t.auth.errors.emailRequired);
      return;
    }

    setIsSubmitting(true);
    setError(undefined);

    try {
      const res = await forgotPassword(email);
      if (res.success) {
        setIsSuccess(true);
      } else {
        const key = res.error as keyof typeof t.auth.errors;
        setError(t.auth.errors[key] || 'Failed to process password reset.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2 focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-500 to-brand-600 flex items-center justify-center text-slate-950 shadow-md">
              <Shield className="w-6 h-6 stroke-[2.2]" />
            </div>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {t.auth.forgotTitle}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            {t.auth.forgotSubtitle}
          </p>
        </div>

        <Card className="p-6 sm:p-8 space-y-6 shadow-xl border-slate-200 dark:border-slate-800">
          {isSuccess ? (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.auth.resetSuccess}
              </p>
              <div className="pt-2">
                <Link to="/login">
                  <Button variant="primary" size="md" className="w-full justify-center">
                    {t.nav.login}
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <Input
                label={t.auth.emailLabel}
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  if (error) setError(undefined);
                }}
                placeholder={t.auth.emailPlaceholder}
                leftIcon={<Mail className="w-4 h-4" />}
                error={error}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                loadingText={t.auth.sendingReset}
                className="w-full justify-center"
              >
                {t.auth.resetButton}
              </Button>
            </form>
          )}

          <div className="text-center pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-cyber-600 dark:hover:text-cyber-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.common.back} to {t.nav.login}</span>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
