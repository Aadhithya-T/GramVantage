import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/axios";
import "./Dashboard.css";

const AvailableSchemes = () => {
  const navigate = useNavigate();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applyStatus, setApplyStatus] = useState({});

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const res = await api.get("/api/schemes");
        setSchemes(res.data);
      } catch (err) {
        setError("Failed to load schemes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchSchemes();
  }, []);

  const handleApply = async (schemeId) => {
    setApplyStatus((prev) => ({ ...prev, [schemeId]: "loading" }));
    try {
      await api.post(`/api/schemes/${schemeId}/apply`);
      setApplyStatus((prev) => ({ ...prev, [schemeId]: "success" }));
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to apply";
      setApplyStatus((prev) => ({ ...prev, [schemeId]: msg }));
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading schemes...</p>
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
              <li
                className="menu-item active"
                onClick={() => navigate("/schemes")}
              >
                Available Schemes
              </li>
              <li className="menu-item" onClick={() => navigate("/jobs")}>
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
            <h2>Available Schemes</h2>
            <p>
              Explore and apply for local village schemes available for your
              benefit.
            </p>
          </div>

          <div className="schemes-list">
            {schemes.length === 0 ? (
              <p>No schemes available at the moment.</p>
            ) : (
              schemes.map((scheme) => (
                <div key={scheme._id} className="scheme-card">
                  <h3>{scheme.name}</h3>
                  <p className="scheme-description">{scheme.description}</p>
                  <div className="scheme-details">
                    <p>
                      <strong>Eligibility:</strong> {scheme.eligibility}
                    </p>
                    <p>
                      <strong>Deadline:</strong> {scheme.deadline}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className="status-badge">{scheme.status}</span>
                    </p>
                  </div>
                  {scheme.status === "Closed" ? (
                    <button
                      className="apply-button"
                      disabled
                      style={{ opacity: 0.5, cursor: "not-allowed" }}
                    >
                      Scheme Closed
                    </button>
                  ) : applyStatus[scheme._id] === "success" ? (
                    <button
                      className="apply-button"
                      disabled
                      style={{ backgroundColor: "#27ae60" }}
                    >
                      Applied Successfully
                    </button>
                  ) : applyStatus[scheme._id] === "loading" ? (
                    <button className="apply-button" disabled>
                      Applying...
                    </button>
                  ) : applyStatus[scheme._id] ? (
                    <div>
                      <p style={{ color: "red", fontSize: "13px" }}>
                        {applyStatus[scheme._id]}
                      </p>
                      <button
                        className="apply-button"
                        onClick={() => handleApply(scheme._id)}
                      >
                        Try Again
                      </button>
                    </div>
                  ) : (
                    <button
                      className="apply-button"
                      onClick={() => handleApply(scheme._id)}
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AvailableSchemes;
