import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const CrowdFunding = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const campaigns = [
    {
      id: 1,
      title: 'Community Library Building',
      description: 'Help us build a library to promote education in our village',
      target: '₹5,00,000',
      collected: '₹3,25,000',
      contributors: 145,
      deadline: '2024-04-30',
      progress: '65%',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Clean Water Initiative',
      description: 'Installing water purification systems in rural areas',
      target: '₹3,00,000',
      collected: '₹2,40,000',
      contributors: 98,
      deadline: '2024-05-15',
      progress: '80%',
      status: 'Active'
    },
    {
      id: 3,
      title: 'Sports Equipment for Youth',
      description: 'Providing sports equipment for village youth center',
      target: '₹1,50,000',
      collected: '₹75,000',
      contributors: 52,
      deadline: '2024-06-01',
      progress: '50%',
      status: 'Active'
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
              <li className="menu-item" onClick={() => handleNavigation('/projects')}>Projects</li>
              <li className="menu-item active" onClick={() => handleNavigation('/crowdfunding')}>Crowd Funding</li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <div className="welcome-section">
            <h2>Community Crowd Funding</h2>
            <p>Support local initiatives and help build a better community together.</p>
          </div>

          <div className="campaigns-list">
            {campaigns.map(campaign => (
              <div key={campaign.id} className="campaign-card">
                <h3>{campaign.title}</h3>
                <p className="campaign-description">{campaign.description}</p>
                <div className="campaign-stats">
                  <div className="stat-item">
                    <span className="stat-label">Target Amount:</span>
                    <span className="stat-value">{campaign.target}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Collected:</span>
                    <span className="stat-value">{campaign.collected}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Contributors:</span>
                    <span className="stat-value">{campaign.contributors}</span>
                  </div>
                </div>
                <div className="campaign-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: campaign.progress }}
                    ></div>
                  </div>
                  <span className="progress-text">{campaign.progress}</span>
                </div>
                <div className="campaign-footer">
                  <p><strong>Deadline:</strong> {campaign.deadline}</p>
                  <p><strong>Status:</strong> <span className="status-badge">{campaign.status}</span></p>
                </div>
                <button className="contribute-button">Contribute Now</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CrowdFunding;