import React, { createContext, useContext, useEffect, useState } from 'react';
import { LanguageCode, LanguageOption, TranslationSchema } from '../types/translations';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, translations } from '../translations';
import { StorageService } from '../services/storageService';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationSchema;
  supportedLanguages: LanguageOption[];
  currentLanguageOption: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    return StorageService.getItem<LanguageCode>(StorageService.KEYS.LANGUAGE, DEFAULT_LANGUAGE);
  });

  useEffect(() => {
    StorageService.setItem(StorageService.KEYS.LANGUAGE, language);
    // Also set document html lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (newLang: LanguageCode) => {
    if (translations[newLang]) {
      setLanguageState(newLang);
    }
  };

  const t = translations[language] || translations[DEFAULT_LANGUAGE];
  const currentLanguageOption =
    SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        supportedLanguages: SUPPORTED_LANGUAGES,
        currentLanguageOption,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
