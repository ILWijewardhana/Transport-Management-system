const mongoose = require("mongoose");

const expenceSchema = new mongoose.Schema({
  expensesId: { type: String },
  driverEmail: { type: String, required: true },
  paymentDate: { type: Date, required: true },
  paymentTime: { type: String, required: true },
  paymentAmount: { type: Number, required: true },
  paymentDescription: { type: String, required: true },
  paymentSlip: { type: String, required: true },
  status: { type: String, required: true, default: "pending" },
  rejectionReason: { type: String, default: "No Data" },
});

module.exports = mongoose.model("expence", expenceSchema);
