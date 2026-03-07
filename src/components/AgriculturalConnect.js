import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const AgriculturalConnect = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  const resources = [
    {
      id: 1,
      title: 'Soil Testing Service',
      description: 'Get your soil tested for optimal crop selection and fertilizer recommendations',
      availability: 'Available at Local Agriculture Office',
      timeline: 'Results within 7 working days',
      status: 'Available'
    },
    {
      id: 2,
      title: 'Crop Advisory Services',
      description: 'Expert guidance on crop selection, pest management, and farming practices',
      availability: 'Online and In-person consultation',
      timeline: 'Weekly sessions',
      status: 'Available'
    },
    {
      id: 3,
      title: 'Modern Equipment Rental',
      description: 'Access to modern farming equipment at subsidized rates',
      availability: 'Subject to availability',
      timeline: 'Book 3 days in advance',
      status: 'Limited Availability'
    },
    {
      id: 4,
      title: 'Organic Farming Workshop',
      description: 'Learn organic farming techniques and certification process',
      availability: 'Monthly workshops',
      timeline: 'Next session on April 15, 2024',
      status: 'Registration Open'
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
              <li className="menu-item active" onClick={() => handleNavigation('/agriculture')}>Agricultural connect</li>
              <li className="menu-item" onClick={() => handleNavigation('/projects')}>Projects</li>
              <li className="menu-item" onClick={() => handleNavigation('/crowdfunding')}>Crowd Funding</li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <div className="welcome-section">
            <h2>Agricultural Connect</h2>
            <p>Access agricultural resources, expert advice, and modern farming solutions.</p>
          </div>

          <div className="resources-list">
            {resources.map(resource => (
              <div key={resource.id} className="resource-card">
                <h3>{resource.title}</h3>
                <p className="resource-description">{resource.description}</p>
                <div className="resource-details">
                  <p><strong>Availability:</strong> {resource.availability}</p>
                  <p><strong>Timeline:</strong> {resource.timeline}</p>
                  <p><strong>Status:</strong> <span className="status-badge">{resource.status}</span></p>
                </div>
                <div className="resource-actions">
                  <button className="primary-button">Book Now</button>
                  <button className="secondary-button">Learn More</button>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-section">
            <h3>Need Assistance?</h3>
            <p>Contact your local agricultural officer or visit the nearest agriculture office.</p>
            <button className="contact-button">Contact Agriculture Office</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgriculturalConnect;