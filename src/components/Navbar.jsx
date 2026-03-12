import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t, language } = useLanguage();

  return (
    <header className="nav">
      <div className="logo">Mialisoa</div>

      <ul>
        <li><a href="#about">{t.nav.about}</a></li>
        <li><a href="#projects">{t.nav.projects}</a></li>
        <li><a href="#skills">{t.nav.skills}</a></li>
        <li><a href="#contact">{t.nav.contact}</a></li>
        <li>
          <a 
            href={language === "en" ? "/src/assets/CV-ENG.pdf" : "/src/assets/CV-FRANCAIS.pdf"} 
            download 
            className="nav-resume"
          >
            {t.nav.resume}
          </a>
        </li>
        <li>
          <LanguageSwitcher />
        </li>
      </ul>
    </header>
  );
}
