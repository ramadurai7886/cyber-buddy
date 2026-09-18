import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useTranslation } from '../context/LanguageContext';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyber-500">
            Error 404
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Page Not Found
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            The security endpoint or route you requested does not exist or has been relocated.
          </p>
        </div>
        <div>
          <Link to="/">
            <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Return to {t.common.appName} Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
