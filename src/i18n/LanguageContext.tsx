import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.fr;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Detect browser language and map to supported languages
const detectBrowserLanguage = (): Language => {
  const browserLang = navigator.language.toLowerCase();
  
  // Map browser language codes to our supported languages
  if (browserLang.startsWith('fr')) return 'fr';
  if (browserLang.startsWith('en')) return 'en';
  if (browserLang.startsWith('de')) return 'de';
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('it')) return 'it';
  if (browserLang.startsWith('pt')) return 'pt';
  
  // Default to French if language not supported
  return 'fr';
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize with browser language or stored preference
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('numcafe_language');
    if (stored && stored in translations) {
      return stored as Language;
    }
    return detectBrowserLanguage();
  });

  // Save language preference to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('numcafe_language', lang);
    // Update HTML lang attribute
    document.documentElement.lang = lang;
  };

  // Set initial HTML lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
