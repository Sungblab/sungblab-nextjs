/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language } from "../../utils/translations";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  translate: (_translationKey: string) => string;
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
    let current: Record<string, unknown> | string = translations[language];
    for (const k of keys) {
      if (typeof current !== "object" || current === null || (current as Record<string, unknown>)[k] === undefined) {
        return key;
      }
      current = (current as Record<string, unknown>)[k] as Record<string, unknown> | string;
    }
    return current as string;
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
