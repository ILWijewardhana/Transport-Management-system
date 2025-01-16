const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    vehicleNo: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    timeDuration: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    licenseExp: {
      type: Date,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
