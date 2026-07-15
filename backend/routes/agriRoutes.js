const express = require("express");
const router = express.Router();
const AgriAppointment = require("../models/AgriAppointment");
const { auth, authorize } = require("../middleware/auth");

// POST schedule appointment (farmers only)
router.post("/appointments", auth, authorize(["citizen"]), async (req, res) => {
  try {
    const { reason, appointmentDate } = req.body;
    if (!reason || !appointmentDate) {
      return res.status(400).json({ message: "Reason and appointment date are required" });
    }

    const appointment = new AgriAppointment({
      farmer: req.user._id,
      farmerName: req.user.name,
      farmerMobile: req.user.mobile || "N/A",
      reason,
      appointmentDate,
    });

    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET citizen's own appointments (farmers only)
router.get("/appointments/my", auth, authorize(["citizen"]), async (req, res) => {
  try {
    const appointments = await AgriAppointment.find({
      farmer: req.user._id,
    }).sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all appointments (officials only)
router.get("/appointments", auth, authorize(["official"]), async (req, res) => {
  try {
    const appointments = await AgriAppointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH approve/reject an appointment (officials only)
router.patch("/appointments/:id", auth, authorize(["official"]), async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appointment = await AgriAppointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
