import React from "react";
import { useNavigate } from "react-router-dom";

const OfficialSidebar = ({ activeItem }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard/official" },
    { name: "Project and Budget Analysis", path: "/project-management" },
    { name: "Scheme Administration", path: "/scheme-admin" },
    { name: "Collaboration", path: "/collaboration" },
    { name: "Job Management", path: "/job-management" },
    { name: "Agri Appointments", path: "/agri-admin" },
  ];

  return (
    <aside className="dashboard-sidebar">
      <nav className="sidebar-menu">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={`menu-item ${activeItem === item.name ? "active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default OfficialSidebar;
