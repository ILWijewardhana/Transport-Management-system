// controllers/tripBookingController.js
const { getUser } = require("../client/service");
const sendMail = require("../mails/mailsend");
const tripBookingService = require("./service");

// Create a new trip booking
const createTripBooking = async (req, res) => {
  try {
    const tripData = req.body;
    try {
      const user = await getUser(tripData.userId);
      if (user) {
        await sendMail(
          user.email,
          "New Trip Booking Created",
          `Dear ${user?.username},We received your booking, we will get backe to you soon`
        );
      }
    } catch (error) {
      console.error(`Error sending emmail of booking ${error}`);
    }
    const newTrip = await tripBookingService.createTripBooking(tripData);
    return res.status(201).json(newTrip);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating trip booking", error });
  }
};

// Get all trip bookings
const getAllTripBookings = async (req, res) => {
  try {
    const trips = await tripBookingService.getAllTripBookings();
    return res.status(200).json(trips);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching trips", error });
  }
};

// Get a single trip booking by ID
const getTripBookingById = async (req, res) => {
  try {
    const tripId = req.params.id;
    const trip = await tripBookingService.getTripBookingById(tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    return res.status(200).json(trip);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching trip", error });
  }
};

// Update a trip booking by ID
const updateTripBooking = async (req, res) => {
  try {
    const tripId = req.params.id;
    const updateData = req.body;
    const updatedTrip = await tripBookingService.updateTripBooking(
      tripId,
      updateData
    );
    if (!updatedTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    return res.status(200).json(updatedTrip);
  } catch (error) {
    return res.status(500).json({ message: "Error updating trip", error });
  }
};

// Delete (soft delete) a trip booking by ID
const deleteTripBooking = async (req, res) => {
  try {
    const tripId = req.params.id;
    const deletedTrip = await tripBookingService.deleteTripBooking(tripId);
    if (!deletedTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    return res.status(200).json({ message: "Trip deleted", deletedTrip });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting trip", error });
  }
};

module.exports = {
  createTripBooking,
  getAllTripBookings,
  getTripBookingById,
  updateTripBooking,
  deleteTripBooking,
};
