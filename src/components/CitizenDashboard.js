import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/axios';
import './Dashboard.css';

const CitizenDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    applications: 0,
    jobs: 0,
    appointments: 0,
    projects: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    mobile: '',
    aadhar: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch User Profile
        const profileRes = await api.get('/api/profile');
        setUser(profileRes.data);
        setEditForm({
          name: profileRes.data.name || '',
          email: profileRes.data.email || '',
          mobile: profileRes.data.mobile || '',
          aadhar: profileRes.data.aadhar || '',
        });

        // Fetch Applications
        let appsCount = 0;
        try {
          const appsRes = await api.get('/api/schemes/my/applications');
          appsCount = appsRes.data.length;
        } catch (e) {
          console.error("Error fetching applications:", e);
        }

        // Fetch Jobs
        let jobsCount = 0;
        try {
          const jobsRes = await api.get('/api/jobs');
          jobsCount = jobsRes.data.length;
        } catch (e) {
          console.error("Error fetching jobs:", e);
        }

        // Fetch Agri Appointments
        let appointmentsCount = 0;
        try {
          const appointmentsRes = await api.get('/api/agri/appointments/my');
          appointmentsCount = appointmentsRes.data.length;
        } catch (e) {
          console.error("Error fetching appointments:", e);
        }

        // Fetch Projects
        let projectsCount = 0;
        try {
          const projectsRes = await api.get('/api/projects');
          projectsCount = projectsRes.data.length;
        } catch (e) {
          console.error("Error fetching projects:", e);
        }

        setStats({
          applications: appsCount,
          jobs: jobsCount,
          appointments: appointmentsCount,
          projects: projectsCount,
        });

      } catch (err) {
        console.error("Error loading profile:", err);
        setErrorMessage("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const res = await api.put('/api/profile', editForm);
      setUser(res.data.user);
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to update profile.');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
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
              <li className="menu-item active" onClick={() => handleNavigation('/dashboard/citizen')}>Dashboard</li>
              <li className="menu-item" onClick={() => handleNavigation('/schemes')}>Available Schemes</li>
              <li className="menu-item" onClick={() => handleNavigation('/jobs')}>Jobs Available</li>
              <li className="menu-item" onClick={() => handleNavigation('/agriculture')}>Agricultural Connect</li>
              <li className="menu-item" onClick={() => handleNavigation('/projects')}>Projects</li>
              <li className="menu-item" onClick={() => handleNavigation('/crowdfunding')}>Crowd Funding</li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <div className="welcome-section">
            <h2>Welcome, {user ? user.name : 'Citizen'}!</h2>
            <p>Access government schemes and services with ease.</p>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card" onClick={() => handleNavigation('/schemes')}>
              <h3>Available Schemes</h3>
              <div className="card-content">
                <p className="stat">{stats.applications}</p>
                <p>Applications submitted</p>
              </div>
            </div>

            <div className="dashboard-card" onClick={() => handleNavigation('/jobs')}>
              <h3>Jobs Available</h3>
              <div className="card-content">
                <p className="stat">{stats.jobs}</p>
                <p>Available jobs in area</p>
              </div>
            </div>

            <div className="dashboard-card" onClick={() => handleNavigation('/agriculture')}>
              <h3>Agricultural Connect</h3>
              <div className="card-content">
                <p className="stat">{stats.appointments}</p>
                <p>Scheduled appointments</p>
              </div>
            </div>

            <div className="dashboard-card" onClick={() => handleNavigation('/projects')}>
              <h3>Projects</h3>
              <div className="card-content">
                <p className="stat">{stats.projects}</p>
                <p>Ongoing community projects</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', marginTop: '2rem' }}>
            <div className="dashboard-card" style={{ cursor: 'default' }}>
              <h3>Recent Activity</h3>
              <div className="activity-list" style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="activity-item" style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '0.8rem' }}>
                  <span className="activity-date" style={{ fontSize: '0.85rem', color: '#95a5a6', display: 'block', marginBottom: '0.3rem' }}>Today</span>
                  <p style={{ margin: 0, color: '#34495e', fontSize: '0.95rem' }}>Your application for Agricultural Subsidy has been approved</p>
                </div>
                <div className="activity-item" style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '0.8rem' }}>
                  <span className="activity-date" style={{ fontSize: '0.85rem', color: '#95a5a6', display: 'block', marginBottom: '0.3rem' }}>Yesterday</span>
                  <p style={{ margin: 0, color: '#34495e', fontSize: '0.95rem' }}>New scheme announcement: Rural Housing Support</p>
                </div>
                <div className="activity-item" style={{ paddingBottom: '0.5rem' }}>
                  <span className="activity-date" style={{ fontSize: '0.85rem', color: '#95a5a6', display: 'block', marginBottom: '0.3rem' }}>3 days ago</span>
                  <p style={{ margin: 0, color: '#34495e', fontSize: '0.95rem' }}>Document verification completed for Education Grant</p>
                </div>
              </div>
            </div>

            <div className="dashboard-card" style={{ cursor: 'default' }}>
              <h3>My Profile</h3>
              {successMessage && <div style={{ backgroundColor: '#e8f8f5', color: '#27ae60', padding: '10px', borderRadius: '6px', margin: '10px 0', fontSize: '0.9rem' }}>{successMessage}</div>}
              {errorMessage && <div style={{ backgroundColor: '#fdedec', color: '#c0392b', padding: '10px', borderRadius: '6px', margin: '10px 0', fontSize: '0.9rem' }}>{errorMessage}</div>}
              
              {!isEditing ? (
                <div style={{ marginTop: '1.5rem' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.85rem', color: '#7f8c8d', display: 'block' }}>Full Name</label>
                    <span style={{ fontSize: '1.05rem', fontWeight: '500', color: '#2c3e50' }}>{user?.name || 'Loading...'}</span>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.85rem', color: '#7f8c8d', display: 'block' }}>Email Address</label>
                    <span style={{ fontSize: '1.05rem', fontWeight: '500', color: '#2c3e50' }}>{user?.email || 'Loading...'}</span>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.85rem', color: '#7f8c8d', display: 'block' }}>Mobile Number</label>
                    <span style={{ fontSize: '1.05rem', fontWeight: '500', color: '#2c3e50' }}>{user?.mobile || 'Loading...'}</span>
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ fontSize: '0.85rem', color: '#7f8c8d', display: 'block' }}>Aadhar Number</label>
                    <span style={{ fontSize: '1.05rem', fontWeight: '500', color: '#2c3e50' }}>{user?.aadhar || 'Loading...'}</span>
                  </div>
                  <button 
                    className="primary-button" 
                    onClick={() => {
                      setSuccessMessage('');
                      setErrorMessage('');
                      setIsEditing(true);
                    }}
                  >
                    Edit Profile
                  </button>
                </div>
              ) : (
                <form onSubmit={handleProfileUpdate} style={{ marginTop: '1.5rem' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.85rem', color: '#7f8c8d', display: 'block', marginBottom: '0.3rem' }}>Full Name</label>
                    <input 
                      type="text" 
                      value={editForm.name} 
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      required
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #bdc3c7', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }}
                    />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.85rem', color: '#7f8c8d', display: 'block', marginBottom: '0.3rem' }}>Email Address</label>
                    <input 
                      type="email" 
                      value={editForm.email} 
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      required
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #bdc3c7', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }}
                    />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.85rem', color: '#7f8c8d', display: 'block', marginBottom: '0.3rem' }}>Mobile Number</label>
                    <input 
                      type="text" 
                      value={editForm.mobile} 
                      onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })}
                      required
                      maxLength={10}
                      pattern="\d{10}"
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #bdc3c7', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }}
                    />
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ fontSize: '0.85rem', color: '#7f8c8d', display: 'block', marginBottom: '0.3rem' }}>Aadhar Number</label>
                    <input 
                      type="text" 
                      value={editForm.aadhar} 
                      onChange={(e) => setEditForm({ ...editForm, aadhar: e.target.value })}
                      required
                      maxLength={12}
                      pattern="\d{12}"
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #bdc3c7', fontSize: '1rem', boxSizing: 'border-box', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      type="submit" 
                      className="primary-button" 
                      style={{ marginTop: 0, flex: 1 }}
                    >
                      Save
                    </button>
                    <button 
                      type="button" 
                      className="secondary-button" 
                      style={{ marginTop: 0, flex: 1 }}
                      onClick={() => {
                        setSuccessMessage('');
                        setErrorMessage('');
                        setEditForm({
                          name: user?.name || '',
                          email: user?.email || '',
                          mobile: user?.mobile || '',
                          aadhar: user?.aadhar || '',
                        });
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CitizenDashboard;