// routes/vProfileRoutes.js
const express = require("express");
const vProfileController = require("./controller");

const router = express.Router();

// Create a new vehicle profile
router.post("/", vProfileController.createProfile);

// Get all vehicle profiles
router.get("/", vProfileController.getAllProfiles);

// Get a specific vehicle profile by ID
router.get("/:id", vProfileController.getProfileById);

// Update a specific vehicle profile by ID
router.put("/:id", vProfileController.updateProfile);

// Delete a specific vehicle profile by ID
router.delete("/:id", vProfileController.deleteProfile);

module.exports = router;
