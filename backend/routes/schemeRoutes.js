const express = require("express");
const router = express.Router();
const Scheme = require("../models/Scheme");
const Application = require("../models/Application");
const { auth, authorize } = require("../middleware/auth");

// GET all schemes (public)
router.get("/", async (req, res) => {
  try {
    const schemes = await Scheme.find().sort({ createdAt: -1 });
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new scheme (officials only)
router.post("/", auth, authorize(["official"]), async (req, res) => {
  try {
    const { name, description, eligibility, deadline, status } = req.body;
    if (!name || !description || !eligibility) {
      return res.status(400).json({ message: "Required fields are missing" });
    }
    const scheme = new Scheme({
      name,
      description,
      eligibility,
      deadline,
      status,
      createdBy: req.user._id,
    });
    await scheme.save();
    res.status(201).json(scheme);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a scheme (officials only)
router.delete("/:id", auth, authorize(["official"]), async (req, res) => {
  try {
    await Scheme.findByIdAndDelete(req.params.id);
    await Application.deleteMany({ scheme: req.params.id });
    res.json({ message: "Scheme deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST apply to a scheme (citizens only)
router.post("/:id/apply", auth, authorize(["citizen"]), async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) return res.status(404).json({ message: "Scheme not found" });
    if (scheme.status === "Closed")
      return res.status(400).json({ message: "This scheme is closed" });
    const existing = await Application.findOne({
      scheme: req.params.id,
      applicant: req.user._id,
    });
    if (existing)
      return res
        .status(400)
        .json({ message: "You have already applied to this scheme" });
    const application = new Application({
      scheme: req.params.id,
      applicant: req.user._id,
      name: req.user.name,
      aadhar: req.user.aadhar,
    });
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET applications for a scheme (officials only)
router.get(
  "/:id/applications",
  auth,
  authorize(["official"]),
  async (req, res) => {
    try {
      const applications = await Application.find({
        scheme: req.params.id,
      }).sort({ createdAt: -1 });
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

// PATCH approve or reject an application (officials only)
router.patch(
  "/:id/applications/:appId",
  auth,
  authorize(["official"]),
  async (req, res) => {
    try {
      const { status } = req.body;
      if (!["Approved", "Rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      const application = await Application.findByIdAndUpdate(
        req.params.appId,
        { status },
        { new: true },
      );
      if (!application)
        return res.status(404).json({ message: "Application not found" });
      res.json(application);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
);

// GET citizen's own applications
router.get(
  "/my/applications",
  auth,
  authorize(["citizen"]),
  async (req, res) => {
    try {
      const applications = await Application.find({
        applicant: req.user._id,
      }).populate("scheme", "name status");
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
);

module.exports = router;
