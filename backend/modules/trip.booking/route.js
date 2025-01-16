const express = require("express");
const router = express.Router();
const tripBookingController = require("./controller");

// Route to create a new trip booking
router.post("/", tripBookingController.createTripBooking);

// Route to get all trip bookings
router.get("/", tripBookingController.getAllTripBookings);

// Route to get a single trip booking by ID
router.get("/:id", tripBookingController.getTripBookingById);

// Route to update a trip booking by ID
router.put("/:id", tripBookingController.updateTripBooking);

// Route to delete (soft delete) a trip booking by ID
router.delete("/:id", tripBookingController.deleteTripBooking);

module.exports = router;
