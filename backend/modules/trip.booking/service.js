const TripBooking = require("./model");

// Create a new trip booking
const createTripBooking = async (tripData) => {
  try {
    const newTrip = new TripBooking(tripData);
    return await newTrip.save();
  } catch (error) {
    throw error;
  }
};

// Get all trip bookings
const getAllTripBookings = async () => {
  try {
    return await TripBooking.find({ deleteStatus: false });
  } catch (error) {
    throw error;
  }
};

// Get a trip booking by ID
const getTripBookingById = async (id) => {
  try {
    return await TripBooking.findById(id);
  } catch (error) {
    throw error;
  }
};

// Update a trip booking
const updateTripBooking = async (id, updateData) => {
  try {
    return await TripBooking.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    throw error;
  }
};

// Delete (soft delete) a trip booking
const deleteTripBooking = async (id) => {
  try {
    return await TripBooking.findByIdAndUpdate(
      id,
      { deleteStatus: true },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTripBooking,
  getAllTripBookings,
  getTripBookingById,
  updateTripBooking,
  deleteTripBooking,
};
