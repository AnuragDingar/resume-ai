import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview";
import { useParams } from "react-router";

const NAV_SECTIONS = [
  { id: "technical", label: "Technical Questions", icon: "<>" },
  { id: "behavioural", label: "Behavioral Questions", icon: "💬" },
  { id: "roadmap", label: "Road Map", icon: "➤" },
];
const CircularScore = ({ score }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
      <circle
        cx="70"
        cy="70"
        r={radius}
        fill="none"
        stroke="#2a2a2a"
        strokeWidth="8"
      />
      <circle
        cx="70"
        cy="70"
        r={radius}
        fill="none"
        stroke="#22c55e"
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 70 70)"
      />
      <text
        x="70"
        y="63"
        textAnchor="middle"
        fill="white"
        fontSize="28"
        fontWeight="bold"
      >
        {score}
      </text>
      <text x="70" y="83" textAnchor="middle" fill="#888" fontSize="13">
        %
      </text>
    </svg>
  );
};
const Interview = () => {
  const { report, getReportById, loading, getResumePdf, pdfLoading, pdfError } = useInterview();
  const [activeSection, setActiveSection] = useState("technical");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId, getReportById]);

  if (!report) {
    return (
      <div className="no-report">
        <h2>No interview report found</h2>
        <Link to="/home" className="back-link">
          Go to Home
        </Link>
      </div>
    );
  }

  const getSeverityColors = (severity) => {
    switch (severity?.toLowerCase()) {
      case "high":
        return { bg: "#7f1d1d", border: "#dc2626", color: "#fca5a5" };
      case "medium":
        return { bg: "#78350f", border: "#d97706", color: "#fcd34d" };
      case "low":
        return { bg: "#14532d", border: "#16a34a", color: "#86efac" };
      default:
        return { bg: "#2a2a2a", border: "#555", color: "#aaa" };
    }
  };
  const getMatchLabel = (score) => {
    if (score >= 80) return "Strong match for this role";
    if (score >= 60) return "Good match for this role";
    if (score >= 40) return "Moderate match for this role";
    return "Low match for this role";
  };
  const getMatchColor = (score) => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#f59e0b";
    return "#e1034d";
  };
  const activeQuestions =
    activeSection === "technical"
      ? report.technicalQuestions
      : activeSection === "behavioural"
        ? report.behaviouralQuestions
        : null;
  const sectionTitle =
    activeSection === "technical"
      ? "Technical Questions"
      : activeSection === "behavioural"
        ? "Behavioral Questions"
        : "Road Map";
  const toggleAccordion = (index) =>
    setExpandedIndex(expandedIndex === index ? null : index);
  return (
    <div className="interview-layout">
      {/* ── Left Sidebar ── */}
      <aside className="iv-sidebar">
        <p className="sidebar-label">SECTIONS</p>
        <nav className="sidebar-nav">
          {NAV_SECTIONS.map((s) => (
            <button
              key={s.id}
              className={`nav-item ${activeSection === s.id ? "active" : ""}`}
              onClick={() => {
                setActiveSection(s.id);
                setExpandedIndex(null);
              }}
            >
              <span className="nav-icon">{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          {pdfError && <p className="pdf-error">{pdfError}</p>}
          <button
            className={`download-resume-btn ${pdfLoading ? "loading" : ""}`}
            onClick={() => getResumePdf(interviewId)}
            disabled={pdfLoading}
            title={pdfLoading ? "Generating PDF…" : "Download Resume PDF"}
          >
            <span className="btn-icon">
              {pdfLoading ? <span className="spinner" /> : "📄"}
            </span>
            <span>{pdfLoading ? "Generating…" : "Download Resume PDF"}</span>
          </button>
        </div>
      </aside>
      {/* ── Main Content ── */}
      <main className="iv-main">
        <div className="section-header">
          <h2>{sectionTitle}</h2>
          {activeQuestions && (
            <span className="question-count">
              {activeQuestions.length} questions
            </span>
          )}
        </div>
        {/* Questions accordion */}
        {activeSection !== "roadmap" &&
          (activeQuestions?.length > 0 ? (
            <div className="accordion-list">
              {activeQuestions.map((q, i) => (
                <div
                  key={i}
                  className={`accordion-item ${expandedIndex === i ? "expanded" : ""}`}
                >
                  <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(i)}
                  >
                    <span className="q-badge">Q{i + 1}</span>
                    <span className="q-text">{q.question}</span>
                    <span
                      className={`chevron ${expandedIndex === i ? "open" : ""}`}
                    >
                      ›
                    </span>
                  </button>
                  {expandedIndex === i && (
                    <div className="accordion-body">
                      <p>
                        <span className="body-label">Intent:</span>{" "}
                        {q.intension}
                      </p>
                      <p>
                        <span className="body-label">Answer:</span> {q.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No questions available</p>
          ))}
        {/* Road Map */}
        {activeSection === "roadmap" &&
          (report.preparationPlan?.length > 0 ? (
            <div className="roadmap-list">
              {report.preparationPlan.map((day, i) => (
                <div key={i} className="roadmap-day">
                  <div className="day-header">
                    <span className="day-badge">Day {day.day}</span>
                    <span className="day-focus">{day.focus}</span>
                  </div>
                  <ul className="day-tasks">
                    {day.tasks?.map((task, j) => (
                      <li key={j}>{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No preparation plan available</p>
          ))}
      </main>
      {/* ── PDF Loading Overlay ── */}
      {pdfLoading && (
        <div className="pdf-loading-overlay">
          <div className="pdf-loading-card">
            <div className="pdf-overlay-spinner" />
            <p className="pdf-overlay-title">Generating your Resume…</p>
            <p className="pdf-overlay-sub">This may take a few seconds. Please wait.</p>
          </div>
        </div>
      )}

      {/* ── Right Sidebar ── */}
      <aside className="iv-right">
        <p className="sidebar-label">MATCH SCORE</p>
        <div className="score-wrapper">
          <CircularScore score={report.matchScore || 0} />
          <p
            className="score-label"
            style={{ color: getMatchColor(report.matchScore) }}
          >
            {getMatchLabel(report.matchScore)}
          </p>
        </div>
        <p className="sidebar-label gap-top">SKILL GAPS</p>
        <div className="skill-gaps">
          {report.skillsGap?.length > 0 ? (
            report.skillsGap.map((skill, i) => {
              const c = getSeverityColors(skill.severity);
              return (
                <span
                  key={i}
                  className="skill-badge"
                  style={{
                    backgroundColor: c.bg,
                    borderColor: c.border,
                    color: c.color,
                  }}
                >
                  {skill.skill}
                </span>
              );
            })
          ) : (
            <p className="no-data">No skill gaps identified</p>
          )}
        </div>
      </aside>
    </div>
  );
};
export default Interview;
