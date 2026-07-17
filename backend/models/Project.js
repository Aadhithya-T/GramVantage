const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: String, required: true },
    spent: { type: String, default: "₹0" },
    progress: { type: String, default: "0%" },
    status: {
      type: String,
      enum: ["In Progress", "Planning Phase", "Upcoming", "Approved", "Completed"],
      default: "Planning Phase",
    },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    contractor: { type: String, required: true },
    location: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
