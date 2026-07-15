import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/axios';
import './Dashboard.css';

const AgriculturalConnect = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    appointmentDate: '',
    reason: ''
  });
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const fetchAppointments = async () => {
    try {
      const res = await api.get('/api/agri/appointments/my');
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to load appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setSubmitting(true);
    try {
      await api.post('/api/agri/appointments', formData);
      setSuccessMsg("Appointment request submitted successfully!");
      setFormData({ appointmentDate: '', reason: '' });
      fetchAppointments();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to schedule appointment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/');
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
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <nav className="sidebar-menu">
            <ul>
              <li className="menu-item" onClick={() => navigate('/dashboard/citizen')}>Dashboard</li>
              <li className="menu-item" onClick={() => navigate('/schemes')}>Available Schemes</li>
              <li className="menu-item" onClick={() => navigate('/jobs')}>Jobs Available</li>
              <li className="menu-item active" onClick={() => navigate('/agriculture')}>Agricultural Connect</li>
              <li className="menu-item" onClick={() => navigate('/projects')}>Projects</li>
              <li className="menu-item" onClick={() => navigate('/crowdfunding')}>Crowd Funding</li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <div className="welcome-section">
            <h2>Agricultural Connect Portal</h2>
            <p>Schedule meetings with local agricultural officials and consult them on dates for crop advisory, soil testing, or farm assistance.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '30px', marginTop: '20px' }}>
            {/* Appointment Booking Form */}
            <div className="dashboard-card" style={{ padding: '20px', height: 'fit-content' }}>
              <h3 style={{ marginBottom: '15px' }}>Register Appointment</h3>
              {error && <p style={{ color: '#c0392b', marginBottom: '10px', fontSize: '14px' }}>{error}</p>}
              {successMsg && <p style={{ color: '#27ae60', marginBottom: '10px', fontSize: '14px' }}>{successMsg}</p>}
              
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Preferred Date</label>
                  <input
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleInputChange}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px' }}>Reason for Contact</label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    placeholder="Describe your issue (e.g. crop pest problem, subsidy inquiry, soil check request...)"
                    required
                    rows={4}
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box', resize: 'vertical' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="primary-button"
                  style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                >
                  {submitting ? "Submitting..." : "Schedule Meeting"}
                </button>
              </form>
            </div>

            {/* Scheduled Appointments List */}
            <div className="dashboard-card" style={{ padding: '20px' }}>
              <h3 style={{ marginBottom: '15px' }}>My Appointments ({appointments.length})</h3>
              {loading ? (
                <p>Loading appointments...</p>
              ) : appointments.length === 0 ? (
                <p>No appointments registered yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {appointments.map((app) => (
                    <div
                      key={app._id}
                      style={{
                        border: '1px solid #eee',
                        borderRadius: '6px',
                        padding: '15px',
                        backgroundColor: '#fafafa',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div style={{ flex: 1, marginRight: '15px' }}>
                        <p style={{ margin: '0 0 5px 0', fontSize: '15px', fontWeight: 'bold' }}>Reason: {app.reason}</p>
                        <p style={{ margin: '0', fontSize: '13px', color: '#666' }}>
                          <strong>Date:</strong> {app.appointmentDate}
                        </p>
                      </div>
                      <span
                        className={`status-badge ${app.status.toLowerCase()}`}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          color: 'white',
                          backgroundColor:
                            app.status === 'Approved'
                              ? '#27ae60'
                              : app.status === 'Rejected'
                              ? '#c0392b'
                              : '#f39c12'
                        }}
                      >
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgriculturalConnect;