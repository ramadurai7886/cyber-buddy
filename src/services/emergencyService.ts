import { HelplineInfo, EmergencyCaseData } from '../types/emergency';
import { StorageService } from './storageService';

export const GOVERNMENT_HELPLINES: HelplineInfo[] = [
  {
    id: 'kiran',
    name: 'KIRAN Mental Health Helpline',
    organization: 'Ministry of Social Justice & Empowerment, Govt of India',
    number: '1800-599-0019',
    timing: '24x7 Available',
    isFree: true,
    isMultilingual: true,
    category: 'mental_health',
    description: 'Toll-free 24/7 national mental health helpline providing psychological support, panic relief, and distress counseling in 13 Indian languages.',
    website: 'https://socialjustice.gov.in',
  },
  {
    id: 'women_181',
    name: 'Women Helpline (National)',
    organization: 'Ministry of Women and Child Development',
    number: '181',
    timing: '24x7 Available',
    isFree: true,
    isMultilingual: true,
    category: 'women_safety',
    description: 'Emergency response, rescue, counseling, shelter, and legal guidance for women facing harassment, threats, or domestic abuse.',
    website: 'https://wcd.gov.in',
  },
  {
    id: 'cyber_1930',
    name: 'National Cyber Crime Helpline',
    organization: 'Ministry of Home Affairs (MHA), Govt of India',
    number: '1930',
    timing: '24x7 Available',
    isFree: true,
    isMultilingual: true,
    category: 'cybercrime',
    description: 'Official national helpline for reporting financial cyber fraud, online harassment against women, non-consensual image sharing, and cyberstalking.',
    website: 'https://cybercrime.gov.in',
  },
  {
    id: 'icall',
    name: 'iCall Psychosocial Helpline',
    organization: 'Tata Institute of Social Sciences (TISS)',
    number: '9152987821',
    timing: 'Mon–Sat, 8:00 AM – 10:00 PM',
    isFree: true,
    isMultilingual: true,
    category: 'mental_health',
    description: 'Free, confidential counseling by professional mental health therapists specializing in cyber trauma and emotional recovery.',
    website: 'https://icallhelpline.org',
  },
  {
    id: 'vandrevala',
    name: 'Vandrevala Foundation Helpline',
    organization: 'Mental Health Outreach India',
    number: '1860-2662-345',
    timing: '24x7 Available',
    isFree: true,
    isMultilingual: true,
    category: 'mental_health',
    description: 'Free, multilingual 24/7 crisis intervention and emotional well-being helpline supporting individuals undergoing intense stress.',
    website: 'https://vandrevalafoundation.com',
  },
  {
    id: 'nimhans',
    name: 'NIMHANS Toll-Free Helpline',
    organization: 'National Institute of Mental Health & Neurosciences',
    number: '080-46110007',
    timing: '24x7 Available',
    isFree: true,
    isMultilingual: true,
    category: 'mental_health',
    description: 'Premier national mental health institution offering round-the-clock professional counseling and trauma support.',
    website: 'https://nimhans.ac.in',
  },
  {
    id: 'sneha',
    name: 'SNEHA Suicide Prevention & Crisis Helpline',
    organization: 'SNEHA India',
    number: '044-24640050',
    timing: '24x7 Available',
    isFree: true,
    isMultilingual: true,
    category: 'mental_health',
    description: 'Confidential unconditional emotional support for anyone in severe distress, grief, or suicidal feelings.',
    website: 'https://snehaindia.org',
  },
  {
    id: 'emergency_112',
    name: 'National Emergency Response (Police / Medical)',
    organization: 'Government of India',
    number: '112',
    timing: '24x7 Available',
    isFree: true,
    isMultilingual: true,
    category: 'emergency',
    description: 'All-in-one emergency service for immediate police assistance, dispatch, and physical safety intervention.',
    website: 'https://112.gov.in',
  },
];

export const GOVERNMENT_PORTALS = [
  {
    name: 'National Cyber Crime Reporting Portal',
    url: 'https://cybercrime.gov.in',
    description: 'Official portal to register cyber crime complaints (Women/Children specialized division).',
    tag: 'Official Portal',
  },
  {
    name: 'One Stop Centre (Sakhi) Portal',
    url: 'https://wcd.gov.in',
    description: 'Integrated support: Medical aid, police assistance, legal aid, and counseling under one roof.',
    tag: 'Women Support',
  },
  {
    name: 'SHe-Box (Sexual Harassment e-Box)',
    url: 'https://shebox.wcd.gov.in',
    description: 'Centralized registry for complaints relating to workplace and online harassment.',
    tag: 'Workplace Safety',
  },
  {
    name: 'Manodarpan Student Psychosocial Portal',
    url: 'https://manodarpan.education.gov.in',
    description: 'Ministry of Education initiative for mental health and well-being of students and youth.',
    tag: 'Youth Counseling',
  },
];

