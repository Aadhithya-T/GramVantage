import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const AvailableSchemes = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  const schemes = [
    {
      id: 1,
      name: 'PM Kishan Saman Nidhi',
      description: 'Provides direct income support to small and marginal farmers through bank transfers',
      eligibility: 'Farmers with cultivable land',
      deadline: 'Ongoing',
      status: 'Open',
      portalUrl: 'https://pmkisan.gov.in/'
    },
    {
      id: 2,
      name: 'National Rural Health Mission',
      description: 'Aims to provide accessible, affordable, and quality healthcare to rural populations',
      eligibility: 'All Rural Residents',
      deadline: 'Ongoing',
      status: 'Open',
      portalUrl: 'https://nhm.gov.in/'
    },
    {
      id: 3,
      name: 'Sarva Shiksha Abhyan',
      description: 'Focused on universalizing elementary education for all children',
      eligibility: 'Students of age 6-14',
      deadline: 'Ongoing',
      status: 'Open',
      portalUrl: 'https://www.education.gov.in/en/ssa'
    }
  ];

  const handleApply = (scheme) => {
    if (window.confirm(`You will be redirected to ${scheme.name}'s official portal. Do you want to continue?`)) {
      window.open(scheme.portalUrl, '_blank', 'noopener,noreferrer');
    }
  };

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
              <li className="menu-item active" onClick={() => handleNavigation('/schemes')}>Available Schemes</li>
              <li className="menu-item" onClick={() => handleNavigation('/jobs')}>Jobs Available</li>
              <li className="menu-item" onClick={() => handleNavigation('/agriculture')}>Agricultural connect</li>
              <li className="menu-item" onClick={() => handleNavigation('/projects')}>Projects</li>
              <li className="menu-item" onClick={() => handleNavigation('/crowdfunding')}>Crowd Funding</li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <div className="welcome-section">
            <h2>Available Schemes</h2>
            <p>Explore and apply for various government schemes available for your benefit.</p>
          </div>

          <div className="schemes-list">
            {schemes.map(scheme => (
              <div key={scheme.id} className="scheme-card">
                <h3>{scheme.name}</h3>
                <p className="scheme-description">{scheme.description}</p>
                <div className="scheme-details">
                  <p><strong>Eligibility:</strong> {scheme.eligibility}</p>
                  <p><strong>Deadline:</strong> {scheme.deadline}</p>
                  <p><strong>Status:</strong> <span className="status-badge">{scheme.status}</span></p>
                </div>
                <button className="apply-button" onClick={() => handleApply(scheme)}>Apply Now</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AvailableSchemes;