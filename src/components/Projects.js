import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/axios';
import './Dashboard.css';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Feedback states
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/');
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/api/projects");
        setProjects(res.data);
      } catch (err) {
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProjectId) {
      setErrorMsg("Please select a project.");
      return;
    }
    if (!feedbackText.trim()) {
      setErrorMsg("Please enter your feedback.");
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const res = await api.post(`/api/projects/${selectedProjectId}/feedback`, {
        feedbackText: feedbackText.trim()
      });
      setSuccessMsg(res.data.message || "Feedback submitted successfully!");
      setFeedbackText('');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to submit feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading projects...</p>
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
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <nav className="sidebar-menu">
            <ul>
              <li className="menu-item" onClick={() => handleNavigation('/dashboard/citizen')}>Dashboard</li>
              <li className="menu-item" onClick={() => handleNavigation('/schemes')}>Available Schemes</li>
              <li className="menu-item" onClick={() => handleNavigation('/jobs')}>Jobs Available</li>
              <li className="menu-item" onClick={() => handleNavigation('/agriculture')}>Agricultural Connect</li>
              <li className="menu-item active" onClick={() => handleNavigation('/projects')}>Projects</li>
              <li className="menu-item" onClick={() => handleNavigation('/crowdfunding')}>Crowd Funding</li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <div className="welcome-section">
            <h2>Community Projects</h2>
            <p>Track progress of ongoing development projects in your area.</p>
          </div>

          <div className="projects-list">
            {projects.length === 0 ? (
              <p>No projects available at the moment.</p>
            ) : (
              projects.map(project => (
                <div key={project._id} className="project-card">
                  <h3>{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-details">
                    <p><strong>Location:</strong> {project.location}</p>
                    <p><strong>Budget:</strong> {project.budget}</p>
                    <p><strong>Timeline:</strong> {project.startDate} - {project.endDate}</p>
                    <p><strong>Contractor:</strong> {project.contractor}</p>
                    <p><strong>Status:</strong> <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>{project.status}</span></p>
                  </div>
                  <div className="project-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: project.progress }}
                      ></div>
                    </div>
                    <span className="progress-text">{project.progress} Complete</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {!showFeedbackForm ? (
            <div className="report-section" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', marginTop: '2rem' }}>
              <h3>Have concerns about a project?</h3>
              <p style={{ color: '#7f8c8d', marginBottom: '1.2rem' }}>Submit your feedback or report issues to help us improve.</p>
              <button 
                className="primary-button" 
                style={{ width: 'auto', marginTop: 0, padding: '0.8rem 2rem' }}
                onClick={() => {
                  setShowFeedbackForm(true);
                  setSuccessMsg(null);
                  setErrorMsg(null);
                  setFeedbackText('');
                  if (projects.length > 0) {
                    setSelectedProjectId(projects[0]._id);
                  }
                }}
              >
                Submit Report / Feedback
              </button>
            </div>
          ) : (
            <div className="report-section" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', marginTop: '2rem' }}>
              <h3>Submit Project Feedback</h3>
              {successMsg && <p style={{ color: '#27ae60', fontSize: '14px', marginBottom: '15px', fontWeight: '500' }}>{successMsg}</p>}
              {errorMsg && <p style={{ color: '#c0392b', fontSize: '14px', marginBottom: '15px', fontWeight: '500' }}>{errorMsg}</p>}
              
              <form onSubmit={handleFeedbackSubmit}>
                <div style={{ marginBottom: '1.2rem' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#2c3e50' }}>Select Project</label>
                  <select 
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #bdc3c7', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }}
                  >
                    <option value="">-- Choose a project --</option>
                    {projects.map(p => (
                      <option key={p._id} value={p._id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#2c3e50' }}>Feedback / Concern</label>
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Describe your concerns or suggestions for this project..."
                    required
                    rows={4}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #bdc3c7', fontSize: '1rem', boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    type="submit" 
                    className="primary-button" 
                    disabled={submitting}
                    style={{ marginTop: 0, width: 'auto', padding: '0.8rem 2rem' }}
                  >
                    {submitting ? 'Submitting...' : 'Submit'}
                  </button>
                  <button 
                    type="button" 
                    className="secondary-button" 
                    style={{ marginTop: 0, width: 'auto', padding: '0.8rem 2rem' }}
                    onClick={() => setShowFeedbackForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Projects;