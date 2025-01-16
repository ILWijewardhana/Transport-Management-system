const vProfileService = require("./service");

const vProfileController = {
  // Create a new vehicle profile
  async createProfile(req, res) {
    try {
      const profile = await vProfileService.createProfile(req.body);
      res.status(201).json(profile);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get all vehicle profiles
  async getAllProfiles(req, res) {
    try {
      const profiles = await vProfileService.getAllProfiles();
      res.status(200).json(profiles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a specific vehicle profile by ID
  async getProfileById(req, res) {
    try {
      const profile = await vProfileService.getProfileById(req.params.id);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a specific vehicle profile by ID
  async updateProfile(req, res) {
    try {
      const updatedProfile = await vProfileService.updateProfile(
        req.params.id,
        req.body
      );
      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.status(200).json(updatedProfile);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete a specific vehicle profile by ID
  async deleteProfile(req, res) {
    try {
      const deletedProfile = await vProfileService.deleteProfile(req.params.id);
      if (!deletedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = vProfileController;
