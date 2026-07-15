import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/axios";
import "./SchemeAdministration.css";

const AgriAdministration = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/agri/appointments");
      setAppointments(res.data);
    } catch (error) {
      console.error("Error fetching agricultural appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.patch(`/api/agri/appointments/${id}`, { status });
      fetchAppointments();
    } catch (error) {
      console.error("Error updating appointment status:", error);
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading appointments...</p>
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
            <span
              className="user-profile"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              👤
            </span>
            {showProfileMenu && (
              <div className="profile-menu">
                <div className="profile-info">
                  <p>Welcome!</p>
                  <p>Official User</p>
                </div>
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <nav className="sidebar-menu">
            <ul>
              <li
                className="menu-item"
                onClick={() => navigate("/dashboard/official")}
              >
                Dashboard
              </li>
              <li
                className="menu-item"
                onClick={() => navigate("/project-management")}
              >
                Project and Budget Analysis
              </li>
              <li
                className="menu-item"
                onClick={() => navigate("/scheme-admin")}
              >
                Scheme Administration
              </li>
              <li
                className="menu-item"
                onClick={() => navigate("/job-management")}
              >
                Job Management
              </li>
              <li
                className="menu-item active"
                onClick={() => navigate("/agri-admin")}
              >
                Agri Appointments
              </li>
              <li
                className="menu-item"
                onClick={() => navigate("/collaboration")}
              >
                Collaboration
              </li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <div className="welcome-section">
            <h2>Agricultural Appointments Administration</h2>
            <p>Review and process farmer requests for meetings on crop advisory, soil tests, or farming concerns.</p>
          </div>

          <div className="schemes-section">
            <div className="section-header">
              <h3>Farmer Requests ({appointments.length})</h3>
            </div>

            <div className="schemes-list">
              {appointments.length === 0 ? (
                <p>No agricultural appointments requested yet.</p>
              ) : (
                appointments.map((app) => (
                  <div key={app._id} className="scheme-card fade-in">
                    <div className="scheme-header">
                      <h4>Farmer: {app.farmerName}</h4>
                      <span
                        className={`status-badge ${app.status.toLowerCase()}`}
                      >
                        {app.status}
                      </span>
                    </div>
                    <div className="scheme-details">
                      <div className="detail-row">
                        <div className="detail-item">
                          <span className="label">Contact Mobile:</span>
                          <span className="value">{app.farmerMobile}</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Requested Date:</span>
                          <span className="value">{app.appointmentDate}</span>
                        </div>
                      </div>
                      <div className="detail-row" style={{ marginTop: '10px' }}>
                        <div className="detail-item" style={{ flex: 1 }}>
                          <span className="label">Reason for Appointment:</span>
                          <span className="value" style={{ display: 'block', marginTop: '5px', fontStyle: 'italic' }}>
                            "{app.reason}"
                          </span>
                        </div>
                      </div>
                    </div>
                    {app.status === "Pending" && (
                      <div className="scheme-actions" style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
                        <button
                          className="action-button"
                          onClick={() => handleUpdateStatus(app._id, "Approved")}
                          style={{ backgroundColor: "#27ae60", color: "white" }}
                        >
                          Approve
                        </button>
                        <button
                          className="action-button delete-button"
                          onClick={() => handleUpdateStatus(app._id, "Rejected")}
                          style={{ backgroundColor: "#c0392b", color: "white" }}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgriAdministration;
