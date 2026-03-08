import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/axios";
import "./Dashboard.css";

const JobsAvailable = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/api/jobs");
        setJobs(res.data);
      } catch (err) {
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <img src="/logo.png" alt="Logo" className="logo" />
          <h1 className="app-name">GramVantage</h1>
        </div>
        <div className="header-right">
          <span className="user-profile">👤</span>
          <button
            className="logout-button"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userType");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <nav className="sidebar-menu">
            <ul>
              <li
                className="menu-item"
                onClick={() => navigate("/dashboard/citizen")}
              >
                Dashboard
              </li>
              <li className="menu-item" onClick={() => navigate("/schemes")}>
                Available Schemes
              </li>
              <li
                className="menu-item active"
                onClick={() => navigate("/jobs")}
              >
                Jobs Available
              </li>
              <li
                className="menu-item"
                onClick={() => navigate("/agriculture")}
              >
                Agricultural Connect
              </li>
              <li className="menu-item" onClick={() => navigate("/projects")}>
                Projects
              </li>
              <li
                className="menu-item"
                onClick={() => navigate("/crowdfunding")}
              >
                Crowd Funding
              </li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <div className="welcome-section">
            <h2>Available Jobs</h2>
            <p>
              Explore employment opportunities in your local government and
              community.
            </p>
          </div>

          <div className="jobs-list">
            {jobs.length === 0 ? (
              <p>No jobs available at the moment.</p>
            ) : (
              jobs.map((job) => (
                <div key={job._id} className="job-card">
                  <h3>{job.title}</h3>
                  <div className="job-header">
                    <span className="department">{job.department}</span>
                    <span className="job-type">{job.type}</span>
                    <span
                      className={`status-badge ${job.status.toLowerCase()}`}
                    >
                      {job.status}
                    </span>
                  </div>
                  <div className="job-details">
                    <p>
                      <strong>Location:</strong> {job.location}
                    </p>
                    <p>
                      <strong>Salary:</strong> {job.salary}
                    </p>
                    <p>
                      <strong>Requirements:</strong> {job.requirements}
                    </p>
                    <p>
                      <strong>Application Deadline:</strong> {job.deadline}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobsAvailable;
