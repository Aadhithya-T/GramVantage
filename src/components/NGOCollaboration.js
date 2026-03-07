import React, { useState } from 'react';
import './NGOCollaboration.css';

const NGOCollaboration = () => {
  const [activeTab, setActiveTab] = useState('projects');

  const projects = [
    {
      id: 1,
      title: 'Community Development Initiative',
      status: 'In Progress',
      partners: ['Local Youth Group', 'Education Trust'],
      progress: 65,
      description: 'Working on improving local infrastructure and education facilities'
    },
    {
      id: 2,
      title: 'Rural Healthcare Program',
      status: 'Planning',
      partners: ['Medical Association', 'Health Foundation'],
      progress: 30,
      description: 'Setting up mobile health clinics in remote areas'
    }
  ];

  const resources = [
    {
      id: 1,
      type: 'Volunteer',
      name: 'Skill Training Workshop',
      availability: 'Weekends',
      requirements: 'Experience in teaching/training'
    },
    {
      id: 2,
      type: 'Equipment',
      name: 'Mobile Medical Unit',
      availability: 'On Request',
      requirements: 'Licensed medical professionals'
    }
  ];

  const impacts = [
    {
      id: 1,
      metric: 'People Benefited',
      value: '1,200+',
      period: 'Last Quarter'
    },
    {
      id: 2,
      metric: 'Projects Completed',
      value: '8',
      period: 'This Year'
    }
  ];

  return (
    <div className="ngo-collaboration">
      <h2>NGO Collaboration Hub</h2>
      <p className="subtitle">Connect, Share Resources, and Track Impact</p>

      <div className="ngo-tabs">
        <button
          className={`ngo-tab ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button
          className={`ngo-tab ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          Resources
        </button>
        <button
          className={`ngo-tab ${activeTab === 'impact' ? 'active' : ''}`}
          onClick={() => setActiveTab('impact')}
        >
          Impact Tracking
        </button>
      </div>

      <div className="ngo-content">
        {activeTab === 'projects' && (
          <div className="projects-section">
            <button className="new-project-btn">+ New Project</button>
            <div className="projects-grid">
              {projects.map(project => (
                <div key={project.id} className="project-card">
                  <h3>{project.title}</h3>
                  <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                    {project.status}
                  </span>
                  <p>{project.description}</p>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${project.progress}%` }}
                    />
                    <span className="progress-text">{project.progress}% Complete</span>
                  </div>
                  <div className="partners">
                    <h4>Partners:</h4>
                    <div className="partner-tags">
                      {project.partners.map((partner, index) => (
                        <span key={index} className="partner-tag">{partner}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="resources-section">
            <button className="share-resource-btn">+ Share Resource</button>
            <div className="resources-grid">
              {resources.map(resource => (
                <div key={resource.id} className="resource-card">
                  <div className="resource-type">{resource.type}</div>
                  <h3>{resource.name}</h3>
                  <div className="resource-details">
                    <p><strong>Availability:</strong> {resource.availability}</p>
                    <p><strong>Requirements:</strong> {resource.requirements}</p>
                  </div>
                  <button className="request-btn">Request Access</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="impact-section">
            <div className="impact-grid">
              {impacts.map(impact => (
                <div key={impact.id} className="impact-card">
                  <h3>{impact.metric}</h3>
                  <div className="impact-value">{impact.value}</div>
                  <p className="impact-period">{impact.period}</p>
                </div>
              ))}
            </div>
            <div className="impact-chart">
              {/* Add chart component here */}
              <div className="chart-placeholder">
                Impact Visualization Chart
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NGOCollaboration;