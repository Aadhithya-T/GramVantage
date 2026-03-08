import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Collaboration.css";

const Collaboration = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("messages");
  const [loading, setLoading] = useState(true);
  // Removed unused notifications state

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Removed setNotifications since it's not defined and was noted as removed
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading collaboration hub...</p>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/");
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const messages = [
    {
      id: 1,
      sender: "Rajesh Kumar",
      role: "District Officer",
      message: "Please review the updated budget allocation for Q2",
      timestamp: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      sender: "Priya Singh",
      role: "Project Manager",
      message: "The road development project report is ready for review",
      timestamp: "4 hours ago",
      unread: false,
    },
  ];

  const documents = [
    {
      id: 1,
      title: "Q2 Budget Report",
      type: "PDF",
      sharedBy: "Rajesh Kumar",
      date: "2024-02-15",
    },
    {
      id: 2,
      title: "Project Implementation Guidelines",
      type: "DOC",
      sharedBy: "Admin",
      date: "2024-02-14",
    },
  ];

  const teams = [
    {
      id: 1,
      name: "Project Planning",
      members: 8,
      activeProjects: 3,
    },
    {
      id: 2,
      name: "Budget Committee",
      members: 5,
      activeProjects: 2,
    },
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
                className="menu-item"
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
                className="menu-item active"
                onClick={() => navigate("/reports")}
              >
                Collaboration
              </li>
              <li
                className="menu-item"
                onClick={() => navigate("/job-management")}
              >
                Job Management
              </li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <div className="welcome-section">
            <h2>Collaboration Hub</h2>
            <p>Communicate and coordinate with other officials efficiently.</p>
          </div>

          <div className="collaboration-tabs">
            <button
              className={`tab-button ${activeTab === "messages" ? "active" : ""}`}
              onClick={() => setActiveTab("messages")}
            >
              Messages
            </button>
            <button
              className={`tab-button ${activeTab === "documents" ? "active" : ""}`}
              onClick={() => setActiveTab("documents")}
            >
              Documents
            </button>
            <button
              className={`tab-button ${activeTab === "teams" ? "active" : ""}`}
              onClick={() => setActiveTab("teams")}
            >
              Teams
            </button>
          </div>

          {activeTab === "messages" && (
            <div className="messages-section">
              <div className="section-header">
                <h3>Recent Messages</h3>
                <button className="new-message-button">New Message</button>
              </div>
              <div className="messages-list">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message-card ${message.unread ? "unread" : ""}}`}
                  >
                    <div className="message-header">
                      <h4>{message.sender}</h4>
                      <span className="role-badge">{message.role}</span>
                    </div>
                    <p className="message-content">{message.message}</p>
                    <div className="message-footer">
                      <span className="timestamp">{message.timestamp}</span>
                      <button className="reply-button">Reply</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="documents-section">
              <div className="section-header">
                <h3>Shared Documents</h3>
                <button className="upload-button">Upload Document</button>
              </div>
              <div className="documents-list">
                {documents.map((document) => (
                  <div key={document.id} className="document-card">
                    <div className="document-icon">{document.type}</div>
                    <div className="document-info">
                      <h4>{document.title}</h4>
                      <p>Shared by: {document.sharedBy}</p>
                      <p>Date: {document.date}</p>
                    </div>
                    <div className="document-actions">
                      <button className="view-button">View</button>
                      <button className="download-button">Download</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "teams" && (
            <div className="teams-section">
              <div className="section-header">
                <h3>Team Collaboration</h3>
                <button className="create-team-button">Create Team</button>
              </div>
              <div className="teams-list">
                {teams.map((team) => (
                  <div key={team.id} className="team-card">
                    <h4>{team.name}</h4>
                    <div className="team-stats">
                      <div className="stat-item">
                        <span className="label">Members:</span>
                        <span className="value">{team.members}</span>
                      </div>
                      <div className="stat-item">
                        <span className="label">Active Projects:</span>
                        <span className="value">{team.activeProjects}</span>
                      </div>
                    </div>
                    <div className="team-actions">
                      <button className="view-team-button">View Team</button>
                      <button className="join-team-button">Join Team</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Collaboration;
