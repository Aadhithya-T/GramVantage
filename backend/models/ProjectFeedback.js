const mongoose = require("mongoose");

const ProjectFeedbackSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    citizen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    citizenName: { type: String, required: true },
    feedbackText: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Reviewed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProjectFeedback", ProjectFeedbackSchema);
