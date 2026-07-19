const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Scheme = require("../models/Scheme");
const Application = require("../models/Application");
const User = require("../models/User");
const AgriAppointment = require("../models/AgriAppointment");
const { auth, authorize } = require("../middleware/auth");

// Helper to parse budget strings to Crores
const parseValue = (valStr) => {
  if (!valStr) return 0;
  const clean = valStr.toString().replace(/[₹$,]/g, "").trim().toLowerCase();
  let num = parseFloat(clean);
  if (isNaN(num)) return 0;
  if (clean.includes("crore")) {
    return num;
  } else if (clean.includes("lakh")) {
    return num / 100;
  }
  if (num > 1000) {
    return num / 10000000;
  }
  return num;
};

// Helper to format dates for activity feed
const formatDate = (date) => {
  const d = new Date(date);
  const now = new Date();
  
  // Reset times to compare dates only
  const dDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffTime = nowDate - dDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays <= 7) {
    return `${diffDays} days ago`;
  }
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// GET dashboard statistics and activities (officials only)
router.get("/dashboard-stats", auth, authorize(["official"]), async (req, res) => {
  try {
    // 1. Project stats
    const projects = await Project.find();
    let totalBudget = 0;
    projects.forEach((p) => {
      totalBudget += parseValue(p.budget);
    });

    // 2. Scheme stats
    const schemesCount = await Scheme.countDocuments();
    const pendingSchemesCount = await Application.countDocuments({
      status: "Pending",
    });

    // 3. Collaboration stats (count NGO users)
    const ngoCount = await User.countDocuments({ userType: "ngo" });

    // 4. Dynamic Activities (limit recent entries to build chronological log)
    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5);
    const recentApplications = await Application.find()
      .populate("scheme")
      .sort({ createdAt: -1 })
      .limit(5);
    const recentAgriAppointments = await AgriAppointment.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const activities = [];

    recentProjects.forEach((p) => {
      activities.push({
        id: `project-${p._id}`,
        date: formatDate(p.createdAt),
        text: `New project registered: "${p.name}" in ${p.location}`,
        type: "update",
        createdAt: p.createdAt,
      });
    });

    recentApplications.forEach((app) => {
      activities.push({
        id: `app-${app._id}`,
        date: formatDate(app.createdAt),
        text: `Application by ${app.name} for "${
          app.scheme ? app.scheme.name : "Scheme"
        }" is pending approval`,
        type: "approval",
        createdAt: app.createdAt,
      });
    });

    recentAgriAppointments.forEach((appt) => {
      activities.push({
        id: `appt-${appt._id}`,
        date: formatDate(appt.createdAt),
        text: `Agricultural appointment request by Farmer "${appt.farmerName}"`,
        type: "collaboration",
        createdAt: appt.createdAt,
      });
    });

    // Sort all activities chronologically (newest first)
    activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const finalActivities = activities.slice(0, 5);

    // Fallback static activities if no real events exist yet
    if (finalActivities.length === 0) {
      finalActivities.push(
        {
          id: "fallback-1",
          date: "Today",
          text: "Welcome to GramVantage! Database connected successfully.",
          type: "report",
        },
        {
          id: "fallback-2",
          date: "Yesterday",
          text: "No recent activities recorded in the system database.",
          type: "update",
        }
      );
    }

    res.json({
      projects: {
        count: projects.length,
        budget: parseFloat(totalBudget.toFixed(2)),
      },
      schemes: {
        count: schemesCount,
        pending: pendingSchemesCount,
      },
      collaborations: {
        count: ngoCount,
        messages: 2, // simulated dynamic alert messages
      },
      activities: finalActivities,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
