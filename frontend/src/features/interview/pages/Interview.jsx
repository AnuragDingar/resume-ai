import React from "react";
import { useLocation, Link } from "react-router";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview";


const Interview = () => {

  const { report } = useInterview();
  
  if (!report) {
    return (
      <div className="no-report">
        <h2>No interview report found</h2>
        <Link to="/home" className="back-link">Go to Home</Link>
      </div>
    );
  }
  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case "high": return "#e1034d";
      case "medium": return "#f59e0b";
      case "low": return "#10b981";
      default: return "#888";
    }
  };
  return (
    <main className="interview-report">
      <div className="report-header">
        <h1>Interview Report</h1>
        <Link to="/home" className="back-btn">← Back to Home</Link>
      </div>
      {/* Match Score */}
      <section className="score-section">
        <div className="score-card">
          <h2>Match Score</h2>
          <div className="score-circle">
            <span className="score-value">{report.matchScore || 0}</span>
            <span className="score-label">/ 100</span>
          </div>
        </div>
      </section>
      {/* Technical Questions */}
      <section className="questions-section">
        <h2>Technical Questions</h2>
        {report.technicalQuestions?.length > 0 ? (
          <div className="questions-grid">
            {report.technicalQuestions.map((q, index) => (
              <div key={index} className="question-card">
                <div className="question-header">
                  <span className="q-number">Q{index + 1}</span>
                  <h3>{q.question}</h3>
                </div>
                <div className="question-body">
                  <p><strong>Intension:</strong> {q.intension}</p>
                  <p><strong>Answer:</strong> {q.answer}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">No technical questions available</p>
        )}
      </section>
      {/* Behavioural Questions */}
      <section className="questions-section">
        <h2>Behavioural Questions</h2>
        {report.behaviouralQuestions?.length > 0 ? (
          <div className="questions-grid">
            {report.behaviouralQuestions.map((q, index) => (
              <div key={index} className="question-card">
                <div className="question-header">
                  <span className="q-number">Q{index + 1}</span>
                  <h3>{q.question}</h3>
                </div>
                <div className="question-body">
                  <p><strong>Intension:</strong> {q.intension}</p>
                  <p><strong>Answer:</strong> {q.answer}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">No behavioural questions available</p>
        )}
      </section>
      {/* Skills Gap */}
      <section className="skills-section">
        <h2>Skills Gap</h2>
        {report.skillsGap?.length > 0 ? (
          <div className="skills-list">
            {report.skillsGap.map((skill, index) => (
              <div key={index} className="skill-item">
                <span className="skill-name">{skill.skill}</span>
                <span 
                  className="skill-severity"
                  style={{ backgroundColor: getSeverityColor(skill.severity) }}
                >
                  {skill.severity}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">No skill gaps identified</p>
        )}
      </section>
      {/* Preparation Plan */}
      <section className="plan-section">
        <h2>Preparation Plan</h2>
        {report.preparationPlan?.length > 0 ? (
          <div className="plan-timeline">
            {report.preparationPlan.map((day, index) => (
              <div key={index} className="plan-day">
                <div className="day-header">
                  <span className="day-number">Day {day.day}</span>
                  <span className="day-focus">{day.focus}</span>
                </div>
                <ul className="day-tasks">
                  {day.tasks?.map((task, taskIndex) => (
                    <li key={taskIndex}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">No preparation plan available</p>
        )}
      </section>
    </main>
  );
};
export default Interview;