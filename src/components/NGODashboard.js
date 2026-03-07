import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import './ProgramModal.css';
import CommunityNetwork from './CommunityNetwork';

const NGODashboard = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const programs = [
    {
      id: 1,
      title: 'Skill Development Program',
      description: 'Empowering youth through vocational training and skill development workshops.',
      participants: 150,
      duration: '6 months',
      status: 'Active',
      impact: 'Improved employability for local youth'
    },
    {
      id: 2,
      title: 'Community Health Initiative',
      description: 'Providing healthcare services and awareness programs in rural areas.',
      participants: 300,
      duration: 'Ongoing',
      status: 'Active',
      impact: 'Better healthcare access for 5 villages'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/');
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };
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
                  <p>NGO User</p>
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
              <li className="menu-item active" onClick={() => navigate('/dashboard/ngo')}>Dashboard</li>
              <li className="menu-item" onClick={() => navigate('/programs')}>Programs</li>
              <li className="menu-item" onClick={() => navigate('/ngo-collaboration')}>Collaborations among NGO</li>
              <li className="menu-item" onClick={() => navigate('/community')}>Community Network</li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <div className="welcome-section">
            <h2>Welcome, NGO Partner!</h2>
            <p>Collaborate and create positive impact in the community.</p>
          </div>

          <div className="dashboard-grid">
            {programs.map(program => (
              <div 
                key={program.id} 
                className="dashboard-card program-card" 
                onClick={() => {
                  setSelectedProgram(program);
                  setShowModal(true);
                }}
              >
                <h3>{program.title}</h3>
                <div className="card-content">
                  <p className="stat">{program.participants}</p>
                  <p>Active Participants</p>
                  <p className="program-status">{program.status}</p>
                </div>
              </div>
            ))}
          </div>

          {showModal && selectedProgram && (
            <div className="modal-overlay" onClick={() => setShowModal(false)}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
                <h2>{selectedProgram.title}</h2>
                <div className="program-details">
                  <p className="program-description">{selectedProgram.description}</p>
                  <div className="program-stats">
                    <div className="stat-item">
                      <span className="stat-label">Participants:</span>
                      <span className="stat-value">{selectedProgram.participants}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Duration:</span>
                      <span className="stat-value">{selectedProgram.duration}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Status:</span>
                      <span className="stat-value status-badge">{selectedProgram.status}</span>
                    </div>
                  </div>
                  <div className="impact-section">
                    <h3>Impact</h3>
                    <p>{selectedProgram.impact}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

            <div className="dashboard-card">
              <h3>collaboration among NGO</h3>
              <div className="card-content">
                <p className="stat">4</p>
                <p>Active partnerships</p>
              </div>
            </div>

            <div className="dashboard-card" onClick={() => navigate('/community')}>
              <h3>Community Network</h3>
              <div className="card-content">
                <p className="stat">75%</p>
                <p>Resources allocated</p>
              </div>
            </div>

           

          <div className="recent-activity">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-date">Today</span>
                <p>Launched new skill development program</p>
              </div>
              <div className="activity-item">
                <span className="activity-date">Yesterday</span>
                <p>Submitted quarterly impact report</p>
              </div>
              <div className="activity-item">
                <span className="activity-date">2 days ago</span>
                <p>New collaboration request from Local Youth Group</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NGODashboard;