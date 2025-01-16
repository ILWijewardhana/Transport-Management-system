// services/vProfileService.js
const vProfile = require("./model");

const vProfileService = {
  // Create new vehicle profile
  async createProfile(data) {
    try {
      const newProfile = new vProfile(data);
      return await newProfile.save();
    } catch (error) {
      throw new Error("Error creating vehicle profile: " + error.message);
    }
  },

  // Get all vehicle profiles
  async getAllProfiles() {
    try {
      return await vProfile.find();
    } catch (error) {
      throw new Error("Error fetching vehicle profiles: " + error.message);
    }
  },

  // Get a specific vehicle profile by ID
  async getProfileById(profileId) {
    try {
      return await vProfile.findById(profileId);
    } catch (error) {
      throw new Error("Error fetching vehicle profile: " + error.message);
    }
  },

  // Update a specific vehicle profile by ID
  async updateProfile(profileId, updateData) {
    try {
      return await vProfile.findByIdAndUpdate(profileId, updateData, {
        new: true, // Return the updated document
      });
    } catch (error) {
      throw new Error("Error updating vehicle profile: " + error.message);
    }
  },

  // Delete a specific vehicle profile by ID
  async deleteProfile(profileId) {
    try {
      return await vProfile.findByIdAndDelete(profileId);
    } catch (error) {
      throw new Error("Error deleting vehicle profile: " + error.message);
    }
  },
};

module.exports = vProfileService;
