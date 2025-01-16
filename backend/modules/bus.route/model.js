const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
});

const busRouteSchema = new mongoose.Schema({
  routeNumber: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  stops: [stopSchema],
});

const BusRoute = mongoose.model("BusRoute", busRouteSchema);

module.exports = BusRoute;
