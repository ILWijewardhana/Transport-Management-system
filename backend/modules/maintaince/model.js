const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meintenanceSchema = new Schema({
  serviceID: {
    type: String, //dataType
    required: true, //validate
  },
  vehicleNumber: {
    type: String, //dataType
    required: true, //validate
  },
  serviceDate: {
    type: Date, //dataType
    required: true, //validate
  },
  serviceType: {
    type: String, //dataType
    required: true, //validate
  },
  serviceStatus: {
    type: String, //dataType
    required: true, //validate
  },
});

module.exports = mongoose.model(
  "MaintenanceModel", //fill services
  meintenanceSchema //function schema
);
