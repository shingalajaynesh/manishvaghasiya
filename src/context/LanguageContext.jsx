import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Load preferred language or default to Gujarati ('gu')
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('manish_vaghasiya_lang');
    return saved && translations[saved] ? saved : 'gu';
  });

  const setLanguage = (lang) => {
    if (translations[lang]) {
      setLanguageState(lang);
      localStorage.setItem('manish_vaghasiya_lang', lang);
    }
  };

  // Translation helper function
  const t = (keyPath) => {
    const keys = keyPath.split('.');
    
    // Look up translation in active language
    let value = translations[language];
    for (const key of keys) {
      if (value && value[key] !== undefined) {
        value = value[key];
      } else {
        // Fallback to Gujarati (default) if key is missing in active language
        let fallbackValue = translations['gu'];
        for (const fKey of keys) {
          if (fallbackValue && fallbackValue[fKey] !== undefined) {
            fallbackValue = fallbackValue[fKey];
          } else {
            return keyPath; // Ultimate fallback: return the raw key path
          }
        }
        return fallbackValue;
      }
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
