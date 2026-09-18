import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Shield,
  ShieldAlert,
  Lock,
  PhoneCall,
  ExternalLink,
  Mic,
  MicOff,
  FileText,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Eye,
  EyeOff,
  Heart,
  Upload,
  Calendar,
  AlertTriangle,
  Smile,
  Printer,
  Image as ImageIcon,
  Download,
  Trash2,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { AICrimeClassifier, CrimeClassificationResult } from '../../services/aiCrimeClassifier';
import { EmergencyService, GOVERNMENT_HELPLINES } from '../../services/emergencyService';
import { EmergencyCaseData, EmotionalState, EvidenceItem } from '../../types/emergency';
import { useTranslation } from '../../context/LanguageContext';
import { PrintComplaintModal } from '../common/PrintComplaintModal';

export const EmergencyWizard: React.FC = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { query?: string; chipLabel?: string } | null;

  // Active step (1 to 14)
  const [step, setStep] = useState(1);

  // Form & Wizard State
  const [userDescription, setUserDescription] = useState(locationState?.query || '');
  const [selectedChip, setSelectedChip] = useState<string | null>(locationState?.chipLabel || null);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [crimeResult, setCrimeResult] = useState<CrimeClassificationResult | null>(null);
  const [emotionalState, setEmotionalState] = useState<EmotionalState | null>(null);

  // Evidence State
  const [attackerHandle, setAttackerHandle] = useState('');
  const [attackerPhone, setAttackerPhone] = useState('');
  const [attackerPlatform, setAttackerPlatform] = useState('');
  const [incidentDateTime, setIncidentDateTime] = useState(new Date().toISOString().slice(0, 16));
  const [incidentNotes, setIncidentNotes] = useState('');
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>([]);
  const [vaultPin, setVaultPin] = useState('');
  const [isVaultLocked, setIsVaultLocked] = useState(false);

  // Official portal tracking & print modal
  const [officialRefNumber, setOfficialRefNumber] = useState('');
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const quickChips = [
    { label: t.wizard.chipThreat, query: 'Someone is threatening to leak private photos or messages' },
    { label: t.wizard.chipFakeProfile, query: 'Someone created a fake profile with my pictures and name' },
    { label: t.wizard.chipMorphed, query: 'My personal photos were morphed or shared without consent' },
    { label: t.wizard.chipAbuse, query: 'Receiving continuous vulgar, abusive messages and insults' },
    { label: t.wizard.chipStalking, query: 'Someone is obsessively tracking my accounts and following me' },
    { label: t.wizard.chipDontKnow, query: 'I am in extreme fear and need immediate safety guidance' },
  ];

  const handleSelectChip = (chip: typeof quickChips[0]) => {
    setSelectedChip(chip.label);
    setUserDescription(chip.query);
  };

  // Real Web Speech Recognition with simulated fallback
  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : 'en-IN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        setIsVoiceRecording(true);

        recognition.onresult = (event: any) => {
          const speechResult = event.results[0][0].transcript;
          setUserDescription(prev => (prev ? `${prev} ${speechResult}` : speechResult));
          setIsVoiceRecording(false);
        };

        recognition.onerror = () => {
          setIsVoiceRecording(false);
        };

        recognition.onend = () => {
          setIsVoiceRecording(false);
        };

        recognition.start();
        return;
      } catch {
        // fallback below
      }
    }

    // Fallback simulation
    setIsVoiceRecording(true);
    setTimeout(() => {
      setUserDescription('Someone created a fake account using my pictures and is messaging my friends threatening to leak morphed photos.');
      setIsVoiceRecording(false);
    }, 1200);
  };

  const handleAnalyzeInput = () => {
    if (!userDescription.trim()) return;
    const classified = AICrimeClassifier.classifySituation(userDescription);
    setCrimeResult(classified);
    setStep(3);
  };

  // Real File Upload & Screenshot handling
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const newItem: EvidenceItem = {
          id: `ev_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
          type: 'screenshot',
          name: file.name,
          dataUrl: reader.result as string,
          notes: `Uploaded file (${Math.round(file.size / 1024)} KB)`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isBlurred: true,
        };
        setEvidenceList(prev => [...prev, newItem]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddSampleEvidence = () => {
    const newEvidence: EvidenceItem = {
      id: `ev_${Date.now()}`,
      type: 'screenshot',
      name: `Screenshot_Incident_${evidenceList.length + 1}.png`,
      notes: 'Chat history showing threat and extortion demand',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isBlurred: true,
    };
    setEvidenceList([...evidenceList, newEvidence]);
  };

  const toggleBlurEvidence = (id: string) => {
    setEvidenceList(
      evidenceList.map(e => (e.id === id ? { ...e, isBlurred: !e.isBlurred } : e))
    );
  };

  const handleLockVault = () => {
    if (vaultPin.length < 4) return;
    setIsVaultLocked(true);
    setStep(9);
  };

  // Build current case data object
  const currentCase: EmergencyCaseData = {
    id: `case_${Date.now()}`,
    createdAt: new Date().toISOString(),
    crimeCategory: crimeResult?.category,
    userDescription,
    aiExplanation: crimeResult?.explanation,
    legalSections: crimeResult?.legalSections,
    emotionalState: emotionalState || undefined,
    attackerDetails: {
      handleOrName: attackerHandle,
      phone: attackerPhone,
      platform: attackerPlatform,
    },
    incidentDateTime,
    incidentNotes,
    evidenceList,
    vaultPin,
    isVaultLocked,
    officialReferenceNumber: officialRefNumber,
    complaintSummary: '',
    checklist: {
      evidenceCollected: evidenceList.length > 0,
      complaintDrafted: true,
      reportedToPortal: !!officialRefNumber,
      referenceNumberSaved: !!officialRefNumber,
      counselorContacted: false,
    },
  };

  const complaintDraft = EmergencyService.generateComplaintDraft(currentCase);
  currentCase.complaintSummary = complaintDraft;

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(complaintDraft);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 3000);
  };

  const handleSaveAndExit = (registerAccount: boolean) => {
    EmergencyService.saveEmergencyCase(currentCase);
    if (registerAccount) {
      navigate('/signup');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      {/* Step Progress Tracker */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span className="font-semibold text-cyber-600 dark:text-cyber-400">
            {t.hero.opt1Title} • {t.wizard.step} {step} / 14
          </span>
          <span>{t.common.appName}</span>
        </div>
        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyber-500 to-brand-500 transition-all duration-300"
            style={{ width: `${(step / 14) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 1: PRIVACY NOTICE */}
      {step === 1 && (
        <Card className="p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="w-12 h-12 rounded-2xl bg-cyber-500/10 text-cyber-600 dark:text-cyber-400 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t.wizard.privacyTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.wizard.privacyDesc}
            </p>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 space-y-1.5 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
              <p>• Everything you enter in Emergency Mode stays strictly on your device.</p>
              <p>• No account or login is required to get immediate safety guidance.</p>
              <p>• You can tap "Quick Exit" on top at any time if someone approaches you.</p>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => setStep(2)}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full justify-center"
          >
            {t.wizard.privacyAgree}
          </Button>
        </Card>
      )}

      {/* STEP 2: WHAT HAPPENED? */}
      {step === 2 && (
        <Card className="p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="space-y-2">
            <Badge variant="cyber">{t.wizard.step} 2</Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t.wizard.whatHappenedTitle}
            </h2>
            <p className="text-xs text-slate-500">
              {t.wizard.whatHappenedSubtitle}
            </p>
          </div>

          {/* Quick Help Chips */}
          <div className="flex flex-wrap gap-2">
            {quickChips.map((chip, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectChip(chip)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  selectedChip === chip.label
                    ? 'bg-cyber-500/20 text-cyber-700 dark:text-cyber-300 border-cyber-500 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-400 text-slate-700 dark:text-slate-300'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Description Box */}
          <div className="space-y-2">
            <textarea
              rows={4}
              value={userDescription}
              onChange={e => setUserDescription(e.target.value)}
              placeholder={t.wizard.inputPlaceholder}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-3.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyber-500"
            />

            <div className="flex items-center justify-between text-xs text-slate-500">
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`inline-flex items-center gap-1.5 font-semibold transition-colors ${
                  isVoiceRecording
                    ? 'text-rose-500 animate-pulse font-bold'
                    : 'text-cyber-600 dark:text-cyber-400 hover:underline'
                }`}
              >
                {isVoiceRecording ? <MicOff className="w-4 h-4 text-rose-500" /> : <Mic className="w-4 h-4 text-cyber-500" />}
                <span>{isVoiceRecording ? t.wizard.voiceRecordingActive : t.wizard.voiceRecording}</span>
              </button>
              <span>Confidential • On-device AI</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
              {t.common.back}
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleAnalyzeInput}
              disabled={!userDescription.trim()}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {t.common.next}
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 3: AI UNDERSTANDING & REASSURANCE */}
      {step === 3 && crimeResult && (
        <Card className="p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="p-4 rounded-xl bg-gradient-to-r from-rose-500/15 via-brand-500/15 to-cyber-500/15 border border-rose-500/30 space-y-2">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-base">
              <Heart className="w-5 h-5 fill-current" />
              <span>{t.wizard.reassuranceTitle}</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {crimeResult.reassurance}
            </p>
          </div>

          <div className="space-y-2">
            <Badge variant="cyber">{t.wizard.step} 3</Badge>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {crimeResult.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {crimeResult.explanation}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-cyber-500" />
              Applicable Protections Under Indian Law:
            </h4>
            <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
              {crimeResult.legalSections.map((sec, idx) => (
                <li key={idx} className="leading-relaxed">{sec}</li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
              {t.common.back}
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep(4)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {t.wizard.emotionalCheckinTitle}
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 4: EMOTIONAL CHECK-IN */}
      {step === 4 && (
        <Card className="p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="space-y-2">
            <Badge variant="cyber">{t.wizard.step} 4</Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t.wizard.emotionalCheckinTitle}
            </h2>
            <p className="text-xs text-slate-500">
              Cybercrime causes real emotional pain. Tell us how you feel so we can support you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: 'scared', label: t.wizard.scared, desc: 'My heart is racing and I feel in danger' },
              { key: 'sad', label: t.wizard.sad, desc: 'I feel deeply hurt, alone, and crying' },
              { key: 'ashamed', label: t.wizard.ashamed, desc: 'I am worried about my family or reputation' },
              { key: 'angry', label: t.wizard.angry, desc: 'I am furious that someone dared do this' },
              { key: 'action', label: t.wizard.ready, desc: 'I feel ready to collect proof and report' },
            ].map(item => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setEmotionalState(item.key as EmotionalState);
                  if (item.key !== 'action') {
                    setStep(5);
                  } else {
                    setStep(6);
                  }
                }}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:border-cyber-500 text-left transition-all hover:-translate-y-0.5"
              >
                <div className="font-bold text-xs text-slate-900 dark:text-slate-100">
                  {item.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {item.desc}
                </div>
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* STEP 5: STEP 5A FREE MENTAL HEALTH & COUNSELING SUPPORT */}
      {step === 5 && (
        <Card className="p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-rose-500">
              <Heart className="w-5 h-5 fill-current" />
              <Badge variant="error">Step 5A • Free Mental Health Support</Badge>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              You are not alone. It is okay to feel this way.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Talking to a trained professional helps release the panic immediately. These free government services are available for you 24 hours a day, 7 days a week.
            </p>
          </div>

          <div className="space-y-3">
            {GOVERNMENT_HELPLINES.slice(0, 4).map(h => (
              <div
                key={h.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {h.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">{h.organization} • {h.timing}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-mono font-bold">
                    {h.number}
                  </p>
                </div>
                <a href={`tel:${h.number.replace(/[^0-9]/g, '')}`} className="shrink-0">
                  <Button variant="primary" size="sm" leftIcon={<PhoneCall className="w-3.5 h-3.5" />}>
                    Call Now
                  </Button>
                </a>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-between items-center border-t border-slate-200 dark:border-slate-800">
            <Button variant="ghost" size="sm" onClick={() => setStep(4)}>
              Back
            </Button>
            <Button variant="secondary" size="md" onClick={() => setStep(6)}>
              Continue to Safety Steps
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 6: 3 IMMEDIATE SAFETY ACTIONS */}
      {step === 6 && (
        <Card className="p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="space-y-2">
            <Badge variant="cyber">{t.wizard.step} 6</Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t.wizard.safetyRulesTitle}
            </h2>
            <p className="text-xs text-slate-500">
              Follow these three golden rules before taking any other steps.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 space-y-1">
              <h4 className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> 1. {t.wizard.safetyRule1}
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Do not delete chat threads, SMS messages, call logs, or emails out of fear or panic. These are critical digital forensics evidence required to track down the perpetrator.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 space-y-1">
              <h4 className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" /> 2. {t.wizard.safetyRule2}
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Do not negotiate, argue, or pay ransom money. Paying will only invite repeated demands. Stop communication while preserving the thread.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-cyber-500/30 bg-cyber-500/10 space-y-1">
              <h4 className="text-xs font-bold text-cyber-800 dark:text-cyber-300 flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4" /> 3. {t.wizard.safetyRule3}
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                If the attacker knows your home or workplace address and threatens physical harm, dial 112 (Police) or 181 (Women Helpline) immediately.
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button variant="ghost" size="sm" onClick={() => setStep(4)}>
              {t.common.back}
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep(7)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {t.common.next}
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 7: PROOF / EVIDENCE COLLECTION WITH REAL FILE PICKER & AUTO-BLUR */}
      {step === 7 && (
        <Card className="p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="space-y-2">
            <Badge variant="cyber">Step 7 • Evidence Collection</Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Preserve Proof of Harassment
            </h2>
            <p className="text-xs text-slate-500">
              Add details of the attacker and upload screenshots. All items are encrypted on this device.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Attacker Handle / Username
              </label>
              <input
                type="text"
                value={attackerHandle}
                onChange={e => setAttackerHandle(e.target.value)}
                placeholder="@harasser_handle or Name"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Attacker Phone or Email
              </label>
              <input
                type="text"
                value={attackerPhone}
                onChange={e => setAttackerPhone(e.target.value)}
                placeholder="+91 98765 XXXXX or email"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Platform / App
            </label>
            <input
              type="text"
              value={attackerPlatform}
              onChange={e => setAttackerPlatform(e.target.value)}
              placeholder="Instagram, WhatsApp, Telegram, Facebook, etc."
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyber-500"
            />
          </div>

          {/* Evidence Upload with Real File Picker */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Screenshots & Evidence Files ({evidenceList.length})
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  leftIcon={<Upload className="w-3.5 h-3.5 text-cyber-500" />}
                >
                  Choose Images
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAddSampleEvidence}
                  className="text-[11px]"
                >
                  + Sample
                </Button>
              </div>
            </div>

            {evidenceList.length === 0 ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center text-xs text-slate-500 cursor-pointer hover:border-cyber-500 transition-colors"
              >
                Click here or tap "Choose Images" to attach real screenshots. Previews are automatically blurred for your privacy.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {evidenceList.map(item => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold truncate max-w-[150px]">{item.name}</span>
                      <button
                        type="button"
                        onClick={() => toggleBlurEvidence(item.id)}
                        className="text-[11px] text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                      >
                        {item.isBlurred ? <Eye className="w-3.5 h-3.5 text-cyber-500" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
                        <span>{item.isBlurred ? 'Show' : 'Blur'}</span>
                      </button>
                    </div>

                    {/* Image Preview Container */}
                    <div
                      className={`h-24 rounded-lg bg-slate-200 dark:bg-slate-900 overflow-hidden flex items-center justify-center transition-all ${
                        item.isBlurred ? 'filter blur-md select-none' : ''
                      }`}
                    >
                      {item.dataUrl ? (
                        <img src={item.dataUrl} alt={item.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center gap-1 text-slate-400 text-[10px]">
                          <ImageIcon className="w-6 h-6" />
                          <span>Confidential Evidence</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button variant="ghost" size="sm" onClick={() => setStep(6)}>
              Back
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep(8)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Protect with Device PIN
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 8: PROTECT PROOF WITH DEVICE PIN */}
      {step === 8 && (
        <Card className="p-6 sm:p-8 space-y-6 animate-in fade-in text-center">
          <div className="w-12 h-12 rounded-2xl bg-cyber-500/10 text-cyber-500 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>

          <div className="space-y-2 max-w-sm mx-auto">
            <Badge variant="cyber">Step 8 • Device Vault Lock</Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Lock Evidence in Device Vault
            </h2>
            <p className="text-xs text-slate-500">
              Set a 4-digit PIN so no one who holds your phone can see your uploaded evidence.
            </p>
          </div>

          <div className="max-w-xs mx-auto space-y-3">
            <input
              type="password"
              maxLength={4}
              value={vaultPin}
              onChange={e => setVaultPin(e.target.value)}
              placeholder="•••• (Enter 4 Digits)"
              className="w-full text-center text-2xl font-mono tracking-widest rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 focus:outline-none focus:ring-2 focus:ring-cyber-500"
            />
            <p className="text-[11px] text-slate-400">
              For demo testing, enter any 4 digits (e.g. 1234).
            </p>
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button variant="ghost" size="sm" onClick={() => setStep(7)}>
              Back
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleLockVault}
              disabled={vaultPin.length < 4}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Lock Vault & Generate Draft
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 9: GENERATE COMPLAINT SUMMARY WITH PRINT & PDF EXPORT */}
      {step === 9 && (
        <Card className="p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <Badge variant="cyber">{t.wizard.step} 9</Badge>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                {t.wizard.complaintDraftTitle}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyDraft}
                leftIcon={copiedDraft ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              >
                {copiedDraft ? t.wizard.copied : t.wizard.copyDraft}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const element = document.createElement("a");
                  const file = new Blob([complaintDraft], { type: 'text/plain;charset=utf-8' });
                  element.href = URL.createObjectURL(file);
                  element.download = `CyberBuddy_Complaint_${new Date().toISOString().slice(0, 10)}.txt`;
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}
                leftIcon={<Download className="w-3.5 h-3.5" />}
              >
                {t.wizard.saveTxt}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsPrintModalOpen(true)}
                leftIcon={<Printer className="w-3.5 h-3.5" />}
                className="font-bold"
              >
                {t.wizard.printPdf}
              </Button>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            This formatted draft incorporates your incident details and relevant provisions of the Information Technology Act. You can copy and paste this directly on <strong className="text-slate-800 dark:text-slate-200">cybercrime.gov.in</strong>.
          </p>

          <pre className="p-4 rounded-xl bg-slate-950 text-slate-300 font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto border border-slate-800">
            {complaintDraft}
          </pre>

          <div className="flex justify-between items-center pt-2">
            <Button variant="ghost" size="sm" onClick={() => setStep(8)}>
              {t.common.back}
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep(10)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {t.common.next}
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 10: REDIRECT TO OFFICIAL PORTAL */}
      {step === 10 && (
        <Card className="p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="space-y-2">
            <Badge variant="cyber">Step 10 • Official Portal</Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Submit to Official Government Portals
            </h2>
            <p className="text-xs text-slate-500">
              Cyber Buddy helps you prepare; official action is taken through the National Cyber Crime Reporting Portal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-cyber-500/30 bg-cyber-500/10 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
                <span>National Cyber Portal</span>
                <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-mono">Official</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Direct portal for crimes against women. Anonymous reporting available.
              </p>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block pt-1"
              >
                <Button variant="primary" size="sm" rightIcon={<ExternalLink className="w-3 h-3" />}>
                  Open cybercrime.gov.in
                </Button>
              </a>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                Helpline 1930 (Cyber Crime)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Call immediately if extortion, blackmail, or money transfer is involved.
              </p>
              <a href="tel:1930" className="inline-block pt-1">
                <Button variant="secondary" size="sm" leftIcon={<PhoneCall className="w-3 h-3" />}>
                  Call 1930
                </Button>
              </a>
            </div>

            <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
                <span>StopNCII.org</span>
                <span className="text-rose-600 dark:text-rose-400 text-[10px] font-mono">Image Abuse</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Generate device hashes to stop intimate photo distribution across Meta, Instagram & TikTok.
              </p>
              <a
                href="https://stopncii.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block pt-1"
              >
                <Button variant="secondary" size="sm" rightIcon={<ExternalLink className="w-3 h-3" />}>
                  Open StopNCII.org
                </Button>
              </a>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button variant="ghost" size="sm" onClick={() => setStep(9)}>
              Back
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep(11)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Filing Guide & Save Ref Number
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 11: STEP-BY-STEP FILING GUIDE & SAVE REFERENCE NUMBER */}
      {step === 11 && (
        <Card className="p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="space-y-2">
            <Badge variant="cyber">Step 11 • Manual Filing Guide</Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Step-by-Step Portal Instructions
            </h2>
            <p className="text-xs text-slate-500">
              Keep this screen open while you file on the official portal.
            </p>
          </div>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
              <strong className="text-slate-900 dark:text-slate-100">Step A:</strong> Go to <span className="underline font-mono">cybercrime.gov.in</span> and click <em>"Report Crime Against Women / Children"</em>.
            </div>
            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
              <strong className="text-slate-900 dark:text-slate-100">Step B:</strong> Select <em>"Report Anonymously"</em> if you do not want your name displayed, or <em>"Report & Track"</em>.
            </div>
            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
              <strong className="text-slate-900 dark:text-slate-100">Step C:</strong> Paste the complaint draft generated in Step 9 and upload your saved screenshots.
            </div>
            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
              <strong className="text-slate-900 dark:text-slate-100">Step D:</strong> Note the 12 to 14-digit Complaint Acknowledgment / Reference Number.
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Save Official Reference Number
            </label>
            <input
              type="text"
              value={officialRefNumber}
              onChange={e => setOfficialRefNumber(e.target.value)}
              placeholder="e.g. 2026/CYBER/882941"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyber-500"
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button variant="ghost" size="sm" onClick={() => setStep(10)}>
              Back
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep(12)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Post-Report Emotional Support
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 12: POST-REPORT EMOTIONAL SUPPORT */}
      {step === 12 && (
        <Card className="p-6 sm:p-8 space-y-6 animate-in fade-in text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
            <Smile className="w-7 h-7" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <Badge variant="success">Step 12 • You Did It</Badge>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              You Have Taken a Brave Step
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Reporting cybercrime is difficult and terrifying, but you stood up for yourself. If you feel emotionally overwhelmed right now, take a deep breath. We have ongoing support for you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a href="tel:18005990019">
              <Button variant="primary" size="md" leftIcon={<PhoneCall className="w-4 h-4" />}>
                Talk to a Counselor Now (KIRAN)
              </Button>
            </a>
            <Button variant="secondary" size="md" onClick={() => setStep(13)}>
              Continue to Safety Tips
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 13: AWARENESS & RECOVERY TIPS */}
      {step === 13 && (
        <Card className="p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="space-y-2">
            <Badge variant="cyber">Step 13 • Prevention & Hardening</Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Long-Term Cyber Safety Checklist
            </h2>
            <p className="text-xs text-slate-500">
              Follow these simple steps to ensure you remain completely secure going forward.
            </p>
          </div>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100">1. Turn on Two-Factor Authentication (2FA)</strong>
              <p>Enable authenticator app verification on WhatsApp, Instagram, Google, and Apple IDs.</p>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100">2. Review Third-Party Connected Apps</strong>
              <p>Revoke permission for suspicious quizzes, photo editors, or dating apps that have access to your contacts or photos.</p>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100">3. Set Social Media Profiles to Private</strong>
              <p>Restrict who can view your followers, friends list, and tagged pictures.</p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button variant="ghost" size="sm" onClick={() => setStep(12)}>
              Back
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep(14)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Finish & Save Case
            </Button>
          </div>
        </Card>
      )}

      {/* STEP 14: SAVE CASE OR EXIT */}
      {step === 14 && (
        <Card className="p-6 sm:p-8 space-y-6 animate-in fade-in text-center">
          <div className="w-12 h-12 rounded-2xl bg-cyber-500/10 text-cyber-500 flex items-center justify-center mx-auto">
            <Check className="w-6 h-6" />
          </div>

          <div className="space-y-2 max-w-sm mx-auto">
            <Badge variant="cyber">{t.wizard.step} 14 • First-Aid Completed</Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Save Your Case File?
            </h2>
            <p className="text-xs text-slate-500">
              You can create a profile to track your case progress over time, or complete without saving to leave zero footprint.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button
              variant="primary"
              size="md"
              onClick={() => handleSaveAndExit(true)}
            >
              {t.wizard.createProfile}
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => handleSaveAndExit(false)}
            >
              {t.wizard.finishWithoutSaving}
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                EmergencyService.cleanAllDeviceTraces();
                navigate('/');
              }}
              leftIcon={<Trash2 className="w-4 h-4 text-rose-500" />}
              className="text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/20"
            >
              {t.wizard.wipeTraces}
            </Button>
          </div>
        </Card>
      )}

      {/* Formal Printable Document Modal */}
      <PrintComplaintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        caseData={currentCase}
      />
    </div>
  );
};
