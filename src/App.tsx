import React from "react";

type Project = {
  title: string;
  subtitle: string;
  whyItMatters: string;
  highlights: string[];
  stack: string[];
  liveUrl?: string;
  repoUrl: string;
  status: "Live" | "Repo";
};

const projects: Project[] = [
  {
    title: "Financial News NLP",
    subtitle: "Narrative + topic analysis across major outlets",
    whyItMatters:
      "Turns noisy headlines into interpretable themes so you can see what the market is focused on — without pretending headlines are a price oracle.",
    highlights: [
      "Compares narrative emphasis across CNBC / Reuters / The Guardian",
      "Interpretable baseline (TF‑IDF) + topic discovery",
      "Human-readable insights for reporting and analysis"
    ],
    stack: ["Python", "NLP", "Topic Modeling", "Dashboard"],
    liveUrl: "http://alb-financial-news-nlp-27107617.us-east-2.elb.amazonaws.com/",
    repoUrl: "https://github.com/btheard3/financial-news-nlp",
    status: "Live"
  },
  {
    title: "Sentinel Forecaster",
    subtitle: "Options sweep interpreter (decision support, not a bot)",
    whyItMatters:
      "Interprets unusual options activity by scoring context — direction, volatility regime, and expected move — using a transparent framework.",
    highlights: [
      "Directional bias + volatility context scoring",
      "Explainability-first (no magical signals)",
      "Live dashboard for fast sweep review"
    ],
    stack: ["Python", "Pandas", "Stats", "Azure", "Dashboard"],
    liveUrl:
      "https://sentinel-baseline-panel.victorioussand-a57f0952.centralus.azurecontainerapps.io/",
    repoUrl: "https://github.com/btheard3/sentinel-forecaster",
    status: "Live"
  },
  {
    title: "Volatility Alpha Engine (VAE)",
    subtitle: "Volatility regimes, research pipeline, and live screening",
    whyItMatters:
      "Volatility drives risk. VAE studies regimes, engineers features, and surfaces volatility context in a live screener.",
    highlights: [
      "Regime analysis + feature engineering pipeline",
      "Backtesting framework for rule-based signals",
      "Live screener surface (Streamlit on GCP)"
    ],
    stack: ["Python", "DuckDB", "Research", "GCP", "Streamlit"],
    liveUrl: "https://vae-screener-10109427624.us-central1.run.app/",
    repoUrl: "https://github.com/btheard3/volatility-alpha-engine",
    status: "Live"
  },
  {
    title: "EarningsEdge",
    subtitle: "Earnings event analysis + evaluation dashboard artifacts",
    whyItMatters:
      "Earnings are recurring catalysts that reprice uncertainty. EarningsEdge evaluates post‑earnings behavior to support research and trade planning.",
    highlights: [
      "Earnings-event analysis + evaluation artifacts",
      "Dashboard-style UI for exploration and review",
      "Built to be reproducible and portfolio-ready"
    ],
    stack: ["Python", "Evaluation", "Artifacts", "UI"],
    repoUrl: "https://github.com/btheard3/earningsedge",
    status: "Repo"
  }
];

const CONTACT = {
  name: "Brandon Theard",
  title: "Data Scientist | Decision-Support Systems",
  github: "https://github.com/btheard3",
  // TODO: replace with your real LinkedIn + email
  linkedin: "https://www.linkedin.com/in/REPLACE_ME/",
  email: "REPLACE_ME@example.com"
};

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="pill">{children}</span>;
}

function ExternalLink({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a className="link" href={href} target="_blank" rel="noreferrer">
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="card">
      <div className="cardTitleRow">
        <div>
          <h3 className="cardTitle">{p.title}</h3>
          <p className="cardSubtitle">{p.subtitle}</p>
        </div>
        <span className={`badge ${p.status.toLowerCase()}`}>{p.status}</span>
      </div>

      <p className="cardWhy">{p.whyItMatters}</p>

      <ul className="bullets">
        {p.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>

      <div className="stackRow">
        {p.stack.map((s) => (
          <Pill key={s}>{s}</Pill>
        ))}
      </div>

      <div className="cardLinks">
        {p.liveUrl ? (
          <ExternalLink href={p.liveUrl}>Open live app</ExternalLink>
        ) : (
          <span className="muted">Live app: not deployed</span>
        )}
        <ExternalLink href={p.repoUrl}>View repo</ExternalLink>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="page">
      <header className="header">
        <div className="headerInner">
          <div className="brand">
            <div className="brandMark">BT</div>
            <div>
              <div className="brandName">{CONTACT.name}</div>
              <div className="brandTitle">{CONTACT.title}</div>
            </div>
          </div>

          <nav className="nav">
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>

        <div className="hero">
          <h1 className="heroTitle">
            Decision-support systems for markets, narratives, and volatility.
          </h1>
          <p className="heroSubtitle">
            I ship interpretable analytics products — not vibes. Click any card
            to jump straight into the live app (or the repo when it’s research-only).
          </p>

          <div className="heroCtas">
            <a className="btn" href="#projects">
              Explore projects
            </a>
            <a className="btn secondary" href={CONTACT.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>

          <div className="signalRow">
            <div className="signal">
              <div className="signalNum">4</div>
              <div className="signalLbl">Projects</div>
            </div>
            <div className="signal">
              <div className="signalNum">3</div>
              <div className="signalLbl">Live apps</div>
            </div>
            <div className="signal">
              <div className="signalNum">1</div>
              <div className="signalLbl">Research repo</div>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <section id="projects" className="section">
          <div className="sectionHeader">
            <h2>Projects</h2>
            <p className="muted">
              Live apps open instantly. EarningsEdge links to the repo (no live UI yet).
            </p>
          </div>

          <div className="grid">
            {projects.map((p) => (
              <ProjectCard key={p.title} p={p} />
            ))}
          </div>
        </section>

        <section id="about" className="section">
          <div className="sectionHeader">
            <h2>About</h2>
          </div>

          <div className="about">
            <p>
              I’m Brandon — a data scientist who builds <b>interpretable</b> systems that help people
              make better calls under uncertainty. My work blends NLP, quantitative research,
              and product-quality dashboards.
            </p>

            <div className="aboutRow">
              <div className="aboutCard">
                <h3>What I optimize for</h3>
                <ul>
                  <li>Interpretability before hype</li>
                  <li>Reproducibility (runs clean, reads clean)</li>
                  <li>Fast feedback loops (dashboards + artifacts)</li>
                </ul>
              </div>
              <div className="aboutCard">
                <h3>What you’ll see here</h3>
                <ul>
                  <li>Real deployments (not just notebooks)</li>
                  <li>Clear “why this exists” framing</li>
                  <li>Portfolio-ready documentation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="sectionHeader">
            <h2>Contact</h2>
            <p className="muted">Hiring manager? Cool. Curious human? Also cool.</p>
          </div>

          <div className="contact">
            <div className="contactCard">
              <div className="contactLine">
                <span className="label">GitHub</span>
                <ExternalLink href={CONTACT.github}>{CONTACT.github}</ExternalLink>
              </div>
              <div className="contactLine">
                <span className="label">LinkedIn</span>
                <ExternalLink href={CONTACT.linkedin}>{CONTACT.linkedin}</ExternalLink>
              </div>
              <div className="contactLine">
                <span className="label">Email</span>
                <a className="link" href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>
              </div>
            </div>

            <div className="footerNote">
              <div className="footerName">{CONTACT.name}</div>
              <div className="muted">{CONTACT.title}</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
