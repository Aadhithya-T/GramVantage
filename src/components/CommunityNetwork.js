import React, { useState } from 'react';
import './CommunityNetwork.css';

const CommunityNetwork = () => {
  const [activeSection, setActiveSection] = useState('members');

  const members = [
    {
      id: 1,
      name: 'Local Youth Association',
      role: 'Community Partner',
      expertise: 'Youth Empowerment',
      activeProjects: 3,
      impact: '500+ youth trained'
    },
    {
      id: 2,
      name: 'Rural Health Initiative',
      role: 'Healthcare Partner',
      expertise: 'Medical Camps',
      activeProjects: 2,
      impact: '1000+ patients served'
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Community Health Camp',
      date: '2024-03-15',
      location: 'Village Community Hall',
      participants: 45,
      status: 'Upcoming'
    },
    {
      id: 2,
      title: 'Skill Development Workshop',
      date: '2024-03-20',
      location: 'Training Center',
      participants: 30,
      status: 'Open for Registration'
    }
  ];

  const resources = [
    {
      id: 1,
      type: 'Training Material',
      name: 'Digital Literacy Curriculum',
      sharedBy: 'Tech Education Foundation',
      downloads: 125
    },
    {
      id: 2,
      type: 'Healthcare Kit',
      name: 'First Aid Training Kit',
      sharedBy: 'Medical Association',
      downloads: 75
    }
  ];

  return (
    <div className="community-network">
      <h2>Community Network</h2>
      <p className="subtitle">Connect, Collaborate, and Create Impact Together</p>

      <div className="network-tabs">
        <button
          className={`network-tab ${activeSection === 'members' ? 'active' : ''}`}
          onClick={() => setActiveSection('members')}
        >
          Network Members
        </button>
        <button
          className={`network-tab ${activeSection === 'events' ? 'active' : ''}`}
          onClick={() => setActiveSection('events')}
        >
          Events
        </button>
        <button
          className={`network-tab ${activeSection === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveSection('resources')}
        >
          Shared Resources
        </button>
      </div>

      <div className="network-content">
        {activeSection === 'members' && (
          <div className="members-section">
            <button className="add-member-btn">+ Add Member</button>
            <div className="members-grid">
              {members.map(member => (
                <div key={member.id} className="member-card">
                  <div className="member-header">
                    <h3>{member.name}</h3>
                    <span className="role-badge">{member.role}</span>
                  </div>
                  <div className="member-details">
                    <p><strong>Expertise:</strong> {member.expertise}</p>
                    <p><strong>Active Projects:</strong> {member.activeProjects}</p>
                    <p><strong>Impact:</strong> {member.impact}</p>
                  </div>
                  <button className="connect-btn">Connect</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'events' && (
          <div className="events-section">
            <button className="create-event-btn">+ Create Event</button>
            <div className="events-grid">
              {events.map(event => (
                <div key={event.id} className="event-card">
                  <h3>{event.title}</h3>
                  <div className="event-details">
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Participants:</strong> {event.participants}</p>
                  </div>
                  <span className={`event-status ${event.status.toLowerCase().replace(' ', '-')}`}>
                    {event.status}
                  </span>
                  <button className="register-btn">Register Now</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'resources' && (
          <div className="resources-section">
            <button className="share-resource-btn">+ Share Resource</button>
            <div className="resources-grid">
              {resources.map(resource => (
                <div key={resource.id} className="resource-card">
                  <div className="resource-type">{resource.type}</div>
                  <h3>{resource.name}</h3>
                  <p className="shared-by">Shared by: {resource.sharedBy}</p>
                  <div className="resource-stats">
                    <span className="downloads">{resource.downloads} downloads</span>
                  </div>
                  <button className="download-btn">Download</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityNetwork;