import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/axios';
import './Dashboard.css';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              <li className="menu-item" onClick={() => handleNavigation('/agriculture')}>Agricultural connect</li>
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

          <div className="report-section">
            <h3>Have concerns about a project?</h3>
            <p>Submit your feedback or report issues to help us improve.</p>
            <button className="report-button">Submit Report</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;