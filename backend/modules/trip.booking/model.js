const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripBookingSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    numberOfSeats: {
      type: Number,
      required: true,
    },
    busNumber: {
      type: String,
      required: true,
    },
    totalDistance: {
      type: Number,
      required: true,
    },
    totalDays: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paidStatus: {
      type: Boolean,
      default: false,
    },
    deleteStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const TripBooking = mongoose.model("TripBooking", tripBookingSchema);

module.exports = TripBooking;
