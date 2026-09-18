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
    loading: string;
    error: string;
    success: string;
    cancel: string;
    save: string;
    back: string;
    next: string;
    close: string;
    demoTag: string;
    themeLight: string;
    themeDark: string;
  };
  nav: {
    features: string;
    howItWorks: string;
    assistant: string;
    docs: string;
    dashboard: string;
    login: string;
    signup: string;
    getStarted: string;
    logout: string;
  };
  hero: {
    badge: string;
    title: string;
    highlight: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    terminalTitle: string;
    terminalStatus: string;
    trustedBy: string;
  };
  features: {
    title: string;
    subtitle: string;
    vulnerabilityScan: {
      title: string;
      desc: string;
    };
    aiRemediation: {
      title: string;
      desc: string;
    };
    devsecopsPipeline: {
      title: string;
      desc: string;
    };
    apiGuardian: {
      title: string;
      desc: string;
    };
    threatModeler: {
      title: string;
      desc: string;
    };
    complianceReady: {
      title: string;
      desc: string;
    };
  };
  howItWorks: {
    title: string;
    subtitle: string;
    step1: { title: string; desc: string };
    step2: { title: string; desc: string };
    step3: { title: string; desc: string };
    step4: { title: string; desc: string };
  };
  aiSection: {
    badge: string;
    title: string;
    description: string;
    feature1: string;
    feature2: string;
    feature3: string;
    promptPlaceholder: string;
  };
  multilingualSection: {
    badge: string;
    title: string;
    description: string;
    selectLanguageHint: string;
  };
  benefits: {
    title: string;
    subtitle: string;
    metric1: { value: string; label: string };
    metric2: { value: string; label: string };
    metric3: { value: string; label: string };
    metric4: { value: string; label: string };
  };
  cta: {
    title: string;
    description: string;
    button: string;
    demoNote: string;
  };
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    showPassword: string;
    hidePassword: string;
    rememberMe: string;
    forgotPassword: string;
    loginButton: string;
    loggingIn: string;
    demoLoginButton: string;
    noAccount: string;
    signUpLink: string;
    haveAccount: string;
    signInLink: string;
    signupTitle: string;
    signupSubtitle: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    confirmPasswordLabel: string;
    preferredLanguageLabel: string;
    termsAgree: string;
    signupButton: string;
    signingUp: string;
    passwordStrength: {
      weak: string;
      medium: string;
      strong: string;
    };
    forgotTitle: string;
    forgotSubtitle: string;
    resetButton: string;
    sendingReset: string;
    resetSuccess: string;
    errors: {
      emailRequired: string;
      emailInvalid: string;
      passwordRequired: string;
      invalidLogin: string;
      nameRequired: string;
      passwordLength: string;
      passwordMismatch: string;
      termsRequired: string;
    };
  };
  dashboard: {
    welcome: string;
    subtitle: string;
    stats: {
      activeScans: string;
      threatShields: string;
      vulnsPatched: string;
      securityScore: string;
    };
    quickActions: {
      title: string;
      newScan: string;
      auditRepo: string;
      sandbox: string;
      compliance: string;
    };
    recentActivity: {
      title: string;
      subtitle: string;
      colTarget: string;
      colType: string;
      colSeverity: string;
      colStatus: string;
      colTime: string;
      emptyState: string;
    };
    scanModal: {
      title: string;
      subtitle: string;
      scanning: string;
      complete: string;
      foundIssues: string;
      remediate: string;
      close: string;
    };
    stateToggle: {
      normal: string;
      loading: string;
      empty: string;
    };
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
    responses: {
      howToUse: string;
      explainPage: string;
      whatCanIDo: string;
      changeLanguage: string;
      changeTheme: string;
      howToLogin: string;
      createAccount: string;
      needHelp: string;
      scanCode: string;
      fallback: string;
    };
  };
  footer: {
    description: string;
    product: string;
    resources: string;
    company: string;
    legal: string;
    rights: string;
  };
}
