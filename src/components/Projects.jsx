import { useLanguage } from "../context/LanguageContext";

const projects = [
  {
    title: "Flowdesk",
    desc: "Task management app with analytics dashboard. Create, track and filter tasks by status and priority.",
    descFr: "Application de gestion de tâches avec tableau de bord analytique. Créez, suivez et filtrez les tâches par statut et priorité.",
    stack: ["React", "Node.js", "Express", "SQL"],
    status: "wip",
    github: "#",
    demo: "#",
  },
  {
    title: "Gatekeeper",
    desc: "Secure REST authentication API with register, login and JWT-protected routes.",
    descFr: "API d'authentification REST sécurisée avec inscription, connexion et routes protégées par JWT.",
    stack: ["Node.js", "Express", "JWT", "bcrypt"],
    status: "wip",
    github: "#",
    demo: null,
  },
  {
    title: "Lumidash",
    desc: "Interactive data visualization dashboard with real-time charts and dynamic filters.",
    descFr: "Tableau de bord interactif de visualisation de données avec graphiques en temps réel et filtres dynamiques.",
    stack: ["React", "Chart.js", "Python", "SQL"],
    status: "wip",
    github: "#",
    demo: "#",
  },
  {
    title: "Mialisoa.dev",
    desc: "This portfolio — built from scratch with an interactive particle background and terminal-style design.",
    descFr: "Ce portfolio — construit de zéro avec un fond de particules interactif et un design style terminal.",
    stack: ["React", "CSS", "Vite"],
    status: "done",
    github: "#",
    demo: "#",
  },
  {
    title: "Fluxapi",
    desc: "Python backend API with CRUD endpoints, error handling, authentication and documentation.",
    descFr: "API backend Python avec endpoints CRUD, gestion des erreurs, authentification et documentation.",
    stack: ["Python", "Flask", "SQL", "REST"],
    status: "wip",
    github: "#",
    demo: null,
  },
  {
    title: "Patterna",
    desc: "Data analysis and visualization using machine learning models to detect patterns and trends.",
    descFr: "Analyse et visualisation de données utilisant des modèles d'apprentissage automatique pour détecter les modèles et les tendances.",
    stack: ["Python", "Pandas", "Scikit-learn"],
    status: "wip",
    github: "#",
    demo: null,
  },
];

const STATUS = {
  done: { label: "Live ✦", labelFr: "En ligne ✦", color: "#00ffcc", bg: "rgba(0,255,204,0.08)" },
  wip:  { label: "In progress 🚧", labelFr: "En cours 🚧", color: "#ffbd2e", bg: "rgba(255,189,46,0.08)" },
};

export default function Projects() {
  const { t, language } = useLanguage();

  return (
    <section id="projects" className="section">
      <div className="section-eyebrow">{t.projects.eyebrow}</div>
      <h2>{t.projects.title}</h2>
      <div className="projects-grid">
        {projects.map((p) => {
          const s = STATUS[p.status];
          return (
              <div className="p-card" key={p.title}>\n              <div className="p-card-header">
                <h3 className="p-card-title">{p.title}</h3>
                <span className="p-status" style={{ color: s.color, background: s.bg }}>
                  {language === "en" ? s.label : s.labelFr}
                </span>
              </div>

              <p className="p-card-desc">
                {language === "en" ? p.desc : p.descFr}
              </p>

              <div className="p-stack">
                {p.stack.map((t) => (
                  <span key={t} className="p-tag">{t}</span>
                ))}
              </div>

              <div className="p-links">
                <a href={p.github} className="p-link" target="_blank" rel="noreferrer">
                  {t.projects.github}
                </a>
                {p.demo && (
                  <a href={p.demo} className="p-link p-link-demo" target="_blank" rel="noreferrer">
                    {t.projects.demo}
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
