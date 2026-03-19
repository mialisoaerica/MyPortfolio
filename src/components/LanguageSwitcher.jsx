import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  const isEN = language === "en";

  return (
    <button
      onClick={toggleLanguage}
      title={isEN ? "Passer en français" : "Switch to English"}
      className="language-switcher"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 14px",
        background: "transparent",
        border: "1px solid rgba(139, 92, 246, 0.4)",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "0.85rem",
        fontWeight: "500",
        letterSpacing: "0.05em",
        color: isEN ? "#a78bfa" : "#22d3ee",
        transition: "all 0.25s ease",
        overflow: "hidden",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = isEN
          ? "rgba(139, 92, 246, 0.12)"
          : "rgba(34, 211, 238, 0.12)";
        e.currentTarget.style.borderColor = isEN
          ? "rgba(139, 92, 246, 0.8)"
          : "rgba(34, 211, 238, 0.8)";
        e.currentTarget.style.boxShadow = isEN
          ? "0 0 12px rgba(139, 92, 246, 0.25)"
          : "0 0 12px rgba(34, 211, 238, 0.25)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.4)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Animated dot indicator */}
      <span style={{
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: isEN ? "#a78bfa" : "#22d3ee",
        boxShadow: isEN
          ? "0 0 6px rgba(167, 139, 250, 0.8)"
          : "0 0 6px rgba(34, 211, 238, 0.8)",
        flexShrink: 0,
      }} />

      {/* Current → target label */}
      <span style={{ fontFamily: "monospace" }}>
        {isEN ? "EN" : "FR"}
      </span>

      <span style={{
        opacity: 0.4,
        fontSize: "0.7rem",
      }}>
        /
      </span>

      <span style={{
        opacity: 0.5,
        fontSize: "0.8rem",
      }}>
        {isEN ? "FR" : "EN"}
      </span>
    </button>
  );
}
