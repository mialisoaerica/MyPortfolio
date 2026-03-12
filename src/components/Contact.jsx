import { useLanguage } from "../context/LanguageContext";
import { Mail, Github, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section contact">
      <h2>{t.contact.title}</h2>

      <div className="contact-icons">

        <a href="mailto:mialisoaerica@gmail.com" target="_blank">
          <Mail size={30}/>
        </a>

        <a href="https://github.com/mialisoaerica" target="_blank">
          <Github size={30}/>
        </a>

        <a href="https://www.linkedin.com/in/mialisoa-rakotoniaina-16b863309" target="_blank">
          <Linkedin size={30}/>
        </a>

        <a href="https://wa.me/261381775441" target="_blank">
          <FaWhatsapp size={30}/>
        </a>

      </div>
    </section>
  );
}
