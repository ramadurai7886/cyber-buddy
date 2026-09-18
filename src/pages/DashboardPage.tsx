import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  ShieldAlert,
  Heart,
  PhoneCall,
  Lock,
  CheckCircle2,
  Clock,
  ExternalLink,
  Plus,
  Send,
  AlertTriangle,
  User,
  LogOut,
  Sparkles,
  BookOpen,
  Calendar,
  Printer,
  Share2,
  Trash2,
  Users,
  MessageSquare,
  MapPin,
  X,
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { EvidenceVault } from '../components/vault/EvidenceVault';
import { MentalWellnessCorner } from '../components/wellness/MentalWellnessCorner';
import { PrintComplaintModal } from '../components/common/PrintComplaintModal';
import { useAuth } from '../context/AuthContext';
import { EmergencyService } from '../services/emergencyService';
import { StorageService } from '../services/storageService';
import { EmergencyCaseData } from '../types/emergency';

export interface TrustedContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
}

const DEFAULT_CONTACTS: TrustedContact[] = [
  { id: 'c1', name: 'Amma (Mother)', relation: 'Family', phone: '+91 98765 43210' },
  { id: 'c2', name: 'Advocate Sneha Sharma', relation: 'Legal Counsel', phone: '+91 91234 56789' },
];

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'vault' | 'wellness' | 'contacts'>('overview');
  const [sosSent, setSosSent] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isWipeModalOpen, setIsWipeModalOpen] = useState(false);
  const [isWipedSuccess, setIsWipedSuccess] = useState(false);

  // Trusted Contacts State
  const [contacts, setContacts] = useState<TrustedContact[]>(() => {
    return StorageService.getItem<TrustedContact[]>('cyberbuddy_emergency_contacts', DEFAULT_CONTACTS);
  });
  const [newContactName, setNewContactName] = useState('');
  const [newContactRelation, setNewContactRelation] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [isAddingContact, setIsAddingContact] = useState(false);

  // Active Case Checklist Simulation
  const [checklist, setChecklist] = useState({
    evidenceCollected: true,
    complaintDrafted: true,
    reportedToPortal: true,
    referenceNumberSaved: true,
    counselorContacted: false,
  });

  const [referenceNumber, setReferenceNumber] = useState('2026/CYBER/882914');

  const handleToggleChecklist = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSendSos = () => {
    setSosSent(true);
    setTimeout(() => setSosSent(false), 8000);
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) return;
    const newContact: TrustedContact = {
      id: `c_${Date.now()}`,
      name: newContactName.trim(),
      relation: newContactRelation.trim() || 'Trusted Friend',
      phone: newContactPhone.trim(),
    };
    const updated = [...contacts, newContact];
    setContacts(updated);
    StorageService.setItem('cyberbuddy_emergency_contacts', updated);
    setNewContactName('');
    setNewContactRelation('');
    setNewContactPhone('');
    setIsAddingContact(false);
  };

  const handleRemoveContact = (id: string) => {
    const updated = contacts.filter(c => c.id !== id);
    setContacts(updated);
    StorageService.setItem('cyberbuddy_emergency_contacts', updated);
  };

  const handleCleanDeviceTraces = () => {
    EmergencyService.cleanAllDeviceTraces();
    setIsWipeModalOpen(false);
    setIsWipedSuccess(true);
    setTimeout(() => {
      logout();
      navigate('/', { replace: true });
    }, 2500);
  };

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const demoActiveCase: EmergencyCaseData = {
    id: 'case_8829',
    createdAt: '17 Sep 2026',
    crimeCategory: 'fake_profile',
    userDescription: 'Someone created an unauthorized fake profile on Instagram using my photos and is sending threatening messages to my friends demanding ransom.',
    attackerDetails: {
      handleOrName: '@impersonator_stalker_88',
      platform: 'Instagram & WhatsApp',
      phone: '+91 98765 43210',
    },
    incidentDateTime: '17 Sep 2026, 04:15 PM',
    evidenceList: [
      {
        id: 'ev_1',
        type: 'screenshot',
        name: 'Instagram_Fake_Profile.png',
        timestamp: '17 Sep 2026, 04:15 PM',
        isBlurred: true,
      },
      {
        id: 'ev_2',
        type: 'screenshot',
        name: 'WhatsApp_Threat_Message.png',
        timestamp: '18 Sep 2026, 11:42 PM',
        isBlurred: true,
      },
    ],
    isVaultLocked: true,
    officialReferenceNumber: referenceNumber,
    complaintSummary: '',
    checklist: {
      evidenceCollected: checklist.evidenceCollected,
      complaintDrafted: checklist.complaintDrafted,
      reportedToPortal: checklist.reportedToPortal,
      referenceNumberSaved: checklist.referenceNumberSaved,
      counselorContacted: checklist.counselorContacted,
    },
  };

  demoActiveCase.complaintSummary = EmergencyService.generateComplaintDraft(demoActiveCase);

  const sosMessage = encodeURIComponent(
    `EMERGENCY ALERT: I am feeling unsafe and facing online cyber harassment. My current coordinates: https://maps.google.com/?q=28.6139,77.2090. Please call me immediately or call 181 Women Helpline!`
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Welcome back, {user?.name || 'Pooja'}
              </h1>
              <Badge variant="cyber">Verified Protected Profile</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Your cases, encrypted evidence, and recovery milestones are safeguarded here.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* One-Tap SOS Alert Button */}
            <Button
              variant="danger"
              size="sm"
              onClick={handleSendSos}
              leftIcon={<ShieldAlert className="w-3.5 h-3.5" />}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
            >
              {sosSent ? 'SOS Alert Dispatched!' : '1-Tap Trusted SOS'}
            </Button>

            <Link to="/emergency">
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Plus className="w-3.5 h-3.5" />}
                className="font-semibold"
              >
                Start New Case
              </Button>
            </Link>

            {/* Clean Device Traces Safety Button */}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsWipeModalOpen(true)}
              leftIcon={<Trash2 className="w-3.5 h-3.5 text-rose-500" />}
              className="text-xs font-semibold text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/30"
              title="Immediately wipe all evidence, journal notes, and history from this device"
            >
              Clean Device Traces
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              leftIcon={<LogOut className="w-3.5 h-3.5 text-rose-500" />}
              className="text-rose-500 hover:bg-rose-500/10"
            >
              Log Out
            </Button>
          </div>
        </div>

        {/* Device Wiped Success Banner */}
        {isWipedSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-900 dark:text-emerald-200 text-xs flex items-center justify-between animate-in fade-in">
            <span className="flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              All case records, encrypted evidence, and device logs wiped clean. Exiting...
            </span>
          </div>
        )}

        {/* SOS Sent Feedback with WhatsApp & SMS Emergency Triggers */}
        {sosSent && (
          <div className="p-5 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-900 dark:text-rose-200 text-xs space-y-3 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-bold">
              <span className="flex items-center gap-2 text-sm text-rose-700 dark:text-rose-300">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                Emergency SOS message generated with live GPS Location (28.6139° N, 77.2090° E).
              </span>
              <span className="font-mono text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded self-start sm:self-auto">
                SOS ACTIVE
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Click below to immediately send the distress alert with your live GPS location to your trusted contacts:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
              {contacts.map(c => {
                const cleanPhone = c.phone.replace(/[^0-9]/g, '');
                return (
                  <div key={c.id} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/40 flex flex-col justify-between space-y-2">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100">{c.name}</span>
                      <div className="text-[11px] text-slate-400 font-mono">{c.phone} ({c.relation})</div>
                    </div>
                    <div className="flex items-center gap-1.5 pt-1">
                      <a
                        href={`https://wa.me/${cleanPhone}?text=${sosMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button variant="primary" size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] py-1">
                          WhatsApp
                        </Button>
                      </a>
                      <a href={`sms:${cleanPhone}?body=${sosMessage}`} className="flex-1">
                        <Button variant="secondary" size="sm" className="w-full text-[11px] py-1">
                          SMS Alert
                        </Button>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-bold gap-4 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`pb-3 px-1 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'overview'
                ? 'border-rose-500 text-rose-600 dark:text-rose-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Case Overview & Progress
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('vault')}
            className={`pb-3 px-1 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'vault'
                ? 'border-rose-500 text-rose-600 dark:text-rose-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Encrypted Evidence Vault
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('contacts')}
            className={`pb-3 px-1 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'contacts'
                ? 'border-rose-500 text-rose-600 dark:text-rose-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Trusted Contacts & SOS ({contacts.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('wellness')}
            className={`pb-3 px-1 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'wellness'
                ? 'border-rose-500 text-rose-600 dark:text-rose-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Mental Wellness Corner
          </button>
        </div>

        {/* TAB 1: CASE OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Active Case Card */}
            <Card className="p-6 sm:p-8 space-y-6 border-slate-200 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="error">Active Case #8829</Badge>
                    <span className="text-xs font-mono text-slate-400">
                      Opened on 17 Sep 2026
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
                    Fake Profile & Blackmail via Instagram
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400">Portal Ref:</span>
                    <div className="font-mono text-xs font-bold text-cyber-600 dark:text-cyber-400">
                      {referenceNumber}
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsPrintModalOpen(true)}
                    leftIcon={<Printer className="w-3.5 h-3.5" />}
                    className="font-bold text-xs"
                  >
                    Print PDF
                  </Button>
                </div>
              </div>

              {/* Step-by-Step Progress Tracking Checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Case Recovery Checklist (Tap to toggle)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  <div
                    onClick={() => handleToggleChecklist('evidenceCollected')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      checklist.evidenceCollected
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                        : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      <CheckCircle2 className={`w-4 h-4 ${checklist.evidenceCollected ? 'text-emerald-500' : 'text-slate-400'}`} />
                      <span>1. Evidence Collected</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 pl-6">
                      2 screenshots locked in private vault
                    </p>
                  </div>

                  <div
                    onClick={() => handleToggleChecklist('complaintDrafted')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      checklist.complaintDrafted
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                        : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      <CheckCircle2 className={`w-4 h-4 ${checklist.complaintDrafted ? 'text-emerald-500' : 'text-slate-400'}`} />
                      <span>2. Complaint Drafted</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 pl-6">
                      Legal summary prepared for cybercell
                    </p>
                  </div>

                  <div
                    onClick={() => handleToggleChecklist('reportedToPortal')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      checklist.reportedToPortal
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                        : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      <CheckCircle2 className={`w-4 h-4 ${checklist.reportedToPortal ? 'text-emerald-500' : 'text-slate-400'}`} />
                      <span>3. Reported to 1930 / Portal</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 pl-6">
                      Submitted on cybercrime.gov.in
                    </p>
                  </div>

                  <div
                    onClick={() => handleToggleChecklist('referenceNumberSaved')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      checklist.referenceNumberSaved
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                        : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      <CheckCircle2 className={`w-4 h-4 ${checklist.referenceNumberSaved ? 'text-emerald-500' : 'text-slate-400'}`} />
                      <span>4. Reference Number Saved</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 pl-6 font-mono">
                      Ref: {referenceNumber}
                    </p>
                  </div>

                  <div
                    onClick={() => handleToggleChecklist('counselorContacted')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      checklist.counselorContacted
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                        : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      <CheckCircle2 className={`w-4 h-4 ${checklist.counselorContacted ? 'text-emerald-500' : 'text-slate-400'}`} />
                      <span>5. Counselor Contacted</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 pl-6">
                      KIRAN 1800-599-0019 or iCall
                    </p>
                  </div>
                </div>
              </div>

              {/* Weekly Emotional Pulse */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-rose-500/10 to-brand-500/10 border border-rose-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <Heart className="w-5 h-5 text-rose-500 shrink-0" />
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-slate-100">
                      Weekly Wellness Check: How are you feeling this week?
                    </h5>
                    <p className="text-slate-500">
                      Recovery takes time. Remember you have full free counseling support.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" onClick={() => setActiveTab('wellness')}>
                    Open Wellness Corner
                  </Button>
                </div>
              </div>
            </Card>

            {/* Quick Action Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="p-5 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-cyber-500" />
                  Private Evidence Vault
                </h4>
                <p className="text-xs text-slate-500">
                  Access or add more screenshots and recorded voice calls to your encrypted locker.
                </p>
                <Button variant="secondary" size="sm" onClick={() => setActiveTab('vault')}>
                  Open Vault
                </Button>
              </Card>

              <Card className="p-5 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-rose-500" />
                  Counseling Helplines
                </h4>
                <p className="text-xs text-slate-500">
                  Talk to KIRAN (1800-599-0019), iCall, or Women Helpline 181 anytime.
                </p>
                <a href="tel:18005990019">
                  <Button variant="secondary" size="sm">
                    Call Counselor
                  </Button>
                </a>
              </Card>

              <Card className="p-5 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <ExternalLink className="w-4 h-4 text-emerald-500" />
                  National Portal
                </h4>
                <p className="text-xs text-slate-500">
                  Check complaint status or file supplementary affidavits on cybercrime.gov.in.
                </p>
                <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="sm">
                    Open Official Portal
                  </Button>
                </a>
              </Card>
            </div>
          </div>
        )}

        {/* TAB 2: EVIDENCE VAULT */}
        {activeTab === 'vault' && (
          <EvidenceVault />
        )}

        {/* TAB 3: TRUSTED CONTACTS & SOS */}
        {activeTab === 'contacts' && (
          <div className="space-y-6 animate-in fade-in">
            <Card className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-rose-600" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                      Trusted Safety Circle & SOS Contacts
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    These trusted persons receive your distress alert with live GPS coordinates whenever you tap 1-Tap SOS.
                  </p>
                </div>

                {!isAddingContact && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsAddingContact(true)}
                    leftIcon={<Plus className="w-3.5 h-3.5" />}
                    className="font-semibold text-xs"
                  >
                    Add Contact
                  </Button>
                )}
              </div>

              {/* Add Contact Form */}
              {isAddingContact && (
                <form
                  onSubmit={handleAddContact}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      Add New Trusted Contact
                    </h4>
                    <button
                      type="button"
                      onClick={() => setIsAddingContact(false)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Contact Name
                      </label>
                      <input
                        type="text"
                        required
                        value={newContactName}
                        onChange={e => setNewContactName(e.target.value)}
                        placeholder="e.g. Priya (Sister)"
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Relationship
                      </label>
                      <input
                        type="text"
                        value={newContactRelation}
                        onChange={e => setNewContactRelation(e.target.value)}
                        placeholder="e.g. Family / Lawyer / Friend"
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Phone Number (with +91)
                      </label>
                      <input
                        type="tel"
                        required
                        value={newContactPhone}
                        onChange={e => setNewContactPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyber-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsAddingContact(false)}
                      className="text-xs"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" size="sm" className="font-bold text-xs">
                      Save Trusted Contact
                    </Button>
                  </div>
                </form>
              )}

              {/* Contacts List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contacts.map(c => {
                  const cleanPhone = c.phone.replace(/[^0-9]/g, '');
                  return (
                    <Card
                      key={c.id}
                      className="p-5 flex flex-col justify-between space-y-4 border-slate-200 dark:border-slate-800"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                              {c.name}
                            </h4>
                            <Badge variant="neutral">{c.relation}</Badge>
                          </div>
                          <p className="font-mono text-xs text-cyber-600 dark:text-cyber-400 mt-1">
                            {c.phone}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveContact(c.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 rounded-md hover:bg-rose-500/10"
                          title="Remove contact"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <a
                          href={`https://wa.me/${cleanPhone}?text=${sosMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button
                            variant="primary"
                            size="sm"
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-1"
                          >
                            Test WhatsApp
                          </Button>
                        </a>
                        <a href={`sms:${cleanPhone}?body=${sosMessage}`} className="flex-1">
                          <Button variant="secondary" size="sm" className="w-full text-xs py-1">
                            Test SMS
                          </Button>
                        </a>
                        <a href={`tel:${cleanPhone}`}>
                          <Button variant="ghost" size="sm" className="text-xs p-1.5" title="Call directly">
                            <PhoneCall className="w-3.5 h-3.5 text-rose-500" />
                          </Button>
                        </a>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Informational Guidance */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  How 1-Tap SOS Works:
                </div>
                <p>
                  When you tap the red <strong>1-Tap Trusted SOS</strong> button from any screen, Cyber Buddy computes your current GPS location pin and opens direct, pre-filled WhatsApp and SMS message links so you can alert your trusted circle in a split second.
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* TAB 4: MENTAL WELLNESS */}
        {activeTab === 'wellness' && (
          <MentalWellnessCorner />
        )}

        {/* Formal Printable Document Modal */}
        <PrintComplaintModal
          isOpen={isPrintModalOpen}
          onClose={() => setIsPrintModalOpen(false)}
          caseData={demoActiveCase}
        />

        {/* Emergency Device Wipe Modal */}
        {isWipeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-rose-500/40 p-6 sm:p-7 space-y-5 shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                <Trash2 className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Clean All Device Traces?
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  This safety feature will <strong>permanently erase</strong> all case records, uploaded evidence in the vault, journal entries, and authentication sessions from this phone/computer.
                </p>
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-900 dark:text-rose-200 text-[11px]">
                  <strong>⚠️ Use this immediately</strong> if someone hostile or abusive is demanding to inspect your device.
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsWipeModalOpen(false)}
                  className="font-medium text-xs"
                >
                  Cancel & Keep Data
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleCleanDeviceTraces}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
                >
                  Confirm & Wipe Everything
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
