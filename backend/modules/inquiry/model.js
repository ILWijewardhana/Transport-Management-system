const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    bookingUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: [true, "Booking user ID is required"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    type: {
      type: String,
      required: [true, "Inquiry type is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["resolved", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

module.exports = Inquiry;
