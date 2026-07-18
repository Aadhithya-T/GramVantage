import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const ProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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

  const program = programs.find(p => p.id === parseInt(id));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/');
  };

  if (!program) {
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-left">
            <img src="/logo.png" alt="Logo" className="logo" />
            <h1 className="app-name">GramVantage</h1>
          </div>
          <div className="header-right">
            <button className="logout-button" onClick={() => navigate('/programs')}>Back to Programs</button>
          </div>
        </header>
        <div className="dashboard-content" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
          <div className="dashboard-card" style={{ padding: '40px', textAlign: 'center', maxWidth: '500px' }}>
            <h2>Program Not Found</h2>
            <p>The program you are looking for does not exist or has been removed.</p>
            <button className="primary-button" style={{ marginTop: '20px' }} onClick={() => navigate('/programs')}>
              Back to Programs
            </button>
          </div>
        </div>
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
            <span className="user-profile" onClick={() => setShowProfileMenu(!showProfileMenu)}>👤</span>
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
        </aside>

        <main className="main-content">
          <div className="welcome-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2>{program.title}</h2>
              <p>Detailed view and statistics for this program.</p>
            </div>
            <button className="primary-button" onClick={() => navigate('/programs')}>
              ← Back to Programs
            </button>
          </div>

          <div className="dashboard-card" style={{ padding: '30px', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px' }}>
              <span className="status-badge" style={{ backgroundColor: '#2ecc71', color: '#fff', padding: '6px 12px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' }}>
                {program.status}
              </span>
              <span style={{ color: '#666', fontSize: '14px' }}>
                Category: <strong>{program.category.toUpperCase()}</strong>
              </span>
            </div>

            <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333', marginBottom: '30px' }}>
              {program.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ padding: '15px', border: '1px solid #f0f0f0', borderRadius: '6px', backgroundColor: '#fafafa' }}>
                <span style={{ display: 'block', fontSize: '12px', color: '#777', textTransform: 'uppercase', marginBottom: '5px' }}>Coordinator</span>
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>{program.coordinator}</span>
              </div>
              <div style={{ padding: '15px', border: '1px solid #f0f0f0', borderRadius: '6px', backgroundColor: '#fafafa' }}>
                <span style={{ display: 'block', fontSize: '12px', color: '#777', textTransform: 'uppercase', marginBottom: '5px' }}>Location</span>
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>{program.location}</span>
              </div>
              <div style={{ padding: '15px', border: '1px solid #f0f0f0', borderRadius: '6px', backgroundColor: '#fafafa' }}>
                <span style={{ display: 'block', fontSize: '12px', color: '#777', textTransform: 'uppercase', marginBottom: '5px' }}>Duration</span>
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>{program.duration}</span>
              </div>
              <div style={{ padding: '15px', border: '1px solid #f0f0f0', borderRadius: '6px', backgroundColor: '#fafafa' }}>
                <span style={{ display: 'block', fontSize: '12px', color: '#777', textTransform: 'uppercase', marginBottom: '5px' }}>Participants</span>
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>{program.participants}</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#2c3e50' }}>Impact Statement</h3>
              <p style={{ fontSize: '15px', color: '#555', fontStyle: 'italic', backgroundColor: '#eefcf2', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #2ecc71' }}>
                "{program.impact}"
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProgramDetail;
