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
    title: "ChurnSense",
    subtitle: "Customer churn risk + retention decision simulator (Power BI)",
    whyItMatters:
      "Customer retention is cheaper than acquisition. ChurnSense turns churn risk into a measurable decision: who to contact, what it costs, and what value you capture under capacity constraints.",
    highlights: [
      "What-if capacity slider ties outreach volume → expected value captured",
      "Decision table: eligible customers ranked by churn risk and EV",
      "Deciles/lift-style view to defend targeting strategy"
    ],
    stack: ["Power BI", "DAX", "Data Modeling", "Decision Support"],
    // liveUrl: "https://app.powerbi.com/....",
    repoUrl: "https://github.com/btheard3/churnsense",
    status: "Repo"
  },
  {
    title: "SupportOps",
    subtitle: "Support operations analytics (routing, SLA, backlog, deflection)",
    whyItMatters:
      "Support is an ops system: tickets flow in, SLAs get missed, backlog piles up. SupportOps turns ticket telemetry into governed KPIs, routing insights, and a dashboard leaders can run weekly.",
    highlights: [
      "Governed KPIs: SLA, backlog aging, throughput, reopen rate",
      "Routing + prioritization views (category, priority, channel, language)",
      "Deflection/self-serve opportunities from ticket themes"
    ],
    stack: ["SQL", "Power BI", "Data Modeling", "Ops Analytics"],
    repoUrl: "https://github.com/btheard3/supportops",
    status: "Repo"
  },
  {
    title: "TestWise",
    subtitle: "A/B testing + decision framework for product/ops changes",
    whyItMatters:
      "Most experiments fail because the question is fuzzy. TestWise turns experimentation into a repeatable workflow: hypothesis → metrics → design → interpretation → decision.",
    highlights: [
      "Experiment design templates (MDE, power, guardrails)",
      "KPI definitions + decision rules (stop/ship/iterate)",
      "Post-test interpretation that’s stakeholder-friendly"
    ],
    stack: ["Statistics", "SQL", "Power BI", "Experimentation"],
    repoUrl: "https://github.com/btheard3/testwise",
    status: "Repo"
  },
  {
    title: "DemandSignal",
    subtitle: "Demand forecasting under uncertainty (planning + staffing)",
    whyItMatters:
      "Forecasting isn’t about perfect accuracy — it’s about better decisions. DemandSignal forecasts demand ranges and helps teams plan staffing, inventory, and service capacity.",
    highlights: [
      "Forecasts with uncertainty bands (not one magic number)",
      "Error tracking by segment + time window for accountability",
      "Planning views translating forecasts into staffing actions"
    ],
    stack: ["Python", "Time Series", "SQL", "Forecasting"],
    repoUrl: "https://github.com/btheard3/demandsignal",
    status: "Repo"
  }
];

const CONTACT = {
  name: "Brandon Theard",
  title: "Business Intelligence Analyst | Decision-Support Systems",
  github: "https://github.com/btheard3",
  linkedin: "https://www.linkedin.com/in/brandon-theard-811b38131",
  email: "btheard4@outlook.com"
};

const BLOGS = [
  {
    key: "churnsense",
    title: "ChurnSense",
    subtitle: "Turning churn risk into a capacity-aware retention decision",
    url: "https://medium.com/@btheard1"
  },
  {
    key: "supportops",
    title: "SupportOps",
    subtitle: "Support telemetry → governed KPIs → weekly ops decisions",
    url: "https://medium.com/@btheard1"
  },
  {
    key: "testwise",
    title: "TestWise",
    subtitle: "A/B testing framework you can actually defend",
    url: "https://medium.com/@btheard1"
  },
  {
    key: "demandsignal",
    title: "DemandSignal",
    subtitle: "Forecasting under uncertainty for planning and staffing",
    url: "https://medium.com/@btheard1"
  }
];

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

  if (t.includes("power bi") || p.stack.some((x) => x.toLowerCase() === "power bi")) tags.add("powerbi");
  if (t.includes("dax")) tags.add("dax");
  if (t.includes("sql")) tags.add("sql");
  if (t.includes("experiment") || t.includes("a/b")) tags.add("experimentation");
  if (t.includes("support") || t.includes("sla") || t.includes("backlog") || t.includes("ticket")) tags.add("support");
  if (t.includes("forecast")) tags.add("forecasting");
  if (t.includes("dashboard") || t.includes("powerbi")) tags.add("dashboard");

  return Array.from(tags);
}

