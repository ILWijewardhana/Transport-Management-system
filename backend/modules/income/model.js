const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  incomeId: { type: String, required: true },
  incomeDate: { type: Date, required: true },
  incomeAmount: { type: Number, required: true },
  incomeDescription: { type: String, required: true },
});

module.exports = mongoose.model("BookingIncome", incomeSchema);
