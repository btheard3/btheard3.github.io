import React, { useMemo, useState, useEffect } from "react";

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
    title: "BatchBridge",
    subtitle: "Customer analytics, retention, and revenue insight framework",
    whyItMatters:
      "Businesses often know revenue totals but not which customers drive value, which customers are disengaging, or where revenue is at risk. BatchBridge turns transaction data into retention, churn, and CLV insights that support targeted business action.",
    highlights: [
      "Analyzed 18.5K+ cleaned transactions across 4.3K+ customers using SQL and Python",
      "Identified ~61.6% churn rate and sharp early-stage customer drop-off",
      "Built RFM segmentation, cohort retention analysis, CLV modeling, and KPI reporting",
      "Found that At Risk customers generated the highest average CLV, revealing revenue recovery opportunities"
    ],
    stack: ["SQL", "Python", "Excel", "Cohort Analysis", "Customer Segmentation"],
    repoUrl: "https://github.com/btheard3/batchbridge",
    status: "Repo"
  },
  {
    title: "ChurnSense",
    subtitle: "Customer churn analytics and retention decision support",
    whyItMatters:
      "Retention teams need to know which customers to prioritize and why. ChurnSense frames churn as a business decision problem by combining risk, targeting logic, and expected value.",
    highlights: [
      "Built a churn analytics workflow using customer records and feature-based risk analysis",
      "Designed retention-focused decision logic to support prioritized outreach",
      "Translated churn signals into stakeholder-friendly reporting and business interpretation"
    ],
    stack: ["SQL", "Python", "Power BI", "Data Modeling"],
    repoUrl: "https://github.com/btheard3/churnsense",
    status: "Repo"
  }
];

const CONTACT = {
  name: "Brandon Theard",
  title: "Data & Business Analyst | SQL | Python | Excel",
  github: "https://github.com/btheard3",
  linkedin: "https://www.linkedin.com/in/brandon-theard-811b38131",
  email: "btheard1@gmail.com"
};

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="pill">{children}</span>;
}