export const EmergencyService = {
  getHelplines(): HelplineInfo[] {
    return GOVERNMENT_HELPLINES;
  },

  getPortals() {
    return GOVERNMENT_PORTALS;
  },

  /**
   * Generates a structured formal complaint ready to copy-paste into cybercrime.gov.in
   */
  generateComplaintDraft(caseData: EmergencyCaseData): string {
    const timestamp = caseData.incidentDateTime || new Date().toLocaleString('en-IN');
    const attacker = caseData.attackerDetails;

    return `COMPLAINT DRAFT FOR SUBMISSION ON NATIONAL CYBER CRIME REPORTING PORTAL (cybercrime.gov.in)
-----------------------------------------------------------------------------------------
CATEGORY OF COMPLAINT : Crime Against Women & Children (Online Harassment / Cyberstalking)
SUB-CATEGORY          : ${caseData.crimeCategory ? caseData.crimeCategory.replace('_', ' ').toUpperCase() : 'CYBER HARASSMENT & INTIMIDATION'}
DATE OF OCCURRENCE    : ${timestamp}
COMPLAINANT STATUS    : Female Victim residing in India

1. DETAILS OF PERPETRATOR / SUSPECT:
   - Suspect Handle / Name : ${attacker.handleOrName || 'Not disclosed / Anonymous'}
   - Phone / Mobile Number : ${attacker.phone || 'Unknown / Not provided'}
   - Email Address         : ${attacker.email || 'Unknown'}
   - Social Platform / URL : ${attacker.platform || 'Online Electronic Media'} ${attacker.profileLink ? `(${attacker.profileLink})` : ''}

2. INCIDENT SUMMARY:
   "${caseData.userDescription}"

3. RELEVANT STATUTORY PROVISIONS APPLICABLE:
   ${caseData.legalSections && caseData.legalSections.length > 0
     ? caseData.legalSections.map(s => `- ${s}`).join('\n   ')
     : '- Information Technology Act, 2000 (Section 66E, 67, 67A)\n   - Bharatiya Nyaya Sanhita / Indian Penal Code (Section 354D, 506, 509)'}

4. EVIDENCE COLLECTED & PRESERVED:
   - Total Evidence Records Locked in Secure Vault: ${caseData.evidenceList.length} items
   ${caseData.evidenceList.map((e, idx) => `  ${idx + 1}. [${e.type.toUpperCase()}] ${e.name} (${e.timestamp})`).join('\n   ')}
   - Additional Notes: ${caseData.incidentNotes || 'Evidence preserved with cryptographic integrity and device timestamp.'}

5. RELIEF PRAYED FOR:
   - Immediate blocking, removal, and de-indexing of unlawful private content/profile across relevant intermediary platforms.
   - Tracing IP logs, subscriber identity, and registration details of the perpetrator.
   - Necessary legal action and registration of FIR under relevant provisions of the IT Act and IPC/BNS to safeguard the dignity and safety of the complainant.

Verified & Prepared via Cyber Buddy Secure First-Aid Assistant
Timestamp: ${new Date().toISOString()}
-----------------------------------------------------------------------------------------`;
  },

  saveEmergencyCase(caseData: EmergencyCaseData): void {
    const cases = StorageService.getItem<EmergencyCaseData[]>('cyberbuddy_emergency_cases', []);
    const existingIdx = cases.findIndex(c => c.id === caseData.id);
    if (existingIdx >= 0) {
      cases[existingIdx] = caseData;
    } else {
      cases.unshift(caseData);
    }
    StorageService.setItem('cyberbuddy_emergency_cases', cases);
  },

  getSavedCases(): EmergencyCaseData[] {
    return StorageService.getItem<EmergencyCaseData[]>('cyberbuddy_emergency_cases', []);
  },

  deleteCase(id: string): void {
    const cases = this.getSavedCases().filter(c => c.id !== id);
    StorageService.setItem('cyberbuddy_emergency_cases', cases);
  },

  cleanAllDeviceTraces(): void {
    const keysToWipe = [
      'cyberbuddy_emergency_cases',
      'cyberbuddy_vault_evidence',
      'cyberbuddy_user_stories',
      'cyberbuddy_journal',
      'cyberbuddy_emergency_contacts',
      'cyberbuddy_auth_user',
      'cyberbuddy_discreet_mode',
      'cyberbuddy_active_case'
    ];
    keysToWipe.forEach(key => StorageService.removeItem(key));
  }
};

export interface PlatformTakedown {
  platform: string;
  name: string;
  action: string;
  url: string;
  description: string;
  badge: string;
}

