import { useLanguage } from "../context/LanguageContext";

export default function AboutTerminal() {
  const { t } = useLanguage();

  return (
    <section className="about" id="about">
      <div className="about-inner">

        {/* ── PHOTO ── */}
        <div className="about-photo-wrapper">
          <div className="about-photo-glow" />
          <img
  src="/src/assets/photo.jpg"
  alt="Mialisoa"
  className="about-photo"
/>
          <div className="about-photo-badge">
            <span className="badge-dot" />
            {t.about.available}
          </div>
        </div>

        {/* ── TERMINAL ── */}
        <div className="terminal">
          <div className="terminal-bar">
            <span className="terminal-title">{t.about.title}</span>
          </div>

          <div className="terminal-body">
            <div className="t-line">
              <span className="t-prompt">~</span>
              <span className="t-cmd"> whoami</span>
            </div>
            <div className="t-output">{t.about.whoami}</div>

            <div className="t-line t-mt">
              <span className="t-prompt">~</span>
              <span className="t-cmd"> cat about.txt</span>
            </div>
            <div className="t-output">
              {t.about.bio}
            </div>

            <div className="t-line t-mt">
              <span className="t-prompt">~</span>
              <span className="t-cmd"> ls skills/</span>
            </div>
            <div className="t-output t-skills">
              {t.about.skills.map((skill) => (
                <span key={skill} className="t-skill">{skill}</span>
              ))}
            </div>

            <div className="t-line t-mt">
              <span className="t-prompt">~</span>
              <span className="t-cursor">█</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

