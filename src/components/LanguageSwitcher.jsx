import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="language-switcher"
      title={language === "en" ? "Passer en français" : "Switch to English"}
      style={{
        background: "rgba(246, 244, 248, 0.88)",
        border: "1px solid rgba(245, 4, 4, 0.5)",
        borderRadius: "6px",
        padding: "5px 12px",
        cursor: "pointer",
        fontSize: "1.2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {language === "en" ? "🇫🇷" : "🇺🇸"}
    </button>
  );
}
