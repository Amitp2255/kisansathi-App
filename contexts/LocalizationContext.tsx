import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import translations, { Language, supportedLanguages } from '../translations';
import { useAuth } from './AuthContext';

// Helper to get nested translation values
const getNestedTranslation = (obj: any, path: string): string => {
  return path.split('.').reduce((o, key) => (o && o[key] !== 'undefined' ? o[key] : path), obj);
};

interface LocalizationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  supportedLanguages: typeof supportedLanguages;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, updateUserProfile } = useAuth();
  
  const [language, setLanguageState] = useState<Language>(() => {
    // Get language from farmer profile if available, otherwise from storage, finally default to 'en'
    if (user?.role === 'farmer' && user.profile.preferredLanguage) {
      return user.profile.preferredLanguage;
    }
    const storedLang = localStorage.getItem('app-language');
    return (storedLang as Language) || 'en';
  });

  // Effect to sync language from user profile when user logs in or changes
  useEffect(() => {
    if (user?.role === 'farmer' && user.profile.preferredLanguage) {
      if (language !== user.profile.preferredLanguage) {
        setLanguageState(user.profile.preferredLanguage);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang); // Keep for non-logged in state and faster initial load
    if (user?.role === 'farmer' && user.profile.preferredLanguage !== lang) {
      updateUserProfile({ preferredLanguage: lang });
    }
  }, [user, updateUserProfile]);
  
  const t = useCallback((key: string): string => {
    const langTranslations = translations[language] || translations.en;
    const translation = getNestedTranslation(langTranslations, key);
    // Fallback to English if translation is missing
    if (translation === key && language !== 'en') {
      const fallbackTranslations = translations.en;
      return getNestedTranslation(fallbackTranslations, key);
    }
    return translation;
  }, [language]);

  return (
    <LocalizationContext.Provider value={{ language, setLanguage, t, supportedLanguages }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};