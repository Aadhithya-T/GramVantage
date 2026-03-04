const express = require("express");
const router = express.Router();
const Scheme = require("../models/Scheme");

// Get all schemes
router.get("/", async (req, res) => {
  try {
    const schemes = await Scheme.find();
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new scheme
router.post("/", async (req, res) => {
  const scheme = new Scheme(req.body);
  try {
    const newScheme = await scheme.save();
    res.status(201).json(newScheme);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
