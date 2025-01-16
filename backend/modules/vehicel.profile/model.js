const mongoose = require("mongoose");

const vProfileSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true, // Vehicle type is required
  },
  description: {
    type: String,
    required: true, // Description is required
  },
  time: {
    type: String,
  },
  imageUrl: {
    type: String, // URL for an image (can be null or optional)
    required: true, // URL is required
  },
});

const vProfile = mongoose.model("vProfile", vProfileSchema);

module.exports = vProfile;
