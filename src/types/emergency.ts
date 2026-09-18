export type CrimeCategory =
  | 'image_abuse' // Non-consensual image sharing / deepfake / morphing / sextortion
  | 'cyberstalking' // Stalking / continuous harassment / tracking
  | 'fake_profile' // Impersonation / fake accounts / identity theft
  | 'abusive_messages' // Threats / abusive DMs / cyberbullying
  | 'financial_fraud' // OTP scam / blackmail for money / extortion
  | 'general_threat'; // Unspecified cyber harassment

export type EmotionalState = 'scared' | 'sad' | 'angry' | 'ashamed' | 'action';

export interface EvidenceItem {
  id: string;
  type: 'screenshot' | 'chat_export' | 'audio' | 'link';
  name: string;
  dataUrl?: string;
  notes?: string;
  timestamp: string;
  isBlurred: boolean;
}

export interface EmergencyCaseData {
  id: string;
  createdAt: string;
  crimeCategory?: CrimeCategory;
  userDescription: string;
  aiExplanation?: string;
  legalSections?: string[];
  emotionalState?: EmotionalState;
  attackerDetails: {
    handleOrName?: string;
    phone?: string;
    email?: string;
    platform?: string;
    profileLink?: string;
  };
  incidentDateTime?: string;
  incidentNotes?: string;
  evidenceList: EvidenceItem[];
  vaultPin?: string;
  isVaultLocked: boolean;
  complaintSummary?: string;
  officialReferenceNumber?: string;
  checklist: {
    evidenceCollected: boolean;
    complaintDrafted: boolean;
    reportedToPortal: boolean;
    referenceNumberSaved: boolean;
    counselorContacted: boolean;
  };
}

export interface HelplineInfo {
  id: string;
  name: string;
  organization: string;
  number: string;
  timing: string;
  isFree: boolean;
  isMultilingual: boolean;
  category: 'mental_health' | 'women_safety' | 'cybercrime' | 'emergency';
  description: string;
  website?: string;
}

export interface SurvivorStory {
  id: string;
  author: string;
  story: string;
  tag: string;
  timestamp: string;
  likesCount?: number;
}

