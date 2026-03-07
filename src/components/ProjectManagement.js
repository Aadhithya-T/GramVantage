import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Chatbot from './Chatbot';

const ProjectManagement = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [stats, setStats] = useState({
    totalBudget: 0,
    budgetUtilized: 0,
    activeProjects: 0,
    completedProjects: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulating API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setProjects([
          {
            id: 1,
            name: 'Road Development',
            budget: '₹1.5 Crore',
            spent: '₹75 Lakhs',
            progress: '50%',
            status: 'In Progress',
            description: 'Major road development project connecting multiple villages',
            startDate: '2024-01-15',
            endDate: '2024-06-15',
            contractor: 'ABC Construction Ltd',
            location: 'North District'
          },
          {
            id: 2,
            name: 'Water Treatment Plant',
            budget: '₹2 Crore',
            spent: '₹40 Lakhs',
            progress: '20%',
            status: 'Initial Phase',
            description: 'Installation of modern water treatment facility',
            startDate: '2024-02-01',
            endDate: '2024-08-01',
            contractor: 'XYZ Water Solutions',
            location: 'Central Area'
          },
          {
            id: 3,
            name: 'Solar Street Lights',
            budget: '₹80 Lakhs',
            spent: '₹60 Lakhs',
            progress: '75%',
            status: 'Near Completion',
            description: 'Installation of solar-powered street lights',
            startDate: '2024-01-01',
            endDate: '2024-03-31',
            contractor: 'Green Energy Systems',
            location: 'All Village Roads'
          }
        ]);

        setStats({
          totalBudget: 4.3,
          budgetUtilized: 1.75,
          activeProjects: 8,
          completedProjects: 12
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

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setShowDetailsModal(true);
  };

  const handleUpdateProgress = (project) => {
    setSelectedProject(project);
    setShowUpdateModal(true);
  };

  const handleProgressUpdate = (e) => {
    e.preventDefault();
    const newProgress = e.target.progress.value + '%';
    const newSpent = e.target.spent.value;
    
    setProjects(projects.map(p => {
      if (p.id === selectedProject.id) {
        return { ...p, progress: newProgress, spent: newSpent };
      }
      return p;
    }));
    
    setShowUpdateModal(false);
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
              <p className="description">{((stats.budgetUtilized/stats.totalBudget) * 100).toFixed(1)}% of total budget</p>
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
            <h3>Ongoing Projects</h3>
            <div className="project-list">
              {projects.map(project => (
                <div key={project.id} className="project-card slide-up">
                  <div className="project-header">
                    <h4>{project.name}</h4>
                    <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
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
                    <button className="action-button" onClick={() => handleViewDetails(project)}>View Details</button>
                    <button className="action-button" onClick={() => handleUpdateProgress(project)}>Update Progress</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showDetailsModal && selectedProject && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>{selectedProject.name}</h2>
                <div className="modal-details">
                  <p><strong>Description:</strong> {selectedProject.description}</p>
                  <p><strong>Status:</strong> {selectedProject.status}</p>
                  <p><strong>Budget:</strong> {selectedProject.budget}</p>
                  <p><strong>Spent:</strong> {selectedProject.spent}</p>
                  <p><strong>Progress:</strong> {selectedProject.progress}</p>
                  <p><strong>Start Date:</strong> {selectedProject.startDate}</p>
                  <p><strong>End Date:</strong> {selectedProject.endDate}</p>
                  <p><strong>Contractor:</strong> {selectedProject.contractor}</p>
                  <p><strong>Location:</strong> {selectedProject.location}</p>
                </div>
                <button className="close-button" onClick={() => setShowDetailsModal(false)}>Close</button>
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
                  <div className="modal-actions">
                    <button type="submit" className="save-button">Save Changes</button>
                    <button type="button" className="cancel-button" onClick={() => setShowUpdateModal(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
      <div className="chatbot-wrapper" style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '300px',
        height: '400px',
        zIndex: 1000,
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <Chatbot />
      </div>
    </div>
  );
};

export default ProjectManagement;