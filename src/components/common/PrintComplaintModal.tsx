import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Printer, Download, Shield, Copy, Check } from 'lucide-react';
import { EmergencyCaseData } from '../../types/emergency';

export interface PrintComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseData: EmergencyCaseData;
}

export const PrintComplaintModal: React.FC<PrintComplaintModalProps> = ({
  isOpen,
  onClose,
  caseData,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    if (caseData.complaintSummary) {
      navigator.clipboard.writeText(caseData.complaintSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Formal Cyber Crime Complaint Document" maxWidth="xl">
      <div className="space-y-4 text-left">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500">
            Official format for National Cyber Crime Portal & Cyber Cell Police Station
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyText}
              leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            >
              {copied ? 'Copied' : 'Copy Text'}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handlePrint}
              leftIcon={<Printer className="w-3.5 h-3.5" />}
              className="font-bold"
            >
              Print / Save as PDF
            </Button>
          </div>
        </div>

        {/* Printable Letterhead Paper */}
        <div className="bg-white text-slate-900 p-8 rounded-xl border border-slate-300 shadow-inner font-serif text-xs leading-relaxed print:p-0 print:border-none print:shadow-none space-y-5">
          {/* Header */}
          <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
            <h2 className="text-sm font-bold tracking-wider uppercase">
              FORMAL CYBER CRIME INCIDENT REPORT
            </h2>
            <p className="text-[11px] font-sans text-slate-600">
              Generated via Cyber Buddy Safe Intake Framework for Submission to:
            </p>
            <p className="text-xs font-bold font-sans uppercase">
              National Cyber Crime Reporting Portal (cybercrime.gov.in) & Women Safety Division
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 py-2 border-b border-slate-200 font-sans text-[11px]">
            <div>
              <span className="text-slate-500">Category:</span>{' '}
              <strong className="uppercase">{caseData.crimeCategory ? caseData.crimeCategory.replace('_', ' ') : 'CRIME AGAINST WOMEN'}</strong>
            </div>
            <div>
              <span className="text-slate-500">Date & Time:</span>{' '}
              <strong>{caseData.incidentDateTime || new Date().toLocaleString('en-IN')}</strong>
            </div>
            <div>
              <span className="text-slate-500">Portal Ref Number:</span>{' '}
              <strong className="font-mono">{caseData.officialReferenceNumber || 'Pending Submission'}</strong>
            </div>
            <div>
              <span className="text-slate-500">Jurisdiction:</span>{' '}
              <strong>Pan-India Cyber Cell (MHA)</strong>
            </div>
          </div>

          {/* Section 1 */}
          <div className="space-y-1.5">
            <h3 className="font-sans font-bold text-xs uppercase border-b border-slate-200 pb-1">
              1. Perpetrator / Suspect Identification
            </h3>
            <p className="font-sans text-[11px]">
              <strong>Username / Profile Handle:</strong> {caseData.attackerDetails.handleOrName || 'Anonymous / Unknown'}<br />
              <strong>Phone / Mobile Number:</strong> {caseData.attackerDetails.phone || 'Not provided'}<br />
              <strong>Platform / Medium:</strong> {caseData.attackerDetails.platform || 'Online Electronic Communication'}
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-1.5">
            <h3 className="font-sans font-bold text-xs uppercase border-b border-slate-200 pb-1">
              2. Statement of Facts & Incident Narration
            </h3>
            <p className="whitespace-pre-wrap font-sans text-[11px] bg-slate-50 p-3 rounded border border-slate-200 leading-relaxed">
              "{caseData.userDescription}"
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-1.5">
            <h3 className="font-sans font-bold text-xs uppercase border-b border-slate-200 pb-1">
              3. Applicable Statutory Provisions (IT Act & IPC/BNS)
            </h3>
            <ul className="list-disc list-inside font-sans text-[11px] space-y-0.5">
              {caseData.legalSections && caseData.legalSections.length > 0 ? (
                caseData.legalSections.map((sec, idx) => <li key={idx}>{sec}</li>)
              ) : (
                <>
                  <li>Section 66E, Information Technology Act, 2000 (Violation of Privacy)</li>
                  <li>Section 67 & 67A, Information Technology Act, 2000 (Transmitting sexually explicit material)</li>
                  <li>Section 354D, Indian Penal Code / BNS (Cyberstalking)</li>
                  <li>Section 506 & 509, Indian Penal Code / BNS (Criminal Intimidation & Insulting Modesty)</li>
                </>
              )}
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-1.5">
            <h3 className="font-sans font-bold text-xs uppercase border-b border-slate-200 pb-1">
              4. Evidence Inventory Locked in Secure Device Vault
            </h3>
            <p className="font-sans text-[11px]">
              Total Preserved Digital Artifacts: <strong>{caseData.evidenceList.length} files</strong>
            </p>
            <ol className="list-decimal list-inside font-sans text-[11px] space-y-0.5">
              {caseData.evidenceList.map((e, i) => (
                <li key={i}>{e.name} — ({e.timestamp})</li>
              ))}
            </ol>
          </div>

          {/* Section 5 */}
          <div className="space-y-1.5">
            <h3 className="font-sans font-bold text-xs uppercase border-b border-slate-200 pb-1">
              5. Relief Prayed For
            </h3>
            <p className="font-sans text-[11px] leading-relaxed">
              It is humbly prayed that the competent Cyber Crime Police Authority take immediate cognizance, issue directions to intermediary platforms under Section 79(3)(b) of the IT Act for takedown of unlawful content, trace IP subscriber details of the suspect, and register a formal First Information Report (FIR) to secure the safety and dignity of the victim.
            </p>
          </div>

          {/* Signatures */}
          <div className="pt-6 flex justify-between items-end font-sans text-[11px]">
            <div>
              <p>Place: India</p>
              <p>Date: {new Date().toLocaleDateString('en-IN')}</p>
            </div>
            <div className="text-center">
              <div className="w-40 border-b border-slate-400 mb-1" />
              <p className="font-semibold">Signature / Complainant</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
