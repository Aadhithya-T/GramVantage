const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const JobApplication = require("../models/JobApplication");
const { auth, authorize } = require("../middleware/auth");

// GET all jobs (public)
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a job (officials only)
router.post("/", auth, authorize(["official"]), async (req, res) => {
  try {
    const {
      title,
      department,
      location,
      type,
      salary,
      requirements,
      deadline,
      status,
    } = req.body;
    if (
      !title ||
      !department ||
      !location ||
      !salary ||
      !requirements ||
      !deadline
    ) {
      return res.status(400).json({ message: "Required fields are missing" });
    }
    const job = new Job({
      title,
      department,
      location,
      type,
      salary,
      requirements,
      deadline,
      status,
      createdBy: req.user._id,
    });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a job (officials only)
router.delete("/:id", auth, authorize(["official"]), async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    await JobApplication.deleteMany({ job: req.params.id });
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST apply to a job (citizens only)
router.post("/:id/apply", auth, authorize(["citizen"]), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.status === "Closed") {
      return res.status(400).json({ message: "This job is closed" });
    }
    const existing = await JobApplication.findOne({
      job: req.params.id,
      applicant: req.user._id,
    });
    if (existing) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }
    const application = new JobApplication({
      job: req.params.id,
      applicant: req.user._id,
      name: req.user.name,
      mobile: req.user.mobile,
    });
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET citizen's own job applications
router.get("/my/applications", auth, authorize(["citizen"]), async (req, res) => {
  try {
    const applications = await JobApplication.find({
      applicant: req.user._id,
    }).populate("job", "title department type status");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET applications for a specific job (officials only)
router.get("/:id/applications", auth, authorize(["official"]), async (req, res) => {
  try {
    const applications = await JobApplication.find({
      job: req.params.id,
    }).sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH approve or reject a job application (officials only)
router.patch("/:id/applications/:appId", auth, authorize(["official"]), async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const application = await JobApplication.findByIdAndUpdate(
      req.params.appId,
      { status },
      { new: true }
    );
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
