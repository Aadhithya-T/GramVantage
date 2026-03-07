// src/components/HomePage.js
import React from "react";
import Slideshow from "./Slideshow";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage-container">
      {/* Header */}
      <header className="homepage-header">
        <div className="header-left">
          <img src="/logo.png" alt="Logo" className="logo" />
          <h1 className="app-name">GramVantage</h1>
        </div>
        <div className="header-right">
          <span className="notification-icon">🔔</span>
          <span className="notification-text">Notification</span>
        </div>
      </header>

      {/* Main Body */}
      <div className="homepage-body">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <nav className="sidebar-menu">
            <ul>
              <li>Schemes</li>
              <li>Jobs</li>
              <li>Agri-Connect</li>
              <li>Projects</li>
              <li>Crowdfunding</li>
            </ul>
          </nav>
        </aside>

        {/* Central Content */}
        <main className="main-content">
          <Slideshow />
          <div className="page-description">
            <p>
              Welcome to GramVantage! Here you can explore government schemes,
              find job opportunities, connect with the agricultural community,
              learn about local projects, and support crowdfunding initiatives.
              Everything is designed to empower our community in simple,
              accessible English.
            </p>
          </div>
        </main>

        {/* Right Sidebar - Chatbot */}
        <aside className="right-sidebar">
          <Chatbot />
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
