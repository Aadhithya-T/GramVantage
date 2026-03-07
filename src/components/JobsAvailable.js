import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const JobsAvailable = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  const jobs = [
    {
      id: 1,
      title: 'Rural Development Officer',
      department: 'Panchayat Administration',
      location: 'Local Panchayat Office',
      type: 'Full-time',
      salary: '₹35,000 - ₹45,000 per month',
      requirements: 'Bachelor\'s degree in Rural Development or related field, 2+ years experience',
      deadline: '2024-03-25',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Agricultural Extension Worker',
      department: 'Agriculture',
      location: 'Various Villages',
      type: 'Full-time',
      salary: '₹28,000 - ₹35,000 per month',
      requirements: 'Diploma in Agriculture, Knowledge of local farming practices',
      deadline: '2024-04-10',
      status: 'Active'
    },
    {
      id: 3,
      title: 'Community Health Worker',
      department: 'Health & Sanitation',
      location: 'Primary Health Center',
      type: 'Part-time',
      salary: '₹18,000 - ₹22,000 per month',
      requirements: 'Healthcare certification, Good communication skills',
      deadline: '2024-03-30',
      status: 'Active'
    }
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <img src="/logo.png" alt="Logo" className="logo" />
          <h1 className="app-name">GramVantage</h1>
        </div>
        <div className="header-right">
          <span className="user-profile">👤</span>
          <button className="logout-button">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <nav className="sidebar-menu">
            <ul>
              <li className="menu-item" onClick={() => handleNavigation('/dashboard/citizen')}>Dashboard</li>
              <li className="menu-item" onClick={() => handleNavigation('/schemes')}>Available Schemes</li>
              <li className="menu-item active" onClick={() => handleNavigation('/jobs')}>Jobs Available</li>
              <li className="menu-item" onClick={() => handleNavigation('/agriculture')}>Agricultural connect</li>
              <li className="menu-item" onClick={() => handleNavigation('/projects')}>Projects</li>
              <li className="menu-item" onClick={() => handleNavigation('/crowdfunding')}>Crowd Funding</li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <div className="welcome-section">
            <h2>Available Jobs</h2>
            <p>Explore employment opportunities in your local government and community.</p>
          </div>

          <div className="jobs-list">
            {jobs.map(job => (
              <div key={job.id} className="job-card">
                <h3>{job.title}</h3>
                <div className="job-header">
                  <span className="department">{job.department}</span>
                  <span className="job-type">{job.type}</span>
                  <span className="status-badge">{job.status}</span>
                </div>
                <div className="job-details">
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Salary:</strong> {job.salary}</p>
                  <p><strong>Requirements:</strong> {job.requirements}</p>
                  <p><strong>Application Deadline:</strong> {job.deadline}</p>
                </div>
                <button className="apply-button">Apply Now</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobsAvailable;