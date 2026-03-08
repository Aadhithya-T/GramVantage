import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/axios";
import "./SchemeAdministration.css";

const SchemeAdministration = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [schemes, setSchemes] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [applicantsLoading, setApplicantsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    eligibility: "",
    deadline: "Ongoing",
    status: "Open",
  });
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchSchemes = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/schemes");
      setSchemes(res.data);
    } catch (error) {
      console.error("Error fetching schemes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/");
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddScheme = async (e) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);
    try {
      await api.post("/api/schemes", formData);
      setShowAddModal(false);
      setFormData({
        name: "",
        description: "",
        eligibility: "",
        deadline: "Ongoing",
        status: "Open",
      });
      fetchSchemes();
    } catch (error) {
      setFormError(error.response?.data?.message || "Failed to add scheme");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this scheme? All applications will also be deleted.",
      )
    )
      return;
    try {
      await api.delete(`/api/schemes/${id}`);
      fetchSchemes();
    } catch (error) {
      console.error("Error deleting scheme:", error);
    }
  };

  const handleViewApplicants = async (scheme) => {
    setSelectedScheme(scheme);
    setShowApplicantsModal(true);
    setApplicantsLoading(true);
    try {
      const res = await api.get(`/api/schemes/${scheme._id}/applications`);
      setApplicants(res.data);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    } finally {
      setApplicantsLoading(false);
    }
  };

  const handleUpdateStatus = async (schemeId, appId, status) => {
    try {
      await api.patch(`/api/schemes/${schemeId}/applications/${appId}`, {
        status,
      });
      setApplicants((prev) =>
        prev.map((a) => (a._id === appId ? { ...a, status } : a)),
      );
    } catch (error) {
      console.error("Error updating application:", error);
    }
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
                Project and Budget analysis
              </li>
              <li
                className="menu-item active"
                onClick={() => navigate("/scheme-admin")}
              >
                Scheme Administration
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
            <h2>Scheme Administration</h2>
            <p>Manage local village schemes and review citizen applications.</p>
          </div>

          <div className="scheme-stats-grid">
            <div className="stats-card total-schemes">
              <h3>Total Schemes</h3>
              <p className="amount">{schemes.length}</p>
              <p className="description">Active and Open</p>
            </div>
            <div className="stats-card pending-applications">
              <h3>Total Applications</h3>
              <p className="amount">
                {schemes.reduce((sum, s) => sum + (s.applicationCount || 0), 0)}
              </p>
              <p className="description">Across all schemes</p>
            </div>
          </div>

          <div className="schemes-section">
            <div className="section-header">
              <h3>Local Schemes</h3>
              <button
                className="add-scheme-button"
                onClick={() => setShowAddModal(true)}
              >
                Add New Scheme
              </button>
            </div>

            <div className="schemes-list">
              {schemes.length === 0 ? (
                <p>No schemes found. Add one to get started.</p>
              ) : (
                schemes.map((scheme) => (
                  <div key={scheme._id} className="scheme-card fade-in">
                    <div className="scheme-header">
                      <h4>{scheme.name}</h4>
                      <span
                        className={`status-badge ${scheme.status.toLowerCase()}`}
                      >
                        {scheme.status}
                      </span>
                    </div>
                    <div className="scheme-details">
                      <div className="detail-row">
                        <div className="detail-item">
                          <span className="label">Eligibility:</span>
                          <span className="value">{scheme.eligibility}</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Deadline:</span>
                          <span className="value">{scheme.deadline}</span>
                        </div>
                      </div>
                    </div>
                    <div className="scheme-actions">
                      <button
                        className="action-button"
                        onClick={() => handleViewApplicants(scheme)}
                      >
                        View Applicants
                      </button>
                      <button
                        className="action-button delete-button"
                        onClick={() => handleDelete(scheme._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Add Scheme Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Scheme</h2>
            {formError && (
              <p style={{ color: "red", marginBottom: "10px" }}>{formError}</p>
            )}
            <form onSubmit={handleAddScheme}>
              <div className="form-group">
                <label>Scheme Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Eligibility</label>
                <input
                  type="text"
                  name="eligibility"
                  value={formData.eligibility}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Deadline</label>
                <input
                  type="text"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="modal-actions">
                <button
                  type="submit"
                  className="save-button"
                  disabled={submitting}
                >
                  {submitting ? "Adding..." : "Add Scheme"}
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Applicants Modal */}
      {showApplicantsModal && selectedScheme && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Applicants — {selectedScheme.name}</h2>
            {applicantsLoading ? (
              <div
                className="loading-container"
                style={{ height: "auto", padding: "20px" }}
              >
                <div className="loading-spinner"></div>
              </div>
            ) : applicants.length === 0 ? (
              <p>No applications yet.</p>
            ) : (
              <div className="applicants-list">
                {applicants.map((app) => (
                  <div key={app._id} className="applicant-card">
                    <div className="applicant-info">
                      <p>
                        <strong>{app.name}</strong>
                      </p>
                      <p style={{ fontSize: "13px", color: "#666" }}>
                        Aadhar: {app.aadhar}
                      </p>
                      <span
                        className={`status-badge ${app.status.toLowerCase()}`}
                      >
                        {app.status}
                      </span>
                    </div>
                    {app.status === "Pending" && (
                      <div className="applicant-actions">
                        <button
                          className="save-button"
                          style={{ padding: "6px 14px", fontSize: "13px" }}
                          onClick={() =>
                            handleUpdateStatus(
                              selectedScheme._id,
                              app._id,
                              "Approved",
                            )
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="action-button delete-button"
                          style={{ padding: "6px 14px", fontSize: "13px" }}
                          onClick={() =>
                            handleUpdateStatus(
                              selectedScheme._id,
                              app._id,
                              "Rejected",
                            )
                          }
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="modal-actions" style={{ marginTop: "20px" }}>
              <button
                className="cancel-button"
                onClick={() => setShowApplicantsModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchemeAdministration;
