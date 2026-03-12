import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero">
      <div className="hero-eyebrow">{t.hero.eyebrow}</div>

      <h2 className="hero-name">{t.hero.name}</h2>

      <h1>{t.hero.title}</h1>

      <div className="hero-cta">
        <a href="#projects" className="btn-primary">
          {t.hero.ctaWork}
        </a>
        <a href="#contact" className="btn-secondary">
          {t.hero.ctaContact}
        </a>
      </div>

      <div className="hero-stack">
        {t.hero.stack.map((tech) => (
          <span key={tech} className="hero-badge">{tech}</span>
        ))}
      </div>
    </section>
  );
}
