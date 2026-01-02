import React, { useEffect, useMemo, useState } from "react";

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
    title: "Financial News NLP",
    subtitle: "Narrative + topic analysis across major outlets",
    whyItMatters:
      "Turns noisy headlines into interpretable themes so you can see what the market is focused on — without pretending headlines are a price oracle.",
    highlights: [
      "Compares narrative emphasis across CNBC / Reuters / The Guardian",
      "Interpretable baseline (TF-IDF) + topic discovery",
      "Human-readable insights for reporting and analysis"
    ],
    stack: ["Python", "NLP", "Topic Modeling", "Dashboard"],
    liveUrl: "http://alb-financial-news-nlp-27107617.us-east-2.elb.amazonaws.com/",
    repoUrl: "https://github.com/btheard3/financial-news-nlp",
    status: "Live"
  },
  {
    title: "EarningsEdge",
    subtitle: "Earnings event analysis + evaluation dashboard artifacts",
    whyItMatters:
      "Earnings are recurring catalysts that reprice uncertainty. EarningsEdge evaluates post-earnings behavior to support research and trade planning.",
    highlights: [
      "Earnings-event analysis + evaluation artifacts",
      "Dashboard-style UI for exploration and review",
      "Built to be reproducible and portfolio-ready"
    ],
    stack: ["Python", "Evaluation", "Artifacts", "UI"],
    liveUrl: "https://earningsedge.netlify.app/",
    repoUrl: "https://github.com/btheard3/earningsedge",
    status: "Live"
  }
];

const CONTACT = {
  name: "Brandon Theard",
  title: "Data Scientist | Decision-Support Systems",
  github: "https://github.com/btheard3",
  linkedin: "https://www.linkedin.com/in/brandon-theard-811b38131",
  email: "btheard4@outlook.com"
};

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="pill">{children}</span>;
}

