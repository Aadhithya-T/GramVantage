const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
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
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
