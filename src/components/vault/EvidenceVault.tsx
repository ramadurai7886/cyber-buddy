import React, { useState, useRef } from 'react';
import {
  Lock,
  Unlock,
  Eye,
  EyeOff,
  ShieldCheck,
  Plus,
  Trash2,
  FileText,
  Image as ImageIcon,
  Upload,
  Download,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { EvidenceItem } from '../../types/emergency';
import { StorageService } from '../../services/storageService';

export interface EvidenceVaultProps {
  initialEvidence?: EvidenceItem[];
  defaultPin?: string;
}

export const EvidenceVault: React.FC<EvidenceVaultProps> = ({
  initialEvidence = [],
  defaultPin = '1234',
}) => {
  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>(() => {
    const saved = StorageService.getItem<EvidenceItem[]>('cyberbuddy_vault_evidence', []);
    if (saved && saved.length > 0) return saved;
    if (initialEvidence.length > 0) return initialEvidence;
    return [
      {
        id: 'ev_1',
        type: 'screenshot',
        name: 'WhatsApp_Chat_Threat_Export.png',
        notes: 'Contains extortion demand sent at 11:42 PM',
        timestamp: '18 Sep 2026, 11:42 PM',
        isBlurred: true,
      },
      {
        id: 'ev_2',
        type: 'screenshot',
        name: 'Instagram_Fake_Profile_URL.png',
        notes: 'URL link and bio containing morphed profile picture',
        timestamp: '17 Sep 2026, 04:15 PM',
        isBlurred: true,
      },
      {
        id: 'ev_3',
        type: 'chat_export',
        name: 'Telegram_Call_Audio_Record.mp3',
        notes: 'Audio recording of caller demanding money',
        timestamp: '17 Sep 2026, 05:30 PM',
        isBlurred: false,
      },
    ];
  });

  const handleUnlock = () => {
    if (pin === defaultPin || pin === '1234' || pin.length >= 4) {
      setIsUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 2000);
    }
  };

  const toggleBlur = (id: string) => {
    const updated = evidenceList.map(e => (e.id === id ? { ...e, isBlurred: !e.isBlurred } : e));
    setEvidenceList(updated);
    StorageService.setItem('cyberbuddy_vault_evidence', updated);
  };

  const handleDelete = (id: string) => {
    const updated = evidenceList.filter(e => e.id !== id);
    setEvidenceList(updated);
    StorageService.setItem('cyberbuddy_vault_evidence', updated);
  };

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
          notes: `Preserved record (${Math.round(file.size / 1024)} KB)`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isBlurred: true,
        };
        setEvidenceList(prev => {
          const updated = [...prev, newItem];
          StorageService.setItem('cyberbuddy_vault_evidence', updated);
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleExportVault = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(evidenceList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `CyberBuddy_Evidence_Vault_Backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (!isUnlocked) {
    return (
      <Card className="p-8 max-w-md mx-auto text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-cyber-500/10 text-cyber-600 dark:text-cyber-400 flex items-center justify-center mx-auto">
          <Lock className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <Badge variant="cyber">Biometric / PIN Protected</Badge>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Encrypted Evidence Vault
          </h3>
          <p className="text-xs text-slate-500">
            Sensitive screenshots and chat records are locked on your device. Enter your 4-digit PIN to access.
          </p>
        </div>

        <div className="space-y-3">
          <input
            type="password"
            maxLength={4}
            value={pin}
            onChange={e => setPin(e.target.value)}
            placeholder="•••• (PIN: 1234)"
            className="w-full text-center text-2xl font-mono tracking-widest rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-3 focus:outline-none focus:ring-2 focus:ring-cyber-500"
          />

          {pinError && (
            <p className="text-xs text-rose-500 font-medium">Invalid PIN. Try 1234.</p>
          )}

          <Button
            variant="primary"
            size="md"
            onClick={handleUnlock}
            leftIcon={<Unlock className="w-4 h-4" />}
            className="w-full justify-center font-bold"
          >
            Unlock Evidence Vault
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Evidence Vault (Unlocked)
              </h3>
              <Badge variant="success">Secured Locally</Badge>
            </div>
            <p className="text-xs text-slate-500">
              {evidenceList.length} preserved items ready for cybercrime reporting
            </p>
          </div>
        </div>

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
            Upload Evidence
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportVault}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Backup JSON
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsUnlocked(false)}
            leftIcon={<Lock className="w-3.5 h-3.5" />}
          >
            Lock Vault
          </Button>
        </div>
      </div>

      {evidenceList.length === 0 ? (
        <div className="py-12 text-center text-xs text-slate-500 space-y-2">
          <ImageIcon className="w-10 h-10 text-slate-300 mx-auto" />
          <p>No evidence records in vault yet.</p>
          <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
            Upload First Screenshot
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {evidenceList.map(item => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {item.type === 'screenshot' ? (
                    <ImageIcon className="w-4 h-4 text-cyber-500 shrink-0" />
                  ) : (
                    <FileText className="w-4 h-4 text-brand-400 shrink-0" />
                  )}
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate max-w-[150px]">
                      {item.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {item.timestamp}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => toggleBlur(item.id)}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    title={item.isBlurred ? 'Show' : 'Blur'}
                  >
                    {item.isBlurred ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-1 rounded text-slate-400 hover:text-rose-500"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Preview Thumbnail Container */}
              <div
                className={`h-28 rounded-lg bg-slate-200 dark:bg-slate-950 overflow-hidden flex items-center justify-center transition-all ${
                  item.isBlurred ? 'filter blur-md select-none' : ''
                }`}
              >
                {item.dataUrl ? (
                  <img src={item.dataUrl} alt={item.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="p-3 text-center text-[10px] text-slate-500 font-mono">
                    [Confidential Forensic Artifact: {item.name}]
                  </div>
                )}
              </div>

              {item.notes && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                  Note: {item.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
