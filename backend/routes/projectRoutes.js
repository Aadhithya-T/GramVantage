const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const { auth, authorize } = require("../middleware/auth");

// GET all projects (public)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a project (officials only)
router.post("/", auth, authorize(["official"]), async (req, res) => {
  try {
    const {
      name,
      description,
      budget,
      spent,
      progress,
      status,
      startDate,
      endDate,
      contractor,
      location,
    } = req.body;

    if (!name || !description || !budget || !startDate || !endDate || !contractor || !location) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const project = new Project({
      name,
      description,
      budget,
      spent: spent || "₹0",
      progress: progress || "0%",
      status: status || "Planning Phase",
      startDate,
      endDate,
      contractor,
      location,
      createdBy: req.user._id,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH update project progress/details (officials only)
router.patch("/:id", auth, authorize(["official"]), async (req, res) => {
  try {
    const { progress, spent, status } = req.body;
    const updateData = {};
    if (progress !== undefined) updateData.progress = progress;
    if (spent !== undefined) updateData.spent = spent;
    if (status !== undefined) updateData.status = status;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a project (officials only)
router.delete("/:id", auth, authorize(["official"]), async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const ProjectFeedback = require("../models/ProjectFeedback");

// POST submit feedback for a project (citizens only)
router.post("/:id/feedback", auth, authorize(["citizen"]), async (req, res) => {
  try {
    const { feedbackText } = req.body;
    if (!feedbackText || feedbackText.trim().length === 0) {
      return res.status(400).json({ message: "Feedback content is required" });
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const feedback = new ProjectFeedback({
      project: req.params.id,
      citizen: req.user._id,
      citizenName: req.user.name,
      feedbackText: feedbackText.trim(),
    });

    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully", feedback });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
