import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language } from "../../utils/translations";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  translate: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect((): void => {
    const storedLanguage = localStorage.getItem("language") as Language | null;
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  useEffect((): void => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = (): void => {
    setLanguage((prev: Language): Language => {
      const newLang = prev === "ko" ? "en" : "ko";
      localStorage.setItem("language", newLang);
      return newLang;
    });
  };

  const translate = (key: string): string => {
    const keys = key.split(".");
    let current: any = translations[language];
    for (const k of keys) {
      if (current[k] === undefined) {
        return key;
      }
      current = current[k];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