function ExternalLink({
  href,
  children,
  className
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      className={className ? `${className} link` : "link"}
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}

function getTags(p: Project): string[] {
  const tags = new Set<string>();

  tags.add(p.status.toLowerCase()); // live | repo
  p.stack.forEach((s) => tags.add(s.toLowerCase()));

  const t = `${p.title} ${p.subtitle} ${p.whyItMatters}`.toLowerCase();
  if (t.includes("nlp") || t.includes("topic") || t.includes("headline")) tags.add("nlp");
  if (t.includes("options") || t.includes("sweep") || t.includes("trading")) tags.add("trading");
  if (t.includes("volatility") || t.includes("regime")) tags.add("volatility");
  if (t.includes("dashboard") || p.stack.some((x) => x.toLowerCase() === "dashboard")) tags.add("dashboard");
  if (p.stack.some((x) => x.toLowerCase() === "research")) tags.add("research");

  if (p.stack.some((x) => x.toLowerCase() === "streamlit")) tags.add("dashboard");

  return Array.from(tags);
}

function summarizeThree(p: Project): { problem: string; approach: string; result: string } {
  switch (p.title) {
    case "Sentinel Forecaster":
      return {
        problem: "Sweeps are noisy; raw activity gets misread as signal.",
        approach: "Score context (direction, vol regime, expected move) from historical patterns.",
        result: "Explainable triage + live dashboard for fast, consistent reviews."
      };
    case "Volatility Alpha Engine (VAE)":
      return {
        problem: "Volatility shifts regimes—risk models break when context changes.",
        approach: "Regime research + feature pipeline + screening surface for volatility context.",
        result: "Live screener + research artifacts to support safer decision-making."
      };
    case "Financial News NLP":
      return {
        problem: "News is loud; it’s hard to separate narratives from noise.",
        approach: "Interpretable NLP (TF-IDF + topic discovery) across multiple outlets.",
        result: "Clear theme + outlet comparison for reporting and narrative tracking."
      };
    case "EarningsEdge":
      return {
        problem: "Earnings reprice uncertainty; most reviews are ad-hoc and inconsistent.",
        approach: "Evaluate post-earnings behavior and publish consistent artifacts for review.",
        result: "A live dashboard + reproducible repo to scale earnings research."
      };
    default:
      return {
        problem: "Unclear signal in noisy data.",
        approach: "Build interpretable methods + reproducible pipeline.",
        result: "Decision support you can defend."
      };
  }
}

function ProjectCard({
  p,
  onOpen
}: {
  p: Project;
  onOpen: (p: Project) => void;
}) {
  return (
    <div
      className="card"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(p)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen(p);
      }}
    >
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
        <span className="muted" style={{ marginLeft: "auto" }}>
          Click for details →
        </span>
      </div>
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={active ? "btn pillBtn active" : "btn pillBtn"}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function Modal({
  open,
  onClose,
  title,
  children
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modalBackdrop"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modalCard">
        <div className="modalHeader">
          <div>
            <div className="modalTitle">{title}</div>
            <div className="muted">60-second overview + links + proof.</div>
          </div>
          <button type="button" className="btn secondary" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="modalBody">{children}</div>
      </div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>(["live"]);
  const [selected, setSelected] = useState<Project | null>(null);

  const featured = useMemo<Project>(() => {
    const byTitle = projects.find((p) => p.title === "Sentinel Forecaster");
    return byTitle ?? projects[0];
  }, []);

  const filterOptions = useMemo(
    () => [
      { key: "live", label: "Live" },
      { key: "repo", label: "Repo" },
      { key: "nlp", label: "NLP" },
      { key: "trading", label: "Trading" },
      { key: "volatility", label: "Volatility" },
      { key: "dashboard", label: "Dashboards" },
      { key: "research", label: "Research" }
    ],
    []
  );

  const liveCount = useMemo(
    () => projects.filter((p) => p.status === "Live").length,
    []
  );
  const repoCount = useMemo(
    () => projects.filter((p) => p.status === "Repo").length,
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const normalizedFilters = new Set(activeFilters.map((f) => f.toLowerCase()));

    return projects.filter((p) => {
      const tags = new Set(getTags(p));
      const passesFilters =
        normalizedFilters.size === 0 ||
        Array.from(normalizedFilters).every((f) => tags.has(f));

      if (!passesFilters) return false;

      if (!q) return true;

      const blob = [
        p.title,
        p.subtitle,
        p.whyItMatters,
        p.highlights.join(" "),
        p.stack.join(" ")
      ]
        .join(" ")
        .toLowerCase();

      return blob.includes(q);
    });
  }, [query, activeFilters]);

  const toggleFilter = (key: string) => {
    setActiveFilters((prev) => {
      const set = new Set(prev);
      if (set.has(key)) set.delete(key);
      else set.add(key);
      return Array.from(set);
    });
  };

  const clearFilters = () => setActiveFilters([]);

  const openDetails = (p: Project) => setSelected(p);
  const closeDetails = () => setSelected(null);

  const detail = selected ? summarizeThree(selected) : null;

  return (
    <div className="page">
      {/* Modal + small UI styles (so it works tonight without CSS hunting) */}
      <style>{`
        .pillBtn { padding: 8px 12px; border-radius: 999px; }
        .pillBtn.active { box-shadow: 0 0 0 1px rgba(255,255,255,0.18) inset; }
        .filtersRow { display:flex; gap:10px; flex-wrap:wrap; align-items:center; margin-top:14px; }
        .searchRow { display:flex; gap:10px; flex-wrap:wrap; align-items:center; margin-top:14px; }
        .searchInput {
          flex: 1;
          min-width: 240px;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.04);
          color: inherit;
          outline: none;
        }
        .searchInput:focus { border-color: rgba(255,255,255,0.22); }
        .featuredStrip {
          margin-top: 18px;
          padding: 18px;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.03);
        }
        .featuredTop { display:flex; gap:14px; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; }
        .featuredTitle { font-size: 18px; font-weight: 700; }
        .featuredSub { margin-top: 6px; max-width: 820px; }
        .featuredCtas { display:flex; gap:10px; flex-wrap:wrap; }
        .miniGrid {
          margin-top: 12px;
          display:grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }
        @media (max-width: 900px) { .miniGrid { grid-template-columns: 1fr; } }
        .miniCard {
          padding: 14px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
        }
        .miniLbl { font-weight: 700; margin-bottom: 6px; }
        .modalBackdrop {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.62);
          display:flex; align-items:center; justify-content:center;
          padding: 18px;
          z-index: 9999;
        }
        .modalCard {
          width: min(980px, 100%);
          max-height: min(86vh, 860px);
          overflow: auto;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(12,14,20,0.96);
          box-shadow: 0 10px 40px rgba(0,0,0,0.35);
        }
        .modalHeader {
          position: sticky; top: 0;
          background: rgba(12,14,20,0.96);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 16px 16px;
          display:flex; align-items:center; justify-content:space-between; gap: 12px;
        }
        .modalTitle { font-size: 18px; font-weight: 800; }
        .modalBody { padding: 16px; }
        .detailGrid {
          display:grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 14px;
        }
        @media (max-width: 900px) { .detailGrid { grid-template-columns: 1fr; } }
        .detailCard {
          padding: 14px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
        }
        .detailH { font-weight: 800; margin-bottom: 8px; }
        .detailK { font-weight: 700; margin-top: 12px; margin-bottom: 6px; }
        .linkRow { display:flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; }
        .archBox {
          margin-top: 10px;
          padding: 12px;
          border-radius: 14px;
          border: 1px dashed rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.02);
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 12px;
          line-height: 1.35;
          white-space: pre-wrap;
        }
      `}</style>

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
            for the 60-second overview, then jump to the live app or repo.
          </p>

          <div className="heroCtas">
            <a className="btn" href="#projects">
              Explore projects
            </a>
            <a className="btn secondary" href={CONTACT.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a className="btn secondary" href={CONTACT.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </div>

          <div className="signalRow">
            <div className="signal">
              <div className="signalNum">{projects.length}</div>
              <div className="signalLbl">Projects</div>
            </div>
            <div className="signal">
              <div className="signalNum">{liveCount}</div>
              <div className="signalLbl">Live apps</div>
            </div>
            <div className="signal">
              <div className="signalNum">{repoCount}</div>
              <div className="signalLbl">Research repos</div>
            </div>
          </div>

          <div className="featuredStrip">
            <div className="featuredTop">
              <div>
                <div className="featuredTitle">Featured: {featured.title}</div>
                <div className="muted">{featured.subtitle}</div>
                <p className="featuredSub">{featured.whyItMatters}</p>
                <div className="stackRow">
                  {featured.stack.slice(0, 5).map((s) => (
                    <Pill key={s}>{s}</Pill>
                  ))}
                </div>
              </div>

              <div className="featuredCtas">
                {featured.liveUrl ? (
                  <a className="btn" href={featured.liveUrl} target="_blank" rel="noreferrer">
                    Open live app ↗
                  </a>
                ) : (
                  <span className="btn secondary" style={{ opacity: 0.7, cursor: "not-allowed" }}>
                    Live app not deployed
                  </span>
                )}
                <button className="btn secondary" type="button" onClick={() => openDetails(featured)}>
                  Read 60-sec overview
                </button>
              </div>
            </div>

            <div className="miniGrid">
              {(() => {
                const s = summarizeThree(featured);
                return (
                  <>
                    <div className="miniCard">
                      <div className="miniLbl">Problem</div>
                      <div className="muted">{s.problem}</div>
                    </div>
                    <div className="miniCard">
                      <div className="miniLbl">Approach</div>
                      <div className="muted">{s.approach}</div>
                    </div>
                    <div className="miniCard">
                      <div className="miniLbl">Result</div>
                      <div className="muted">{s.result}</div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <section id="projects" className="section">
          <div className="sectionHeader">
            <h2>Projects</h2>
            <p className="muted">
              Click a card for a 60-second overview, then jump to the live app or repo.
            </p>

            <div className="searchRow">
              <input
                className="searchInput"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search: volatility, NLP, dashboard, DuckDB, options…"
                aria-label="Search projects"
              />
              <button type="button" className="btn secondary" onClick={() => setQuery("")}>
                Clear search
              </button>
            </div>

            <div className="filtersRow" aria-label="Project filters">
              {filterOptions.map((f) => (
                <FilterPill
                  key={f.key}
                  label={f.label}
                  active={activeFilters.includes(f.key)}
                  onClick={() => toggleFilter(f.key)}
                />
              ))}
              <button type="button" className="btn secondary" onClick={clearFilters}>
                Clear filters
              </button>
              <span className="muted" style={{ marginLeft: "auto" }}>
                Showing {filtered.length} / {projects.length}
              </span>
            </div>
          </div>

          <div className="grid">
            {filtered.map((p) => (
              <ProjectCard key={p.title} p={p} onOpen={openDetails} />
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

      <Modal open={!!selected} onClose={closeDetails} title={selected?.title ?? "Project"}>
        {selected && detail && (
          <div className="detailGrid">
            <div className="detailCard">
              <div className="detailH">60-second overview</div>

              <div className="detailK">Problem</div>
              <div className="muted">{detail.problem}</div>

              <div className="detailK">Approach</div>
              <div className="muted">{detail.approach}</div>

              <div className="detailK">Result</div>
              <div className="muted">{detail.result}</div>

              <div className="detailK">Highlights</div>
              <ul className="bullets">
                {selected.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>

              <div className="detailK">Stack</div>
              <div className="stackRow">
                {selected.stack.map((s) => (
                  <Pill key={s}>{s}</Pill>
                ))}
              </div>

              <div className="detailK">Links</div>
              <div className="linkRow">
                {selected.liveUrl ? (
                  <ExternalLink href={selected.liveUrl} className="btn">
                    Open live app
                  </ExternalLink>
                ) : (
                  <span className="btn secondary" style={{ opacity: 0.7, cursor: "not-allowed" }}>
                    Live app not deployed
                  </span>
                )}
                <ExternalLink href={selected.repoUrl} className="btn secondary">
                  View repo
                </ExternalLink>
              </div>
            </div>

            <div className="detailCard">
              <div className="detailH">Proof + architecture</div>
              <div className="muted">
                Not a dissertation — just enough to show this is real, reproducible work.
              </div>

              <div className="detailK">Tags</div>
              <div className="stackRow">
                {getTags(selected)
                  .filter((t) =>
                    ["live", "repo", "nlp", "trading", "volatility", "dashboard", "research"].includes(t)
                  )
                  .map((t) => (
                    <Pill key={t}>{t.toUpperCase()}</Pill>
                  ))}
              </div>

              <div className="detailK">Mini diagram</div>
              <div className="archBox">{`User → UI (Dashboard)
  → Data/Features
  → Modeling / Scoring
  → Artifacts + Explanations
  → Deploy (Cloud / GitHub)`}</div>

              <div className="detailK">Dataset note (add later)</div>
              <div className="muted">
                Add 1–2 lines here per project (source + date range + key fields).
              </div>

              <div className="detailK">Repro tip</div>
              <div className="muted">
                Keep install steps + commands in each repo README. This site is the front door.
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
