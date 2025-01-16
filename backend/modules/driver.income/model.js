const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  incomeId: { type: String, required: true },
  driverEmail: { type: String, required: true },
  incomeDate: { type: Date, required: true },
  incomeTime: { type: String, required: true },
  incomeAmount: { type: Number, required: true },
  incomeDescription: { type: String, required: true },
  incomeSlipImage: { type: String, required: true },
  status: { type: String, required: true, default: "pending" },
  rejectionReason: { type: String, default: "No Data" },
});

module.exports = mongoose.model("Income", incomeSchema);
