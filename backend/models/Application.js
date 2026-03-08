const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    scheme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scheme",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    aadhar: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

// Prevent duplicate applications
ApplicationSchema.index({ scheme: 1, applicant: 1 }, { unique: true });

module.exports = mongoose.model("Application", ApplicationSchema);
