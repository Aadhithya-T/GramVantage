import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Programs = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
// Remove unused state since selectedProgram is not currently being used

  const programCategories = [
    { id: 'all', name: 'All Programs' },
    { id: 'skill', name: 'Skill Development' },
    { id: 'health', name: 'Healthcare' },
    { id: 'education', name: 'Education' },
    { id: 'environment', name: 'Environment' }
  ];

  const programs = [
    {
      id: 1,
      category: 'skill',
      title: 'Skill Development Program',
      description: 'Empowering youth through vocational training and skill development workshops.',
      participants: 150,
      duration: '6 months',
      status: 'Active',
      impact: 'Improved employability for local youth',
      location: 'Multiple Centers',
      coordinator: 'Priya Sharma'
    },
    {
      id: 2,
      category: 'health',
      title: 'Community Health Initiative',
      description: 'Providing healthcare services and awareness programs in rural areas.',
      participants: 300,
      duration: 'Ongoing',
      status: 'Active',
      impact: 'Better healthcare access for 5 villages',
      location: 'Rural Health Centers',
      coordinator: 'Dr. Rajesh Kumar'
    },
    {
      id: 3,
      category: 'education',
      title: 'Rural Education Support',
      description: 'Supporting rural schools with resources and teaching assistance.',
      participants: 200,
      duration: '12 months',
      status: 'Active',
      impact: 'Improved education quality in 8 schools',
      location: 'Rural Schools',
      coordinator: 'Amit Patel'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/');
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const filteredPrograms = selectedCategory === 'all'
    ? programs
    : programs.filter(program => program.category === selectedCategory);

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
                  <p>NGO User</p>
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
              <li className="menu-item" onClick={() => navigate('/dashboard/ngo')}>Dashboard</li>
              <li className="menu-item active" onClick={() => navigate('/programs')}>Programs</li>
              <li className="menu-item" onClick={() => navigate('/ngo-collaboration')}>Collaborations among NGO</li>
              <li className="menu-item" onClick={() => navigate('/community')}>Community Network</li>
            </ul>
          </nav>

          <div className="program-categories">
            <h3>Program Categories</h3>
            <ul>
              {programCategories.map(category => (
                <li
                  key={category.id}
                  className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="main-content">
          <div className="welcome-section">
            <h2>Program Management</h2>
            <p>View and manage your organization's programs</p>
            <button className="new-program-btn">+ Create New Program</button>
          </div>

          <div className="programs-grid">
            {filteredPrograms.map(program => (
              <div
                key={program.id}
                className="program-card"
                onClick={() => navigate(`/program/${program.id}`)}
              >
                <h3>{program.title}</h3>
                <span className="status-badge">{program.status}</span>
                <p className="program-description">{program.description}</p>
                <div className="program-details">
                  <div className="detail-item">
                    <span className="label">Participants:</span>
                    <span className="value">{program.participants}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Duration:</span>
                    <span className="value">{program.duration}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Location:</span>
                    <span className="value">{program.location}</span>
                  </div>
                </div>
                <div className="program-footer">
                  <span className="coordinator">Coordinator: {program.coordinator}</span>
                  <button className="view-details-btn">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Programs;