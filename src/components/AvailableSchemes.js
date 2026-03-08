import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/axios";
import "./Dashboard.css";

const AvailableSchemes = () => {
  const navigate = useNavigate();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleApply = (scheme) => {
    if (
      window.confirm(
        `You will be redirected to ${scheme.name}'s official portal. Do you want to continue?`,
      )
    ) {
      window.open(scheme.portalUrl, "_blank", "noopener,noreferrer");
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
          <button className="logout-button">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <nav className="sidebar-menu">
            <ul>
              <li
                className="menu-item"
                onClick={() => handleNavigation("/dashboard/citizen")}
              >
                Dashboard
              </li>
              <li
                className="menu-item active"
                onClick={() => handleNavigation("/schemes")}
              >
                Available Schemes
              </li>
              <li
                className="menu-item"
                onClick={() => handleNavigation("/jobs")}
              >
                Jobs Available
              </li>
              <li
                className="menu-item"
                onClick={() => handleNavigation("/agriculture")}
              >
                Agricultural Connect
              </li>
              <li
                className="menu-item"
                onClick={() => handleNavigation("/projects")}
              >
                Projects
              </li>
              <li
                className="menu-item"
                onClick={() => handleNavigation("/crowdfunding")}
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
              Explore and apply for various government schemes available for
              your benefit.
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
                  <button
                    className="apply-button"
                    onClick={() => handleApply(scheme)}
                  >
                    Apply Now
                  </button>
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
