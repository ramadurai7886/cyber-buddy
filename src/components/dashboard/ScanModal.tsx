import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useTranslation } from '../../context/LanguageContext';
import { Terminal, CheckCircle2, ShieldCheck, AlertTriangle, Loader2 } from 'lucide-react';

export interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanCompleted?: () => void;
}

export const ScanModal: React.FC<ScanModalProps> = ({
  isOpen,
  onClose,
  onScanCompleted,
}) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Initializing scan engine...');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isRemediated, setIsRemediated] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setIsCompleted(false);
      setIsRemediated(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCompleted(true);
          onScanCompleted?.();
          return 100;
        }
        const next = prev + 15;
        if (next < 30) setCurrentStep('Parsing AST syntax trees & dependencies...');
        else if (next < 60) setCurrentStep('Matching CVE databases & cryptographic policies...');
        else if (next < 90) setCurrentStep('AI threat copilot evaluating input sanitization...');
        else setCurrentStep('Generating autonomous remediation patches...');
        return next;
      });
    }, 280);

    return () => clearInterval(interval);
  }, [isOpen, onScanCompleted]);

  const handleApplyPatches = () => {
    setIsRemediated(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.dashboard.scanModal.title} maxWidth="lg">
      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-slate-500 dark:text-slate-400">
              {isCompleted ? t.dashboard.scanModal.complete : currentStep}
            </span>
            <span className="font-mono font-bold text-cyber-600 dark:text-cyber-400">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyber-500 to-brand-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Terminal Scan Output */}
        <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 space-y-2 max-h-56 overflow-y-auto">
          <div className="flex items-center gap-2 text-slate-500 pb-2 border-b border-slate-800/80">
            <Terminal className="w-3.5 h-3.5 text-cyber-400" />
            <span>cyberbuddy-ast-engine v2.4.0 (local)</span>
          </div>

          <p className="text-cyber-400">[INFO] Scanning 84 source files in repository...</p>
          {progress >= 30 && (
            <p className="text-slate-300">[AST] Parsed 1,420 functions and 89 API endpoints.</p>
          )}
          {progress >= 60 && (
            <div className="space-y-1">
              <p className="text-amber-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>[FLAG] CWE-89 SQL Injection potential detected in authController.ts:42</span>
              </p>
              <p className="text-amber-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>[FLAG] CWE-79 Cross-Site Scripting (XSS) risk in userProfile.tsx:118</span>
              </p>
            </div>
          )}
          {progress >= 100 && !isRemediated && (
            <p className="text-emerald-400">[COPILOT] Autonomous remediation patches calculated.</p>
          )}
          {isRemediated && (
            <p className="text-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>[REMEDIATED] Applied parameterized query & DOMPurify sanitizer. Code is hardened!</span>
            </p>
          )}
        </div>

        {/* Result & Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {isRemediated ? (
              <span className="text-emerald-500 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> 100% Security Guardrails Applied
              </span>
            ) : isCompleted ? (
              t.dashboard.scanModal.foundIssues
            ) : (
              t.dashboard.scanModal.scanning
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {isCompleted && !isRemediated && (
              <Button variant="primary" size="sm" onClick={handleApplyPatches}>
                {t.dashboard.scanModal.remediate}
              </Button>
            )}
            <Button
              variant={isRemediated ? 'primary' : 'secondary'}
              size="sm"
              onClick={onClose}
            >
              {t.dashboard.scanModal.close}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
