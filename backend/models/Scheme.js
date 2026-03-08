const mongoose = require("mongoose");

const SchemeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    eligibility: { type: String, required: true },
    deadline: { type: String, default: "Ongoing" },
    status: { type: String, enum: ["Open", "Closed"], default: "Open" },
    portalUrl: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Scheme", SchemeSchema);
