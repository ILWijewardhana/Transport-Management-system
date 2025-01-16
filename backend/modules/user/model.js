const mongoose = require("mongoose");

// Utility function to validate time format (HH:MM:SS)
function isValidTimeFormat(time) {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/;
  return timeRegex.test(time);
}

// Define the User schema
const userSchema = new mongoose.Schema({
  driverId: { type: String, required: true },
  driverName: { type: String, required: true },
  basicSalary: { type: Number, required: true },
  overtimeHours: { type: String, required: true },
  overtimeRate: { type: Number, required: true },
  presentDays: { type: Number, required: true },
  advance: { type: Number, required: true },
  netPay: { type: Number, default: 0 },
});

// Method to calculate overtime payment
userSchema.methods.calculateOvertimePayment = function () {
  if (!isValidTimeFormat(this.overtimeHours)) {
    throw new Error("Invalid time format for overtime hours");
  }

  const [hours, minutes, seconds] = this.overtimeHours.split(":").map(Number);
  const totalOvertimeHours = hours + minutes / 60 + seconds / 3600;
  return totalOvertimeHours * this.overtimeRate;
};

// Method to calculate net pay
userSchema.methods.calculateNetPay = function () {
  const overtimePayment = this.calculateOvertimePayment();
  return this.basicSalary + overtimePayment - this.advance;
};

// Create and export the User model
module.exports = mongoose.model("User", userSchema);
