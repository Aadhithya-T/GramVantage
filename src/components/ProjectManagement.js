import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/axios";
import "./Dashboard.css";

const ProjectManagement = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budget: "",
    spent: "₹0",
    progress: "0%",
    status: "Planning Phase",
    startDate: "",
    endDate: "",
    contractor: "",
    location: ""
  });
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [stats, setStats] = useState({
    totalBudget: 0,
    budgetUtilized: 0,
    activeProjects: 0,
    completedProjects: 0,
  });

  const parseValue = (valStr) => {
    if (!valStr) return 0;
    const clean = valStr.replace(/[₹$,]/g, '').trim().toLowerCase();
    let num = parseFloat(clean);
    if (isNaN(num)) return 0;
    if (clean.includes("crore")) {
      num = num * 10000000;
    } else if (clean.includes("lakh")) {
      num = num * 100000;
    }
    return num;
  };

  const formatCrore = (num) => {
    return (num / 10000000).toFixed(2);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/projects");
      const data = res.data;
      setProjects(data);

      let totalB = 0;
      let totalS = 0;
      let activeCount = 0;
      let completedCount = 0;

      data.forEach((p) => {
        totalB += parseValue(p.budget);
        totalS += parseValue(p.spent);
        if (p.status === "Completed") {
          completedCount++;
        } else {
          activeCount++;
        }
      });

      setStats({
        totalBudget: totalB > 0 ? parseFloat(formatCrore(totalB)) : 0,
        budgetUtilized: totalS > 0 ? parseFloat(formatCrore(totalS)) : 0,
        activeProjects: activeCount,
        completedProjects: completedCount,
      });
    } catch (error) {
      console.error("Error fetching project data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/");
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setShowDetailsModal(true);
  };

  const handleUpdateProgress = (project) => {
    setSelectedProject(project);
    setShowUpdateModal(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);
    try {
      await api.post("/api/projects", formData);
      setShowAddModal(false);
      setFormData({
        name: "",
        description: "",
        budget: "",
        spent: "₹0",
        progress: "0%",
        status: "Planning Phase",
        startDate: "",
        endDate: "",
        contractor: "",
        location: ""
      });
      fetchData();
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to add project");
    } finally {
      setSubmitting(false);
    }
  };

  const handleProgressUpdate = async (e) => {
    e.preventDefault();
    const newProgress = e.target.progress.value + "%";
    const newSpent = e.target.spent.value;
    const newStatus = e.target.status.value;

    try {
      await api.patch(`/api/projects/${selectedProject._id}`, {
        progress: newProgress,
        spent: newSpent,
        status: newStatus
      });
      setShowUpdateModal(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update project progress");
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await api.delete(`/api/projects/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading projects...</p>
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
            <span className="user-profile" onClick={toggleProfileMenu}>
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
                className="menu-item active"
                onClick={() => navigate("/project-management")}
              >
                Project and Budget analysis
              </li>
              <li
                className="menu-item"
                onClick={() => navigate("/scheme-admin")}
              >
                Scheme Administration
              </li>
              <li
                className="menu-item"
                onClick={() => navigate("/agri-admin")}
              >
                Agri Appointments
              </li>
              <li
                className="menu-item"
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
            <h2>Project and Budget Analysis</h2>
            <p>Monitor and manage ongoing projects and their budgets.</p>
          </div>

          <div className="project-analysis-grid fade-in">
            <div className="analysis-card total-budget slide-in-left">
              <h3>Total Budget Allocation</h3>
              <p className="amount">₹{stats.totalBudget} Crore</p>
              <p className="description">FY 2023-24</p>
            </div>

            <div className="analysis-card budget-utilized slide-in-left">
              <h3>Budget Utilized</h3>
              <p className="amount">₹{stats.budgetUtilized} Crore</p>
              <p className="description">
                {stats.totalBudget > 0
                  ? ((stats.budgetUtilized / stats.totalBudget) * 100).toFixed(1)
                  : 0}
                % of total budget
              </p>
            </div>

            <div className="analysis-card active-projects slide-in-right">
              <h3>Active Projects</h3>
              <p className="amount">{stats.activeProjects}</p>
              <p className="description">Currently in progress</p>
            </div>

            <div className="analysis-card completed-projects slide-in-right">
              <h3>Completed Projects</h3>
              <p className="amount">{stats.completedProjects}</p>
              <p className="description">This financial year</p>
            </div>
          </div>

          <div className="project-list-section fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>Ongoing Projects</h3>
              <button className="primary-button" onClick={() => setShowAddModal(true)}>
                Add New Project
              </button>
            </div>

            <div className="project-list">
              {projects.length === 0 ? (
                <p>No projects found. Add a new project to begin.</p>
              ) : (
                projects.map((project) => (
                  <div key={project._id} className="project-card slide-up">
                    <div className="project-header">
                      <h4>{project.name}</h4>
                      <span
                        className={`status-badge ${project.status.toLowerCase().replace(" ", "-")}`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div className="project-details">
                      <div className="detail-item">
                        <span>Budget:</span>
                        <span>{project.budget}</span>
                      </div>
                      <div className="detail-item">
                        <span>Spent:</span>
                        <span>{project.spent}</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: project.progress }}
                        ></div>
                        <span className="progress-text">{project.progress}</span>
                      </div>
                    </div>
                    <div className="project-actions">
                      <button
                        className="action-button"
                        onClick={() => handleViewDetails(project)}
                      >
                        View Details
                      </button>
                      <button
                        className="action-button"
                        onClick={() => handleUpdateProgress(project)}
                      >
                        Update Progress
                      </button>
                      <button
                        className="action-button delete-button"
                        onClick={() => handleDeleteProject(project._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {showDetailsModal && selectedProject && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>{selectedProject.name}</h2>
                <div className="modal-details">
                  <p>
                    <strong>Description:</strong> {selectedProject.description}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedProject.status}
                  </p>
                  <p>
                    <strong>Budget:</strong> {selectedProject.budget}
                  </p>
                  <p>
                    <strong>Spent:</strong> {selectedProject.spent}
                  </p>
                  <p>
                    <strong>Progress:</strong> {selectedProject.progress}
                  </p>
                  <p>
                    <strong>Start Date:</strong> {selectedProject.startDate}
                  </p>
                  <p>
                    <strong>End Date:</strong> {selectedProject.endDate}
                  </p>
                  <p>
                    <strong>Contractor:</strong> {selectedProject.contractor}
                  </p>
                  <p>
                    <strong>Location:</strong> {selectedProject.location}
                  </p>
                </div>
                <button
                  className="close-button"
                  onClick={() => setShowDetailsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {showUpdateModal && selectedProject && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Update Progress - {selectedProject.name}</h2>
                <form onSubmit={handleProgressUpdate}>
                  <div className="form-group">
                    <label>Progress (%):</label>
                    <input
                      type="number"
                      name="progress"
                      min="0"
                      max="100"
                      defaultValue={parseInt(selectedProject.progress)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Amount Spent:</label>
                    <input
                      type="text"
                      name="spent"
                      defaultValue={selectedProject.spent}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Status:</label>
                    <select name="status" defaultValue={selectedProject.status} required>
                      <option value="Planning Phase">Planning Phase</option>
                      <option value="Approved">Approved</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="modal-actions">
                    <button type="submit" className="save-button">
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => setShowUpdateModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {showAddModal && (
            <div className="modal-overlay">
              <div className="modal-content" style={{ maxWidth: "550px" }}>
                <h2>Add New Project</h2>
                {formError && <p style={{ color: "red", marginBottom: "10px" }}>{formError}</p>}
                <form onSubmit={handleAddProject}>
                  <div className="form-group">
                    <label>Project Name</label>
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
                    <label>Budget (e.g. ₹1.5 Crore or ₹75 Lakhs)</label>
                    <input
                      type="text"
                      name="budget"
                      placeholder="e.g. ₹1.5 Crore"
                      value={formData.budget}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Contractor</label>
                    <input
                      type="text"
                      name="contractor"
                      value={formData.contractor}
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
                    <label>Status</label>
                    <select name="status" value={formData.status} onChange={handleFormChange} required>
                      <option value="Planning Phase">Planning Phase</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Approved">Approved</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="modal-actions">
                    <button type="submit" className="save-button" disabled={submitting}>
                      {submitting ? "Adding..." : "Add Project"}
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
        </main>
      </div>
    </div>
  );
};

export default ProjectManagement;