function summarizeThree(p: Project): { problem: string; approach: string; result: string } {
  switch (p.title) {
    case "ChurnSense":
      return {
        problem: "Retention teams have limited capacity; targeting often becomes guesswork.",
        approach: "Model churn risk + expected value and simulate capacity-constrained outreach in Power BI.",
        result: "A defendable decision workflow: who to contact, cost, and EV captured."
      };
    case "SupportOps":
      return {
        problem: "Support teams drown in tickets; SLA misses are discovered late and fixes are reactive.",
        approach: "Model ticket telemetry → define governed KPIs → build ops dashboards for routing and backlog control.",
        result: "Faster triage, clearer accountability, and better weekly ops decisions."
      };
    case "TestWise":
      return {
        problem: "Teams ship changes without proving impact (or run messy experiments).",
        approach: "Standardize hypothesis, metrics, design, and decision rules for A/B tests.",
        result: "Cleaner experiments and decisions stakeholders trust."
      };
    case "DemandSignal":
      return {
        problem: "Planning breaks when demand is uncertain and forecasts are brittle.",
        approach: "Forecast ranges, track errors, and translate predictions into staffing/planning actions.",
        result: "More resilient planning and fewer surprise outages."
      };
    default:
      return {
        problem: "Unclear signal in noisy data.",
        approach: "Build interpretable methods + reproducible pipeline.",
        result: "Decision support you can defend."
      };
  }
}

