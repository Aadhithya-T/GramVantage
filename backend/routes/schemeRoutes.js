const express = require("express");
const router = express.Router();
const Scheme = require("../models/Scheme");
const { auth } = require("../middleware/auth");

// Seed default schemes if collection is empty
const seedSchemes = async () => {
  const count = await Scheme.countDocuments();
  if (count === 0) {
    await Scheme.insertMany([
      {
        name: "PM Kishan Saman Nidhi",
        description:
          "Provides direct income support to small and marginal farmers through bank transfers",
        eligibility: "Farmers with cultivable land",
        deadline: "Ongoing",
        status: "Open",
        portalUrl: "https://pmkisan.gov.in/",
      },
      {
        name: "National Rural Health Mission",
        description:
          "Aims to provide accessible, affordable, and quality healthcare to rural populations",
        eligibility: "All Rural Residents",
        deadline: "Ongoing",
        status: "Open",
        portalUrl: "https://nhm.gov.in/",
      },
      {
        name: "Sarva Shiksha Abhyan",
        description:
          "Focused on universalizing elementary education for all children",
        eligibility: "Students of age 6-14",
        deadline: "Ongoing",
        status: "Open",
        portalUrl: "https://www.education.gov.in/en/ssa",
      },
    ]);
    console.log("Schemes seeded successfully");
  }
};

seedSchemes();

// GET all schemes (public)
router.get("/", async (req, res) => {
  try {
    const schemes = await Scheme.find().sort({ createdAt: -1 });
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST add a new scheme (officials only)
router.post("/", auth, async (req, res) => {
  try {
    const { name, description, eligibility, deadline, status, portalUrl } =
      req.body;

    if (!name || !description || !eligibility || !portalUrl) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const scheme = new Scheme({
      name,
      description,
      eligibility,
      deadline,
      status,
      portalUrl,
    });

    await scheme.save();
    res.status(201).json(scheme);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a scheme (officials only)
router.delete("/:id", auth, async (req, res) => {
  try {
    await Scheme.findByIdAndDelete(req.params.id);
    res.json({ message: "Scheme deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
