import React from "react";
import "../style/home.scss";
import { useState, useRef } from "react";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";

const Home = () => {
  const [jobDescription, setJobDescription] = useState("");
  const resumeInputRef = useRef(null);
  const navigate = useNavigate();
  const [selfDescription, setSelfDescription] = useState("");

  const { loading, generateReport } = useInterview();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    navigate(`/interview/${data._id}`);
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
              onChange={(e) => setResume(e.target.files[0])}
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
    </main>
  );
};

export default Home;
