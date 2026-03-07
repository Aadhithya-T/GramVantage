import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const PendingApplications = () => {
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

  const applications = [
    {
      id: 1,
      applicantName: 'Rajesh Kumar',
      schemeType: 'Rural Housing Support',
      submissionDate: '2024-02-15',
      status: 'Pending Review',
      priority: 'High'
    },
    {
      id: 2,
      applicantName: 'Priya Singh',
      schemeType: 'Agricultural Subsidy',
      submissionDate: '2024-02-14',
      status: 'Document Verification',
      priority: 'Medium'
    },
    {
      id: 3,
      applicantName: 'Mohammed Ali',
      schemeType: 'Education Grant',
      submissionDate: '2024-02-13',
      status: 'Pending Review',
      priority: 'High'
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
          <div className="profile-container">
            <span className="user-profile" onClick={toggleProfileMenu}>👤</span>
            {showProfileMenu && (
              <div className="profile-menu">
                <div className="profile-info">
                  <p>Welcome!</p>
                  <p>Official User</p>
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
            <li className="menu-item" onClick={() => navigate('/dashboard/official')}>Dashboard</li>
              <li className="menu-item active" onClick={() => navigate('/project-management')}>Project and Budget analysis</li>
              <li className="menu-item" onClick={() => navigate('/scheme-admin')}>Scheme Administration</li>
              <li className="menu-item" onClick={() => navigate('/collaboration')}>Collaboration</li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <div className="welcome-section">
            <h2>Pending Applications</h2>
            <p>Review and process citizen applications for various schemes.</p>
          </div>

          <div className="applications-filters">
            <select className="filter-select">
              <option value="all">All Applications</option>
              <option value="pending">Pending Review</option>
              <option value="verification">Document Verification</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <select className="filter-select">
              <option value="all">All Schemes</option>
              <option value="housing">Housing Support</option>
              <option value="agriculture">Agricultural Subsidy</option>
              <option value="education">Education Grant</option>
            </select>
          </div>

          <div className="applications-list">
            {applications.map(application => (
              <div key={application.id} className="application-card">
                <div className="application-header">
                  <h3>{application.applicantName}</h3>
                  <span className={`priority-badge ${application.priority.toLowerCase()}`}>
                    {application.priority} Priority
                  </span>
                </div>
                <div className="application-details">
                  <p><strong>Scheme:</strong> {application.schemeType}</p>
                  <p><strong>Submission Date:</strong> {application.submissionDate}</p>
                  <p><strong>Status:</strong> <span className="status-badge">{application.status}</span></p>
                </div>
                <div className="application-actions">
                  <button className="view-button">View Details</button>
                  <button className="approve-button">Approve</button>
                  <button className="reject-button">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PendingApplications;