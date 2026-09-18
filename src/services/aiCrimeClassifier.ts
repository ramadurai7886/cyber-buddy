import { CrimeCategory } from '../types/emergency';

export interface CrimeClassificationResult {
  category: CrimeCategory;
  title: string;
  reassurance: string;
  explanation: string;
  legalSections: string[];
  priorityActions: string[];
}

export const AICrimeClassifier = {
  /**
   * Understand natural language user descriptions or quick chips
   */
  classifySituation(input: string): CrimeClassificationResult {
    const text = input.toLowerCase();

    // 1. Image Abuse / Revenge Porn / Morphing / Private Photos
    if (
      text.includes('photo') ||
      text.includes('picture') ||
      text.includes('video') ||
      text.includes('morph') ||
      text.includes('nude') ||
      text.includes('private') ||
      text.includes('leaked') ||
      text.includes('intimate') ||
      text.includes('photos misused') ||
      text.includes('blackmail')
    ) {
      return {
        category: 'image_abuse',
        title: 'Non-Consensual Image Abuse & Blackmail',
        reassurance: 'Please take a deep breath. This is NOT your fault. You did nothing wrong, and the law in India strictly punishes those who record, misuse, or threaten to leak private pictures.',
        explanation: 'The perpetrator is committing criminal extortion and violation of bodily privacy. Law enforcement takes image-based abuse extremely seriously, and there are direct mechanisms to block and remove these images from search engines and social platforms.',
        legalSections: [
          'Section 66E IT Act (Violation of bodily privacy / capturing/publishing intimate pictures)',
          'Section 67A IT Act (Transmitting sexually explicit material — up to 5 yrs imprisonment)',
          'Section 354C IPC / BNS (Voyeurism)',
          'Section 384/506 IPC (Extortion and Criminal Intimidation)',
        ],
        priorityActions: [
          'DO NOT pay any money or send more pictures — paying never stops blackmailers.',
          'Take screenshots of all chat conversations, usernames, and phone numbers before blocking.',
          'Preserve the original media files with timestamps.',
          'We will report this immediately to the Cyber Crime Helpline 1930 and cybercrime.gov.in.',
        ],
      };
    }

    // 2. Cyberstalking / Tracking / Persistent Harassment
    if (
      text.includes('stalk') ||
      text.includes('follow') ||
      text.includes('tracking') ||
      text.includes('everywhere') ||
      text.includes('watching') ||
      text.includes('location') ||
      text.includes('stalking')
    ) {
      return {
        category: 'cyberstalking',
        title: 'Cyberstalking & Persistent Online Harassment',
        reassurance: 'You have a fundamental right to personal safety and digital freedom. You are NOT responsible for this unwanted obsession.',
        explanation: 'Monitoring your online activity, sending persistent unwanted messages after being told to stop, or tracking your location constitutes cyberstalking under Indian law.',
        legalSections: [
          'Section 354D IPC / BNS (Stalking — monitoring woman’s use of internet or email)',
          'Section 67 IT Act (Transmitting obscene or harassing electronic content)',
          'Section 509 IPC (Words, gestures, or acts intended to insult the modesty of a woman)',
        ],
        priorityActions: [
          'Do not engage in back-and-forth arguments with the stalker.',
          'Check your phone app permissions and revoke location access for unknown apps.',
          'Document every instance with date, time, platform, and content.',
          'Enable two-factor authentication on all social media and email accounts.',
        ],
      };
    }

    // 3. Fake Profile / Impersonation / Identity Theft
    if (
      text.includes('fake') ||
      text.includes('impersonat') ||
      text.includes('account created') ||
      text.includes('pretending') ||
      text.includes('using my name') ||
      text.includes('profile') ||
      text.includes('dp')
    ) {
      return {
        category: 'fake_profile',
        title: 'Online Impersonation & Fake Profile Creation',
        reassurance: 'Anyone can be targeted by a fake profile, but your reputation is protected by law. This is NOT your fault.',
        explanation: 'Creating a fake profile using another person’s name, photos, or contact information to cause distress, defame, or solicit others is a recognized cybercrime punishable by law.',
        legalSections: [
          'Section 66C IT Act (Identity Theft — fraudulent use of electronic signature, password, or unique identification)',
          'Section 66D IT Act (Cheating by personation using computer resource)',
          'Section 499 / 500 IPC (Defamation)',
        ],
        priorityActions: [
          'Obtain the exact URL link (web address) of the fake profile, not just a screenshot.',
          'Report the profile directly within the social media platform as impersonation.',
          'Do not publicly post accusations until formal evidence has been archived.',
          'Alert trusted friends so they do not engage with messages sent by the fake profile.',
        ],
      };
    }

    // 4. Abusive Messages / Bullying / Hate Speech
    if (
      text.includes('abuse') ||
      text.includes('slur') ||
      text.includes('vulgar') ||
      text.includes('insult') ||
      text.includes('dirty') ||
      text.includes('bad words') ||
      text.includes('abusive messages') ||
      text.includes('troll')
    ) {
      return {
        category: 'abusive_messages',
        title: 'Cyber Bullying & Abusive Electronic Messages',
        reassurance: 'No one has the right to abuse or insult you online. Their vile behavior reflects their criminality, NOT your worth. You are safe here.',
        explanation: 'Sending offensive, insulting, or sexually colored remarks electronically is punishable under both the Information Technology Act and criminal laws in India.',
        legalSections: [
          'Section 509 IPC / BNS (Uttering words or sending messages to insult a woman’s modesty)',
          'Section 507 IPC (Criminal intimidation by anonymous communication)',
          'Section 67 IT Act (Publishing or transmitting lascivious material)',
        ],
        priorityActions: [
          'Keep calm and refrain from responding with insults, which bullies use to provoke you.',
          'Take clear full-screen screenshots showing the sender’s handle, phone number, and timestamp.',
          'Use platform privacy settings to restrict messages from non-followers.',
        ],
      };
    }

    // 5. Threatening / Physical Harm / Blackmail
    if (
      text.includes('threat') ||
      text.includes('kill') ||
      text.includes('harm') ||
      text.includes('extort') ||
      text.includes('money') ||
      text.includes('warned') ||
      text.includes('threatened')
    ) {
      return {
        category: 'general_threat',
        title: 'Criminal Intimidation & Extortion',
        reassurance: 'Take a calm breath. Threats are intended to cause panic and force obedience. You have the full backing of law enforcement and women’s safety helplines.',
        explanation: 'Threatening a woman with injury to her person, reputation, or family over electronic media is serious criminal intimidation.',
        legalSections: [
          'Section 506 IPC (Criminal Intimidation)',
          'Section 383/384 IPC (Extortion through coercion)',
          'Section 66 IT Act (Computer-related offenses)',
        ],
        priorityActions: [
          'If you feel in immediate physical danger, dial 112 or Women Helpline 181 immediately.',
          'Do NOT comply with ransom demands or meetings requested by the offender.',
          'Preserve all message records and backup your phone data.',
        ],
      };
    }

    // Default / General Cyber Intimidation
    return {
      category: 'general_threat',
      title: 'Digital Harassment & Cybercrime',
      reassurance: 'You are not alone, and this is NOT your fault. Cybercrime targets innocent people every single day in India. We will walk you through every step safely.',
      explanation: 'Whatever you are experiencing, Indian cyber laws and dedicated women safety wings provide free, confidential mechanisms to assist you and bring perpetrators to book.',
      legalSections: [
        'Information Technology Act 2000 (Sections 66, 66E, 67)',
        'Indian Penal Code / Bharatiya Nyaya Sanhita protections for women',
      ],
      priorityActions: [
        'Do not delete any messages, emails, or call records.',
        'Reach out to free counseling support if you feel overwhelmed.',
        'We will help you preserve evidence and file a complaint securely.',
      ],
    };
  }
};