function getProofPanel(p: Project): {
  datasetNote: string;
  proofPoints: string[];
  reproTip: string;
} {
  switch (p.title) {
    case "ChurnSense":
      return {
        datasetNote:
          "Dataset: Telco Customer Churn (Kaggle). Modeled as a star schema in Power BI; DAX measures compute churn risk and expected value to support capacity-aware targeting.",
        proofPoints: [
          "Power BI model + DAX measures are documented in the repo",
          "Page 1 supports the decision (who to contact, costs, EV)",
          "Page 2 explains the strategy (deciles / lift-style reasoning)"
        ],
        reproTip:
          "Repro: clone repo → open .pbix → refresh data → review measures and pages → export screenshots for portfolio/resume."
      };
    case "SupportOps":
      return {
        datasetNote:
          "Dataset: Multilingual Customer Support Tickets (Kaggle). Core fields: timestamps, category, priority, channel, language, and ticket text used for themes/deflection candidates.",
        proofPoints: [
          "Star schema: Tickets fact + Dimensions (Category, Channel, Priority, Time, Language)",
          "KPI layer: SLA %, backlog aging buckets, throughput, reopen rate",
          "Ops views: routing hot spots + deflection opportunities"
        ],
        reproTip:
          "Repro: clone repo → run SQL transforms (or notebooks) → open Power BI dashboard → validate KPI definitions against the data model."
      };
    case "TestWise":
      return {
        datasetNote:
          "Dataset: placeholder (A/B testing or experimentation dataset). Focus is correct design + interpretation, not flashy charts.",
        proofPoints: [
          "Experiment template: hypothesis → metrics → design → decision",
          "Guardrails + practical interpretation for stakeholders",
          "Reusable framework (not one-off analysis)"
        ],
        reproTip:
          "Repro: clone repo → follow the test templates + run SQL/Python analysis → review Power BI summary."
      };
    case "DemandSignal":
      return {
        datasetNote:
          "Dataset: placeholder (time-series demand dataset). Focus is forecasting with uncertainty and decision translation.",
        proofPoints: [
          "Forecast + uncertainty bands + error tracking",
          "Decision views: staffing/planning implications",
          "Reproducible pipeline + documentation"
        ],
        reproTip:
          "Repro: clone repo → run forecasting notebook/script → open dashboard summary."
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
          <span className="muted">Live: not deployed yet</span>
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

function BlogModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
      aria-label="Project blogs"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modalCard">
        <div className="modalHeader">
          <div>
            <div className="modalTitle">Project blogs</div>
            <div className="muted">Short reads. Same framing as the portfolio cards.</div>
          </div>
          <button type="button" className="btn secondary" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="modalBody">
          <div className="blogGrid">
            {BLOGS.map((b) => (
              <div key={b.key} className="blogCard">
                <div className="blogTitleRow">
                  <div>
                    <div className="blogTitle">{b.title}</div>
                    <div className="muted">{b.subtitle}</div>
                  </div>
                  <span className="badge live">Medium</span>
                </div>

                <div className="linkRow" style={{ marginTop: 12 }}>
                  <ExternalLink href={b.url} className="btn">
                    Read blog
                  </ExternalLink>
                </div>
              </div>
            ))}
          </div>

          <div className="archBox" style={{ marginTop: 14 }}>
            {`Tip: in BI interviews, the dashboard screenshot hooks them.
The KPI definitions + model logic win them.`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>(["repo"]);
  const [selected, setSelected] = useState<Project | null>(null);
  const [blogsOpen, setBlogsOpen] = useState(false);

  const featured = useMemo<Project>(() => {
    const byTitle = projects.find((p) => p.title === "ChurnSense");
    return byTitle ?? projects[0];
  }, []);

  const filterOptions = useMemo(
    () => [
      { key: "repo", label: "Repo" },
      { key: "live", label: "Live" },
      { key: "powerbi", label: "Power BI" },
      { key: "dax", label: "DAX" },
      { key: "sql", label: "SQL" },
      { key: "dashboard", label: "Dashboards" },
      { key: "support", label: "Support Ops" },
      { key: "experimentation", label: "Experimentation" },
      { key: "forecasting", label: "Forecasting" }
    ],
    []
  );

  const liveCount = useMemo(() => projects.filter((p) => p.status === "Live").length, []);
  const repoCount = useMemo(() => projects.filter((p) => p.status === "Repo").length, []);

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

  const openDetails = (p: Project) => setSelected(p);
  const closeDetails = () => setSelected(null);

  const detail = selected ? summarizeThree(selected) : null;
  const proof = selected ? getProofPanel(selected) : null;

  return (
    <div className="page">
      {/* keep your existing style injection unchanged */}
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

        .heroLayout { display:flex; align-items:center; justify-content:space-between; gap:22px; position: relative; z-index: 1; }
        .heroCopy { flex:1; min-width:280px; }
        .heroPhotoWrap { width:180px; flex:0 0 180px; display:flex; justify-content:flex-end; position: relative; z-index: 10; }
        .heroPhoto {
          width:180px; height:180px;
          border-radius:999px;
          object-fit:cover;
          border:1px solid rgba(255,255,255,0.10);
          box-shadow:0 10px 30px rgba(0,0,0,0.35);
          background:rgba(255,255,255,0.04);

          position: relative;
          z-index: 10;
          opacity: 1 !important;
          filter: none !important;
        }
        @media (max-width: 860px) {
          .heroLayout { flex-direction:column; align-items:flex-start; }
          .heroPhotoWrap { width:148px; flex:0 0 auto; justify-content:flex-start; }
          .heroPhoto { width:148px; height:148px; }
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
        .blogGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        @media (max-width: 900px) { .blogGrid { grid-template-columns: 1fr; } }
        .blogCard {
          padding: 14px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
        }
        .blogTitleRow { display:flex; gap: 12px; justify-content: space-between; align-items:flex-start; }
        .blogTitle { font-weight: 800; }
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
              <h1 className="heroTitle">
                Decision-support dashboards for retention, support operations, experimentation, and forecasting.
              </h1>
              <p className="heroSubtitle">
                I build BI products that turn messy operational data into defendable business decisions — governed KPIs,
                clear models, and dashboards leaders can run weekly.
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

                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => setBlogsOpen(true)}
                  aria-label="Open blog list"
                >
                  Blog ↗
                </button>
              </div>

              <div className="signalRow">
                <div className="signal">
                  <div className="signalNum">{projects.length}</div>
                  <div className="signalLbl">Projects</div>
                </div>
                <div className="signal">
                  <div className="signalNum">{liveCount}</div>
                  <div className="signalLbl">Live dashboards</div>
                </div>
                <div className="signal">
                  <div className="signalNum">{repoCount}</div>
                  <div className="signalLbl">Repos</div>
                </div>
              </div>
            </div>

            <div className="heroPhotoWrap">
              <img src="/portfolioheadshot.jpg" alt="Brandon Theard" className="heroPhoto" loading="lazy" />
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
                    Open live dashboard ↗
                  </a>
                ) : (
                  <span className="btn secondary" style={{ opacity: 0.7, cursor: "not-allowed" }}>
                    Live not deployed
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
              Click a card for a 60-second overview, then jump to the repo (and live dashboard when available).
            </p>

            <div className="searchRow">
              <input
                className="searchInput"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search: Power BI, DAX, SQL, SLA, backlog, forecasting, A/B…"
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
              I’m Brandon — I build <b>BI decision-support systems</b> that make messy operational data useful: governed
              KPIs, clear models, and dashboards that drive action.
            </p>

            <div className="aboutRow">
              <div className="aboutCard">
                <h3>What I optimize for</h3>
                <ul>
                  <li>Clarity: KPI definitions you can defend</li>
                  <li>Trust: reproducible models + transparent logic</li>
                  <li>Speed: dashboards built for real decisions</li>
                </ul>
              </div>
              <div className="aboutCard">
                <h3>What you’ll see here</h3>
                <ul>
                  <li>Power BI + DAX + data modeling</li>
                  <li>Support telemetry → ops KPIs (SLA, backlog, routing)</li>
                  <li>Experimentation + forecasting as decision tools</li>
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
                {selected.liveUrl ? (
                  <ExternalLink href={selected.liveUrl} className="btn">
                    Open live dashboard
                  </ExternalLink>
                ) : (
                  <span className="btn secondary" style={{ opacity: 0.7, cursor: "not-allowed" }}>
                    Live not deployed
                  </span>
                )}
                <ExternalLink href={selected.repoUrl} className="btn secondary">
                  View repo
                </ExternalLink>
              </div>
            </div>

            <div className="detailCard">
              <div className="detailH">Proof + architecture</div>
              <div className="muted">Not a dissertation — just enough to show this is real, reproducible work.</div>

              <div className="detailK">Tags</div>
              <div className="stackRow">
                {getTags(selected)
                  .filter((t) =>
                    ["live", "repo", "powerbi", "dax", "sql", "dashboard", "support", "experimentation", "forecasting"].includes(t)
                  )
                  .map((t) => (
                    <Pill key={t}>{t.toUpperCase()}</Pill>
                  ))}
              </div>

              <div className="detailK">Mini diagram</div>
              <div className="archBox">{`Business question
  → Data model (star schema)
  → Measures (DAX / SQL)
  → Decision views (dashboards)
  → Action + weekly reporting cadence`}</div>

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

      <BlogModal open={blogsOpen} onClose={() => setBlogsOpen(false)} />
    </div>
  );
}
