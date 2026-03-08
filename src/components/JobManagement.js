import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/axios";
import "./SchemeAdministration.css";

const JobManagement = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    salary: "",
    requirements: "",
    deadline: "",
    status: "Active",
  });
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/");
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);
    try {
      await api.post("/api/jobs", formData);
      setShowAddModal(false);
      setFormData({
        title: "",
        department: "",
        location: "",
        type: "Full-time",
        salary: "",
        requirements: "",
        deadline: "",
        status: "Active",
      });
      fetchJobs();
    } catch (error) {
      setFormError(error.response?.data?.message || "Failed to add job");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await api.delete(`/api/jobs/${id}`);
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading jobs...</p>
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
                className="menu-item active"
                onClick={() => navigate("/job-management")}
              >
                Job Management
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
            <h2>Job Management</h2>
            <p>
              Post and manage employment opportunities for village citizens.
            </p>
          </div>

          <div className="schemes-section">
            <div className="section-header">
              <h3>Posted Jobs ({jobs.length})</h3>
              <button
                className="add-scheme-button"
                onClick={() => setShowAddModal(true)}
              >
                Add New Job
              </button>
            </div>

            <div className="schemes-list">
              {jobs.length === 0 ? (
                <p>No jobs posted yet. Add one to get started.</p>
              ) : (
                jobs.map((job) => (
                  <div key={job._id} className="scheme-card fade-in">
                    <div className="scheme-header">
                      <h4>{job.title}</h4>
                      <span
                        className={`status-badge ${job.status.toLowerCase()}`}
                      >
                        {job.status}
                      </span>
                    </div>
                    <div className="scheme-details">
                      <div className="detail-row">
                        <div className="detail-item">
                          <span className="label">Department:</span>
                          <span className="value">{job.department}</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Type:</span>
                          <span className="value">{job.type}</span>
                        </div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-item">
                          <span className="label">Location:</span>
                          <span className="value">{job.location}</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Deadline:</span>
                          <span className="value">{job.deadline}</span>
                        </div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-item">
                          <span className="label">Salary:</span>
                          <span className="value">{job.salary}</span>
                        </div>
                      </div>
                    </div>
                    <div className="scheme-actions">
                      <button
                        className="action-button delete-button"
                        onClick={() => handleDelete(job._id)}
                      >
                        Delete Job
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Job</h2>
            {formError && (
              <p style={{ color: "red", marginBottom: "10px" }}>{formError}</p>
            )}
            <form onSubmit={handleAddJob}>
              <div className="form-group">
                <label>Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleFormChange}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div className="form-group">
                <label>Salary</label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Requirements</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Application Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                >
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="modal-actions">
                <button
                  type="submit"
                  className="save-button"
                  disabled={submitting}
                >
                  {submitting ? "Adding..." : "Add Job"}
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
    </div>
  );
};

export default JobManagement;
