import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OfficialDashboard.css";
import { motion, AnimatePresence } from "framer-motion";

const OfficialDashboard = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(null);
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({
    projects: { count: 0, budget: 0 },
    schemes: { count: 0, pending: 0 },
    collaborations: { count: 0, messages: 0 },
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Simulating API calls with setTimeout
        const data = await new Promise((resolve) =>
          setTimeout(() => {
            resolve({
              projects: { count: 15, budget: 4.3 },
              schemes: { count: 8, pending: 105 },
              collaborations: { count: 5, messages: 2 },
              activities: [
                {
                  id: 1,
                  date: "Today",
                  text: "Approved 5 new scheme applications",
                  type: "approval",
                },
                {
                  id: 2,
                  date: "Yesterday",
                  text: "Updated progress for Road Development Project",
                  type: "update",
                },
                {
                  id: 3,
                  date: "2 days ago",
                  text: "Generated monthly progress report",
                  type: "report",
                },
                {
                  id: 4,
                  date: "3 days ago",
                  text: "New collaboration request from NGO",
                  type: "collaboration",
                },
                {
                  id: 5,
                  date: "4 days ago",
                  text: "Budget allocation updated for Q2",
                  type: "budget",
                },
              ],
            });
          }, 1500),
        );

        setStats({
          projects: data.projects,
          schemes: data.schemes,
          collaborations: data.collaborations,
        });
        setActivities(data.activities);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Set up periodic refresh every 5 minutes
    const refreshInterval = setInterval(fetchDashboardData, 300000);
    return () => clearInterval(refreshInterval);
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case "approval":
        return "✅";
      case "update":
        return "🔄";
      case "report":
        return "📊";
      case "collaboration":
        return "🤝";
      case "budget":
        return "💰";
      default:
        return "📝";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/");
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };
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
                className="menu-item active"
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
            <h2>Welcome, Official!</h2>
            <p>Manage and monitor gram panchayat activities efficiently.</p>
          </div>

          <motion.div
            className="dashboard-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className={`dashboard-card ${activeCard === "projects" ? "active" : ""}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveCard("projects");
                setTimeout(() => navigate("/project-management"), 200);
              }}
            >
              <h3>Project and Budget Analysis</h3>
              <div className="card-content">
                <motion.p
                  className="stat"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {stats.projects.count}
                </motion.p>
                <p>Active Projects</p>
                <p className="description">
                  Total budget: ₹{stats.projects.budget} Crore
                </p>
              </div>
            </motion.div>

            <motion.div
              className={`dashboard-card ${activeCard === "schemes" ? "active" : ""}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveCard("schemes");
                setTimeout(() => navigate("/scheme-admin"), 200);
              }}
            >
              <h3>Scheme Administration</h3>
              <div className="card-content">
                <motion.p
                  className="stat"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {stats.schemes.count}
                </motion.p>
                <p>Active Schemes</p>
                <p className="description">
                  {stats.schemes.pending} pending applications
                </p>
              </div>
            </motion.div>

            <motion.div
              className={`dashboard-card ${activeCard === "collab" ? "active" : ""}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveCard("collab");
                setTimeout(() => navigate("/collaboration"), 200);
              }}
            >
              <h3>Collaboration</h3>
              <div className="card-content">
                <motion.p
                  className="stat"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {stats.collaborations.count}
                </motion.p>
                <p>Active Collaborations</p>
                <p className="description">
                  {stats.collaborations.messages} new messages
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="recent-activity"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3>Recent Activity</h3>
            <AnimatePresence>
              {loading ? (
                <motion.div
                  className="loading-spinner"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Loading activities...
                </motion.div>
              ) : (
                <motion.div className="activity-list">
                  {activities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      className={`activity-item ${activity.type}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="activity-icon">
                        {getActivityIcon(activity.type)}
                      </span>
                      <span className="activity-date">{activity.date}</span>
                      <p>{activity.text}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default OfficialDashboard;
