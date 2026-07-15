const mongoose = require("mongoose");

const AgriAppointmentSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    farmerName: { type: String, required: true },
    farmerMobile: { type: String, required: true },
    reason: { type: String, required: true },
    appointmentDate: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AgriAppointment", AgriAppointmentSchema);
