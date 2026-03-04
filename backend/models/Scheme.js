const mongoose = require("mongoose");

const SchemeSchema = new mongoose.Schema({
  name: String,
  status: String,
  beneficiaries: Number,
  budget: String,
  pendingApplications: Number
});

module.exports = mongoose.model("Scheme", SchemeSchema);
