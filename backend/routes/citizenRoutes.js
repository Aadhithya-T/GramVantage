const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Scheme = require("../models/Scheme");
const Application = require("../models/Application");
const AgriAppointment = require("../models/AgriAppointment");
const Job = require("../models/Job");
const { auth, authorize } = require("../middleware/auth");

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

// GET citizen dashboard stats and activities (citizens only)
router.get("/dashboard-stats", auth, authorize(["citizen"]), async (req, res) => {
  try {
    const citizenId = req.user._id;

    // 1. Fetch counts for stats cards
    const appsCount = await Application.countDocuments({ applicant: citizenId });
    const jobsCount = await Job.countDocuments({ status: "Active" });
    const appointmentsCount = await AgriAppointment.countDocuments({ farmer: citizenId });
    const projectsCount = await Project.countDocuments();

    // 2. Fetch recent items for activity feed
    const myApplications = await Application.find({ applicant: citizenId })
      .populate("scheme")
      .sort({ updatedAt: -1 })
      .limit(5);

    const myAppointments = await AgriAppointment.find({ farmer: citizenId })
      .sort({ updatedAt: -1 })
      .limit(5);

    const recentSchemes = await Scheme.find({ status: "Open" })
      .sort({ createdAt: -1 })
      .limit(3);

    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(3);

    const activities = [];

    // Format applications activities
    myApplications.forEach((app) => {
      let statusText = "is pending review";
      if (app.status === "Approved") statusText = "has been approved";
      if (app.status === "Rejected") statusText = "was rejected";

      activities.push({
        id: `app-${app._id}`,
        date: formatDate(app.updatedAt),
        text: `Your application for "${app.scheme ? app.scheme.name : "Scheme"}" ${statusText}`,
        createdAt: app.updatedAt,
      });
    });

    // Format appointments activities
    myAppointments.forEach((appt) => {
      let statusText = "is pending review";
      if (appt.status === "Approved") statusText = "has been approved";
      if (appt.status === "Rejected") statusText = "was rejected";

      activities.push({
        id: `appt-${appt._id}`,
        date: formatDate(appt.updatedAt),
        text: `Your agricultural appointment on ${appt.appointmentDate} ${statusText}`,
        createdAt: appt.updatedAt,
      });
    });

    // Format new schemes announcements
    recentSchemes.forEach((sch) => {
      activities.push({
        id: `sch-${sch._id}`,
        date: formatDate(sch.createdAt),
        text: `New scheme announcement: "${sch.name}" is open for applications`,
        createdAt: sch.createdAt,
      });
    });

    // Format new projects announcements
    recentProjects.forEach((proj) => {
      activities.push({
        id: `proj-${proj._id}`,
        date: formatDate(proj.createdAt),
        text: `New community project launched: "${proj.name}" in ${proj.location}`,
        createdAt: proj.createdAt,
      });
    });

    // Sort chronologically (newest first)
    activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const finalActivities = activities.slice(0, 5);

    // Fallback static activities if no real events exist yet
    if (finalActivities.length === 0) {
      finalActivities.push(
        {
          id: "fallback-1",
          date: "Today",
          text: "Welcome to GramVantage! Start applying to village schemes to track status.",
          createdAt: new Date(),
        },
        {
          id: "fallback-2",
          date: "Yesterday",
          text: "Explore active community projects in your area on the Projects page.",
          createdAt: new Date(Date.now() - 86400000),
        }
      );
    }

    res.json({
      stats: {
        applications: appsCount,
        jobs: jobsCount,
        appointments: appointmentsCount,
        projects: projectsCount,
      },
      activities: finalActivities,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
