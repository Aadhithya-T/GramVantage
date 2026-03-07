import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const CitizenDashboard = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/');
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <img src="/public/logo192.png" alt="Logo" className="logo" />
          <h1 className="app-name">GramVantage</h1>
        </div>
        <div className="header-right">
          <div className="profile-container">
            <span className="user-profile" onClick={toggleProfileMenu}>👤</span>
            {showProfileMenu && (
              <div className="profile-menu">
                <div className="profile-info">
                  <p>Welcome!</p>
                  <p>Citizen User</p>
                </div>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <nav className="sidebar-menu">
            <ul>
              <li className="menu-item active" onClick={() => handleNavigation('/dashboard/citizen')}>Dashboard</li>
              <li className="menu-item" onClick={() => handleNavigation('/schemes')}>Available Schemes</li>
              <li className="menu-item" onClick={() => handleNavigation('/jobs')}>Jobs Available</li>
              <li className="menu-item" onClick={() => handleNavigation('/agriculture')}>Agricultural connect</li>
              <li className="menu-item" onClick={() => handleNavigation('/projects')}>Projects</li>
              <li className="menu-item" onClick={() => handleNavigation('/crowdfunding')}>Crowd Funding</li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <div className="welcome-section">
            <h2>Welcome, Citizen!</h2>
            <p>Access government schemes and services with ease.</p>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card" onClick={() => handleNavigation('/schemes')}>
              <h3>Available Schemes</h3>
              <div className="card-content">
                <p className="stat">3</p>
                <p>Applications in progress</p>
              </div>
            </div>

            <div className="dashboard-card" onClick={() => handleNavigation('/jobs')}>
              <h3>Jobs Available</h3>
              <div className="card-content">
                <p className="stat">12</p>
                <p>Schemes you may be eligible for</p>
              </div>
            </div>

            <div className="dashboard-card" onClick={() => handleNavigation('/agriculture')}>
              <h3>Agricultural Connect</h3>
              <div className="card-content">
                <p className="stat">2</p>
                <p>Documents requiring attention</p>
              </div>
            </div>

            <div className="dashboard-card" onClick={() => handleNavigation('/projects')}>
              <h3>Projects</h3>
              <div className="card-content">
                <p className="stat">1</p>
                <p>Open complaints or requests</p>
              </div>
            </div>
          </div>

          <div className="recent-activity">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-date">Today</span>
                <p>Your application for Agricultural Subsidy has been approved</p>
              </div>
              <div className="activity-item">
                <span className="activity-date">Yesterday</span>
                <p>New scheme announcement: Rural Housing Support</p>
              </div>
              <div className="activity-item">
                <span className="activity-date">3 days ago</span>
                <p>Document verification completed for Education Grant</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CitizenDashboard;