export const PLATFORM_TAKEDOWNS: PlatformTakedown[] = [
  {
    platform: 'StopNCII',
    name: 'StopNCII.org (Hash-Sharing)',
    action: 'Stop Image Distribution',
    url: 'https://stopncii.org',
    description: 'Generates secure cryptographic hashes on your device to prevent intimate images from being posted on Facebook, Instagram, TikTok, and OnlyFans without uploading images.',
    badge: 'International Gold Standard'
  },
  {
    platform: 'Instagram',
    name: 'Instagram Impersonation & Harassment',
    action: 'Report Fake Profile / Bullying',
    url: 'https://help.instagram.com/contact/636276399721841',
    description: 'Official form to request deletion of accounts impersonating you or posting photos without consent. Actioned under 24-48 hours.',
    badge: 'Official Form'
  },
  {
    platform: 'WhatsApp',
    name: 'WhatsApp Safety & Grievance Officer',
    action: 'Report Harasser Number',
    url: 'https://www.whatsapp.com/contact',
    description: 'File complaints against numbers sending unsolicited abusive messages, threats, or extortion demands in India.',
    badge: 'India Grievance'
  },
  {
    platform: 'Facebook',
    name: 'Facebook Non-Consensual Imagery',
    action: 'Remove Intimate Imagery',
    url: 'https://www.facebook.com/help/contact/567360146613371',
    description: 'Direct removal request for images shared without consent. Protected under Indian IT Rules 2021 (24-hour mandatory takedown rule).',
    badge: 'Priority Takedown'
  },
  {
    platform: 'Google',
    name: 'Google Content Removal Request',
    action: 'De-index from Search Results',
    url: 'https://support.google.com/websearch/troubleshooter/3111061',
    description: 'Remove explicit non-consensual imagery, morphed pictures, or contact doxxing from Google search results globally.',
    badge: 'Search De-indexing'
  }
];

export interface CyberLawInfo {
  section: string;
  act: string;
  title: string;
  penalty: string;
  explanation: string;
  victimTip: string;
}

export const INDIAN_CYBER_LAWS: CyberLawInfo[] = [
  {
    section: 'Section 66E',
    act: 'Information Technology Act, 2000',
    title: 'Violation of Bodily Privacy',
    penalty: 'Imprisonment up to 3 years and/or fine up to ₹2,00,000',
    explanation: 'Capturing, transmitting, or publishing pictures of private areas of any person without their explicit consent.',
    victimTip: 'Applies directly when anyone shares intimate photos or videos without permission, even if you took them yourself.'
  },
  {
    section: 'Section 67 & 67A',
    act: 'Information Technology Act, 2000',
    title: 'Publishing Sexually Explicit or Obscene Material',
    penalty: 'Imprisonment up to 5 years (first conviction) and fine up to ₹10,00,000',
    explanation: 'Transmitting obscene or sexually explicit acts in electronic form. Stringent non-bailable provisions.',
    victimTip: 'Covers blackmail threats and non-consensual distribution across messaging apps and social media.'
  },
  {
    section: 'Section 354D IPC / Sec 78 BNS',
    act: 'Bharatiya Nyaya Sanhita (Indian Penal Code)',
    title: 'Cyberstalking & Persistent Digital Surveillance',
    penalty: 'Imprisonment up to 3 years (first conviction), up to 5 years for repeat offense',
    explanation: 'Monitoring a woman’s internet usage, social media, email, or digital communications despite a clear disinterest indicated by her.',
    victimTip: 'Continuous DMs from throwaway accounts or tracking your location qualifies under this section.'
  },
  {
    section: 'Section 506 IPC / Sec 351 BNS',
    act: 'Bharatiya Nyaya Sanhita (Indian Penal Code)',
    title: 'Criminal Intimidation & Blackmail',
    penalty: 'Imprisonment up to 2 years, or up to 7 years if threat is to cause death or grievous hurt',
    explanation: 'Threatening a woman with injury to her person, reputation, or property to compel her to do any act against her will.',
    victimTip: 'Extortion for money or demands for more pictures are strictly punishable under criminal intimidation.'
  },
  {
    section: 'Rule 3(2)(b)',
    act: 'Information Technology (Intermediary Guidelines) Rules, 2021',
    title: 'Mandatory 24-Hour Non-Consensual Imagery Takedown',
    penalty: 'Loss of safe harbor immunity for the intermediary platform',
    explanation: 'Social media platforms operating in India MUST remove or disable access to content exposing private areas or showing full/partial nudity within 24 hours of receiving a complaint.',
    victimTip: 'Quote Rule 3(2)(b) when emailing grievance officers of Instagram, Meta, or X to demand swift removal.'
  }
];
