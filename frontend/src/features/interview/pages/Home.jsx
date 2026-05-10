import React from "react";
import "../style/home.scss";
import { useState } from "react";

const Home = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState(null);
  const [selfDescription, setSelfDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, such as sending the data to the backend API
    console.log("Job Description:", jobDescription);
    console.log("Resume:", resume);
    console.log("Self Description:", selfDescription);
  };

  return (
    <main className="home">
      <div className="interview-input-group" >
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
            <label className="file-label" htmlFor="resume">Upload your resume:</label>
            <input type="file" id="resume" name="resume" accept=".pdf" onChange={(e) => setResume(e.target.files[0])} />
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
