import React, { useEffect } from "react";
import "../style/home.scss";
import { useState, useRef } from "react";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";

const Home = () => {
  const [jobDescription, setJobDescription] = useState("");
  const resumeInputRef = useRef(null);
  const navigate = useNavigate();
  const [selfDescription, setSelfDescription] = useState("");

  const { loading, generateReport, reports, getAllReports } = useInterview();

  const handleSubmit = async (e) => {
    e.preventDefault(); // ? doubtt - should we prevent default form submission behavior here since we're handling it with React?

    const resumeFile = resumeInputRef.current.files[0];

    if (!jobDescription || !selfDescription || !resumeFile) {
      alert("Please fill in all fields and upload your resume.");
      return;
    }

    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });
    navigate(`/interview/${data.report._id}`);
  };

  useEffect(() => {
    // Fetch all previous reports when the component mounts
    // This will allow us to display the list of previous reports on the home page
    // We can also consider fetching only a limited number of recent reports for better performance
    // For example, we could fetch the 5 most recent reports instead of all reports
    // This would require an update to the backend API to support pagination or limiting results
    // For now, we'll fetch all reports and handle any performance issues later if needed
    getAllReports();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return (
      <div className="loading">
        <p>Generating interview report...</p>
      </div>
    );
  }

  // Helper to extract job title from job description
const extractJobTitle = (jobDesc) => {
  if (!jobDesc) return "Interview Report";
  // Find first non-empty line as the job title
  const firstLine = jobDesc.split("\n").map((l) => l.trim()).find((l) => l.length > 0) || "";
  if (!firstLine) return "Interview Report";
  return firstLine.length > 60 ? firstLine.substring(0, 60) + "..." : firstLine;
};

  return (
    <main className="home">
      <div className="interview-input-group">
        {" "}
        <div className="left">
          <textarea
            name="jobDescription"
            id="jobDescription"
            placeholder="Paste the job description here..."
            rows="10"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="right">
          <div className="input-group">
            <label className="file-label" htmlFor="resume">
              Upload your resume:
            </label>
            <input
              ref={resumeInputRef}
              type="file"
              id="resume"
              name="resume"
              accept=".pdf"
            />
          </div>
          <div className="input-group">
            <label htmlFor="selfDescription">Self Description:</label>
            <textarea
              name="selfDescription"
              id="selfDescription"
              placeholder="Write a brief self description here..."
              rows="10"
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
            ></textarea>
          </div>
          <button className="submit-btn" onClick={handleSubmit}>
            Generate Interview Report
          </button>
        </div>
      </div>

      {reports?.length > 0 && (
        <div className="previous-reports">
          <h2>Previous Interview Reports</h2>
          <div className="reports-grid">
            {reports.map((report) => (
              <div
                key={report._id}
                className="report-card"
                onClick={() => navigate(`/interview/${report._id}`)}
              >
                <div className="report-card-header">
                  <span className="job-title">
                    {extractJobTitle(report.title)}
                  </span>
                  {report.matchScore !== undefined && (
                    <span
                      className={`match-score ${report.matchScore >= 70 ? "high" : report.matchScore >= 40 ? "medium" : "low"}`}
                    >
                      {report.matchScore}%
                    </span>
                  )}
                </div>
                <div className="report-card-meta">
                  <span className="date">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {new Date(report.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="report-card-footer">
                  <span className="view-report">View Report →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