function ExternalLink({
  href,
  children,
  className,
  onClick
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      className={className ? `${className} link` : "link"}
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
    >
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}

function getTags(p: Project): string[] {
  const tags = new Set<string>();

  tags.add(p.status.toLowerCase());
  p.stack.forEach((s) => tags.add(s.toLowerCase().replace(/\s+/g, "")));

  const t = `${p.title} ${p.subtitle} ${p.whyItMatters}`.toLowerCase();

  if (t.includes("sql")) tags.add("sql");
  if (t.includes("python")) tags.add("python");
  if (t.includes("excel")) tags.add("excel");
  if (t.includes("power bi") || t.includes("powerbi")) tags.add("powerbi");
  if (t.includes("retention")) tags.add("retention");
  if (t.includes("customer")) tags.add("customeranalytics");
  if (t.includes("dashboard")) tags.add("dashboard");

  return Array.from(tags);
}

function summarizeThree(p: Project): { problem: string; approach: string; result: string } {
  switch (p.title) {
    case "BatchBridge":
      return {
        problem:
          "The business generated $8.9M+ in revenue but lacked visibility into churn, retention, and which customers were driving or risking future value.",
        approach:
          "Used SQL and Python to analyze 18.5K+ transactions across 4.3K+ customers, building RFM segmentation, cohort retention analysis, and CLV modeling.",
        result:
          "Found ~61.6% churn and revealed that At Risk customers had the highest average CLV, highlighting a major revenue recovery opportunity."
      };
    case "ChurnSense":
      return {
        problem:
          "Retention teams often know churn is a risk but lack a clear way to prioritize outreach and justify who should be contacted first.",
        approach:
          "Built a churn-focused analytics workflow combining customer risk signals, decision logic, and reporting for business stakeholders.",
        result:
          "Created a clearer retention decision framework that translates churn risk into actionable customer prioritization."
      };
    default:
      return {
        problem: "A business problem was identified and translated into measurable analytics questions.",
        approach: "Built a structured analysis pipeline using SQL, Python, and business-facing reporting.",
        result: "Produced decision-ready insights that support business action."
      };
  }
}

function getProofPanel(p: Project): {
  datasetNote: string;
  proofPoints: string[];
  reproTip: string;
} {
  switch (p.title) {
    case "BatchBridge":
      return {
        datasetNote:
          "Dataset: cleaned transactional retail data with 18.5K+ transactions across 4.3K+ customers. Analysis focused on retention, customer segmentation, churn, and lifetime value.",
        proofPoints: [
          "SQL used for KPI aggregation, churn logic, lifespan, cohort base tables, and CLV base calculations",
          "Python used for RFM segmentation, retention matrix construction, heatmap visualization, and CLV analysis",
          "README and visuals show the business problem, approach, and quantified findings clearly"
        ],
        reproTip:
          "Repro: clone repo → run notebooks in order (01–05) → review SQL scripts → view README visuals and outputs."
      };
    case "ChurnSense":
      return {
        datasetNote:
          "Dataset: customer churn data used to evaluate retention risk and support outreach prioritization.",
        proofPoints: [
          "Structured churn analysis workflow documented in the repo",
          "Focus on translating churn signals into a decision-support framework",
          "Project complements BatchBridge as a customer analytics case study"
        ],
        reproTip:
          "Repro: clone repo → follow the project README → review analysis and business framing."
      };
    default:
      return {
        datasetNote: "Dataset documented in the project repo.",
        proofPoints: ["Repo shows the end-to-end path."],
        reproTip: "Repro: follow the README."
      };
  }
}

function ProjectCard({ p, onOpen }: { p: Project; onOpen: (p: Project) => void }) {
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
          <ExternalLink href={p.liveUrl}>Open live dashboard</ExternalLink>
        ) : (
          <span className="muted">Live: not deployed</span>
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
            <div className="muted">Business problem, approach, result, and proof.</div>
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
  const [activeFilters, setActiveFilters] = useState<string[]>(["repo"]);
  const [selected, setSelected] = useState<Project | null>(null);

  const featured = useMemo<Project>(() => {
    const byTitle = projects.find((p) => p.title === "BatchBridge");
    return byTitle ?? projects[0];
  }, []);

  const filterOptions = useMemo(
    () => [
      { key: "repo", label: "Repo" },
      { key: "sql", label: "SQL" },
      { key: "python", label: "Python" },
      { key: "excel", label: "Excel" },
      { key: "powerbi", label: "Power BI" },
      { key: "retention", label: "Retention" },
      { key: "customeranalytics", label: "Customer Analytics" }
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const normalizedFilters = new Set(activeFilters.map((f) => f.toLowerCase()));

    return projects.filter((p) => {
      const tags = new Set(getTags(p));
      const passesFilters =
        normalizedFilters.size === 0 || Array.from(normalizedFilters).every((f) => tags.has(f));

      if (!passesFilters) return false;
      if (!q) return true;

      const blob = [p.title, p.subtitle, p.whyItMatters, p.highlights.join(" "), p.stack.join(" ")]
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

  const detail = selected ? summarizeThree(selected) : null;
  const proof = selected ? getProofPanel(selected) : null;

  const completedProjectCount = projects.length;

  return (
    <div className="page">
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

        .heroLayout {
          display:flex;
          align-items:flex-start;
          justify-content:space-between;
          gap:22px;
          position: relative;
          z-index: 1;
        }

        .heroCopy {
          flex:1;
          min-width:280px;
          max-width: 920px;
        }

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
          <div className="heroLayout">
            <div className="heroCopy">
              <h1 className="heroTitle">Data & Business Analyst | SQL • Python • Excel</h1>
              <p className="heroSubtitle">
                I analyze customer and business data to identify churn risk, improve retention, and uncover revenue
                opportunities using SQL and Python.
              </p>
              <p className="muted" style={{ maxWidth: 760 }}>
                Focused on customer analytics, KPI design, and decision-ready business insights.
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
                  <div className="signalNum">{completedProjectCount}</div>
                  <div className="signalLbl">Completed projects</div>
                </div>
                <div className="signal">
                  <div className="signalNum">SQL</div>
                  <div className="signalLbl">Core tool</div>
                </div>
                <div className="signal">
                  <div className="signalNum">Customer</div>
                  <div className="signalLbl">Analytics focus</div>
                </div>
              </div>
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
                <span className="btn secondary" style={{ opacity: 0.7, cursor: "not-allowed" }}>
                  Live not deployed
                </span>
                <button className="btn secondary" type="button" onClick={() => setSelected(featured)}>
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
              Focused portfolio projects in customer analytics, churn, retention, and business decision support.
            </p>

            <div className="searchRow">
              <input
                className="searchInput"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search: SQL, Python, retention, customer analytics, Power BI..."
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
              <ProjectCard key={p.title} p={p} onOpen={setSelected} />
            ))}
          </div>
        </section>

        <section id="about" className="section">
          <div className="sectionHeader">
            <h2>About</h2>
          </div>

          <div className="about">
            <p>
              I’m Brandon — a Data and Business Analyst focused on customer analytics, retention, and business
              performance.
            </p>

            <div className="aboutRow">
              <div className="aboutCard">
                <h3>What I do</h3>
                <ul>
                  <li>Analyze transactional and customer data using SQL and Python</li>
                  <li>Build segmentation, retention, and KPI frameworks</li>
                  <li>Translate analysis into decision-ready business insights</li>
                </ul>
              </div>
              <div className="aboutCard">
                <h3>What this portfolio shows</h3>
                <ul>
                  <li>Customer analytics and churn analysis</li>
                  <li>Cohort retention and lifetime value modeling</li>
                  <li>Business-oriented reporting and dashboard thinking</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="sectionHeader">
            <h2>Contact</h2>
            <p className="muted">If you're hiring for a Data Analyst or Business Analyst role, let's connect.</p>
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

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title ?? "Project"}>
        {selected && detail && proof && (
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
                <ExternalLink href={selected.repoUrl} className="btn secondary">
                  View repo
                </ExternalLink>
              </div>
            </div>

            <div className="detailCard">
              <div className="detailH">Proof + structure</div>
              <div className="muted">Enough to show the project is real, reproducible, and business-relevant.</div>

              <div className="detailK">Tags</div>
              <div className="stackRow">
                {getTags(selected)
                  .filter((t) =>
                    ["live", "repo", "powerbi", "sql", "python", "excel", "dashboard", "retention", "customeranalytics"].includes(t)
                  )
                  .map((t) => (
                    <Pill key={t}>{t.toUpperCase()}</Pill>
                  ))}
              </div>

              <div className="detailK">Mini diagram</div>
              <div className="archBox">{`Business problem
  → SQL / Python analysis
  → segmentation / retention / CLV
  → business insight
  → action recommendation`}</div>

              <div className="detailK">Dataset</div>
              <div className="muted">{proof.datasetNote}</div>

              <div className="detailK">Proof points</div>
              <ul className="bullets">
                {proof.proofPoints.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>

              <div className="detailK">Repro tip</div>
              <div className="muted">{proof.reproTip}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}