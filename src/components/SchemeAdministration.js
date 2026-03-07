import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const SchemeAdministration = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [schemes, setSchemes] = useState([]);
  const [stats, setStats] = useState({
    totalSchemes: 0,
    totalBeneficiaries: 0,
    pendingApplications: 0,
    totalDisbursed: 0
  });

  useEffect(() => {
    // Simulating API call with setTimeout
    const fetchData = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setSchemes([
          {
            id: 1,
            name: 'Rural Housing Support',
            beneficiaries: 250,
            budget: '₹2.5 Crore',
            status: 'Active',
            applications: 45
          },
          {
            id: 2,
            name: 'Agricultural Subsidy',
            beneficiaries: 180,
            budget: '₹1.8 Crore',
            status: 'Active',
            applications: 32
          },
          {
            id: 3,
            name: 'Education Grant',
            beneficiaries: 120,
            budget: '₹1.2 Crore',
            status: 'Under Review',
            applications: 28
          }
        ]);

        setStats({
          totalSchemes: 8,
          totalBeneficiaries: 550,
          pendingApplications: 105,
          totalDisbursed: '₹5.5 Crore'
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/');
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading schemes...</p>
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
              <li className="menu-item" onClick={() => navigate('/project-management')}>Project and Budget analysis</li>
              <li className="menu-item active" onClick={() => navigate('/scheme-admin')}>Scheme Administration</li>
              <li className="menu-item" onClick={() => navigate('/collaboration')}>Collaboration</li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <div className="welcome-section">
            <h2>Scheme Administration</h2>
            <p>Manage and monitor government schemes and their implementation.</p>
          </div>

          <div className="scheme-stats-grid">
            <div className="stats-card total-schemes">
              <h3>Total Schemes</h3>
              <p className="amount">{stats.totalSchemes}</p>
              <p className="description">Active and Under Review</p>
            </div>

            <div className="stats-card beneficiaries">
              <h3>Total Beneficiaries</h3>
              <p className="amount">{stats.totalBeneficiaries}</p>
              <p className="description">Across all schemes</p>
            </div>

            <div className="stats-card pending-applications">
              <h3>Pending Applications</h3>
              <p className="amount">{stats.pendingApplications}</p>
              <p className="description">Awaiting review</p>
            </div>

            <div className="stats-card total-disbursed">
              <h3>Total Amount Disbursed</h3>
              <p className="amount">{stats.totalDisbursed}</p>
              <p className="description">This financial year</p>
            </div>
          </div>

          <div className="schemes-section">
            <div className="section-header">
              <h3>Active Schemes</h3>
              <button className="add-scheme-button">Add New Scheme</button>
            </div>

            <div className="schemes-list">
              {schemes.map(scheme => (
                <div key={scheme.id} className="scheme-card fade-in">
                  <div className="scheme-header">
                    <h4>{scheme.name}</h4>
                    <span className={`status-badge ${scheme.status.toLowerCase().replace(' ', '-')}`}>
                      {scheme.status}
                    </span>
                  </div>
                  <div className="scheme-details">
                    <div className="detail-row">
                      <div className="detail-item">
                        <span className="label">Beneficiaries:</span>
                        <span className="value">{scheme.beneficiaries}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Budget:</span>
                        <span className="value">{scheme.budget}</span>
                      </div>
                    </div>
                    <div className="detail-row">
                      <div className="detail-item">
                        <span className="label">Pending Applications:</span>
                        <span className="value">{scheme.applications}</span>
                      </div>
                    </div>
                  </div>
                  <div className="scheme-actions">
                    <button className="action-button">View Details</button>
                    <button className="action-button">Manage Applications</button>
                    <button className="action-button">Edit Scheme</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SchemeAdministration;