import { createContext, useContext, useState, useEffect } from "react";
import { en } from "../i18n/en";
import { fr } from "../i18n/fr";

const translations = { en, fr };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Get saved language from localStorage or default to English
    return localStorage.getItem("portfolio-language") || "en";
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem("portfolio-language", language);
  }, [language]);

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "fr" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

