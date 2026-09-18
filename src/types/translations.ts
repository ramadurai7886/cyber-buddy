export type LanguageCode =
  | 'en' // English
  | 'ta' // Tamil - தமிழ்
  | 'hi' // Hindi - हिंदी
  | 'te' // Telugu - తెలుగు
  | 'kn' // Kannada - ಕನ್ನಡ
  | 'ml' // Malayalam - മലയാളം
  | 'bn' // Bengali - বাংলা
  | 'mr' // Marathi - मराठी
  | 'gu' // Gujarati - ગુજરાતી
  | 'pa' // Punjabi - ਪੰਜਾਬੀ
  | 'or'; // Odia - ଓଡ଼ିଆ

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export interface TranslationSchema {
  common: {
    appName: string;
    tagline: string;
    subTitle: string;
    quickExit: string;
    quickExitHint: string;
    loading: string;
    cancel: string;
    save: string;
    back: string;
    next: string;
    close: string;
    callNow: string;
    demoTag: string;
  };
  nav: {
    emergencyHelp: string;
    wellnessCorner: string;
    helplines: string;
    myDashboard: string;
    signIn: string;
    logOut: string;
    startNewCase: string;
  };
  panicBanner: {
    inDanger: string;
    cyberCrime: string;
    womenHelpline: string;
    counseling: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    description: string;
    opt1Title: string;
    opt1Badge: string;
    opt1Desc: string;
    opt1Feature1: string;
    opt1Feature2: string;
    opt1Feature3: string;
    opt1Btn: string;
    opt2Title: string;
    opt2Badge: string;
    opt2Desc: string;
    opt2Feature1: string;
    opt2Feature2: string;
    opt2Feature3: string;
    opt2Btn: string;
  };
  wizard: {
    step: string;
    privacyTitle: string;
    privacyDesc: string;
    privacyAgree: string;
    whatHappenedTitle: string;
    whatHappenedSubtitle: string;
    inputPlaceholder: string;
    voiceRecording: string;
    voiceRecordingActive: string;
    chipThreat: string;
    chipFakeProfile: string;
    chipMorphed: string;
    chipAbuse: string;
    chipStalking: string;
    chipDontKnow: string;
    reassuranceTitle: string;
    reassuranceText: string;
    emotionalCheckinTitle: string;
    scared: string;
    sad: string;
    angry: string;
    ashamed: string;
    ready: string;
    safetyRulesTitle: string;
    safetyRule1: string;
    safetyRule2: string;
    safetyRule3: string;
    complaintDraftTitle: string;
    copyDraft: string;
    copied: string;
    saveTxt: string;
    printPdf: string;
    finishWithoutSaving: string;
    createProfile: string;
    wipeTraces: string;
  };
  wellness: {
    title: string;
    badge: string;
    subtitle: string;
    breathingTab: string;
    groundingTab: string;
    affirmationTitle: string;
    journalTitle: string;
    saveThought: string;
    storiesTitle: string;
    shareStoryBtn: string;
  };
  helplines: {
    title: string;
    subtitle: string;
    call181: string;
    call1930: string;
    callKiran: string;
    portalsTitle: string;
    legalRightsTitle: string;
    platformTakedownsTitle: string;
  };
  chatbot: {
    title: string;
    subtitle: string;
    welcomeMsg: string;
    inputPlaceholder: string;
    send: string;
    typing: string;
    clearChat: string;
    suggestionsTitle: string;
    suggestions: {
      howToUse: string;
      explainPage: string;
      whatCanIDo: string;
      changeLanguage: string;
      changeTheme: string;
      howToLogin: string;
      createAccount: string;
      needHelp: string;
      scanCode: string;
    };
  };
}
