import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Projects = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  const projects = [
    {
      id: 1,
      title: 'Road Development Project',
      description: 'Construction and maintenance of rural roads connecting villages',
      location: 'Multiple Villages',
      budget: '₹1.5 Crore',
      timeline: 'Jan 2024 - Jun 2024',
      status: 'In Progress',
      completion: '45%'
    },
    {
      id: 2,
      title: 'Community Water Treatment Plant',
      description: 'Installation of water purification system for clean drinking water',
      location: 'Central Village Area',
      budget: '₹75 Lakhs',
      timeline: 'Mar 2024 - Aug 2024',
      status: 'Planning Phase',
      completion: '10%'
    },
    {
      id: 3,
      title: 'Solar Street Lighting',
      description: 'Installation of solar-powered street lights for energy conservation',
      location: 'All Village Roads',
      budget: '₹50 Lakhs',
      timeline: 'Apr 2024 - Jul 2024',
      status: 'Upcoming',
      completion: '0%'
    },
    {
      id: 4,
      title: 'Primary School Renovation',
      description: 'Upgrading facilities and infrastructure of village primary school',
      location: 'Village Primary School',
      budget: '₹35 Lakhs',
      timeline: 'May 2024 - Aug 2024',
      status: 'Approved',
      completion: '0%'
    }
  ];

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
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-details">
                  <p><strong>Location:</strong> {project.location}</p>
                  <p><strong>Budget:</strong> {project.budget}</p>
                  <p><strong>Timeline:</strong> {project.timeline}</p>
                  <p><strong>Status:</strong> <span className="status-badge">{project.status}</span></p>
                </div>
                <div className="project-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: project.completion }}
                    ></div>
                  </div>
                  <span className="progress-text">{project.completion} Complete</span>
                </div>
                <div className="project-actions">
                  <button className="primary-button">View Details</button>
                  <button className="secondary-button">Submit Feedback</button>
                </div>
              </div>
            ))}
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