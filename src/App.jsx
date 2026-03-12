import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutTerminal from "./components/AboutTerminal";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import ParticleBackground from "./components/ParticleBackground";
import { LanguageProvider } from "./context/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <div style={{ position: "relative" }}>
        <ParticleBackground color="#5eead4" />
        <div style={{ position: "relative", zIndex: 1 }}>
          {<>
            <Navbar />
            <Hero />
            <AboutTerminal />
            <Skills />
            <Projects />
            <Contact />
          </>}
        </div>
      </div>
    </LanguageProvider>
  );
}


