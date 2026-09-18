import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, User, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { AuthService } from '../services/authService';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export const SignupPage: React.FC = () => {
  const { t, supportedLanguages } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    preferredLanguage: 'en',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
    form?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  // Compute password strength in real time
  const passwordStrength = AuthService.calculatePasswordStrength(formData.password);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t.auth.errors.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.auth.errors.emailRequired;
    } else if (!AuthService.isValidEmail(formData.email)) {
      newErrors.email = t.auth.errors.emailInvalid;
    }

    if (!formData.password) {
      newErrors.password = t.auth.errors.passwordRequired;
    } else if (formData.password.length < 6) {
      newErrors.password = t.auth.errors.passwordLength;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.auth.errors.passwordMismatch;
    }

    if (!formData.agreeTerms) {
      newErrors.terms = t.auth.errors.termsRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const res = await register(formData);
      if (res.success) {
        setSignupSuccess(true);
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 600);
      } else {
        const errorKey = res.error as keyof typeof t.auth.errors;
        setErrors({ form: t.auth.errors[errorKey] || 'Signup failed. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="w-full max-w-lg space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2 focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-500 to-brand-600 flex items-center justify-center text-slate-950 shadow-md">
              <Shield className="w-6 h-6 stroke-[2.2]" />
            </div>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {t.auth.signupTitle}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            {t.auth.signupSubtitle}
          </p>
        </div>

        <Card className="p-6 sm:p-8 space-y-6 shadow-xl border-slate-200 dark:border-slate-800">
          {errors.form && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-medium">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Input
              label={t.auth.fullNameLabel}
              value={formData.fullName}
              onChange={e => {
                setFormData({ ...formData, fullName: e.target.value });
                if (errors.fullName) setErrors({ ...errors, fullName: undefined });
              }}
              placeholder={t.auth.fullNamePlaceholder}
              leftIcon={<User className="w-4 h-4" />}
              error={errors.fullName}
              required
            />

            <Input
              label={t.auth.emailLabel}
              type="email"
              value={formData.email}
              onChange={e => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder={t.auth.emailPlaceholder}
              leftIcon={<Mail className="w-4 h-4" />}
              error={errors.email}
              required
            />

            {/* Password */}
            <div>
              <Input
                label={t.auth.passwordLabel}
                isPassword
                value={formData.password}
                onChange={e => {
                  setFormData({ ...formData, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                placeholder={t.auth.passwordPlaceholder}
                leftIcon={<Lock className="w-4 h-4" />}
                error={errors.password}
                required
              />

              {/* Password Strength Meter */}
              {formData.password && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Security strength:</span>
                    <span
                      className={`font-semibold ${
                        passwordStrength.label === 'strong'
                          ? 'text-emerald-500'
                          : passwordStrength.label === 'medium'
                          ? 'text-amber-500'
                          : 'text-rose-500'
                      }`}
                    >
                      {t.auth.passwordStrength[passwordStrength.label]}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        passwordStrength.label === 'strong'
                          ? 'bg-emerald-500'
                          : passwordStrength.label === 'medium'
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.max(passwordStrength.score, 15)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <Input
              label={t.auth.confirmPasswordLabel}
              isPassword
              value={formData.confirmPassword}
              onChange={e => {
                setFormData({ ...formData, confirmPassword: e.target.value });
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
              }}
              placeholder={t.auth.passwordPlaceholder}
              leftIcon={<Lock className="w-4 h-4" />}
              error={errors.confirmPassword}
              required
            />

            {/* Preferred Language */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {t.auth.preferredLanguageLabel}
              </label>
              <div className="relative">
                <select
                  value={formData.preferredLanguage}
                  onChange={e => setFormData({ ...formData, preferredLanguage: e.target.value })}
                  className="w-full rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 text-xs appearance-none focus:outline-none focus:ring-2 focus:ring-cyber-500/30 focus:border-cyber-500"
                >
                  {supportedLanguages.map(item => (
                    <option key={item.code} value={item.code}>
                      {item.flag} {item.nativeName} ({item.name})
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                  <Globe className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 dark:text-slate-400 select-none">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={e => {
                    setFormData({ ...formData, agreeTerms: e.target.checked });
                    if (errors.terms) setErrors({ ...errors, terms: undefined });
                  }}
                  className="rounded border-slate-300 dark:border-slate-700 text-cyber-500 focus:ring-cyber-400 mt-0.5"
                />
                <span>{t.auth.termsAgree}</span>
              </label>
              {errors.terms && (
                <p className="text-xs text-rose-500 font-medium mt-1">
                  • {errors.terms}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              isSuccess={signupSuccess}
              loadingText={t.auth.signingUp}
              className="w-full justify-center mt-2"
            >
              {signupSuccess ? 'Account Created!' : t.auth.signupButton}
            </Button>
          </form>

          <div className="text-center pt-2 text-xs text-slate-500 dark:text-slate-400">
            {t.auth.haveAccount}{' '}
            <Link
              to="/login"
              className="text-cyber-600 dark:text-cyber-400 hover:underline font-semibold"
            >
              {t.auth.signInLink}
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
