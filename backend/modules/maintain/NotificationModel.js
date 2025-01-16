const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    vehicleNumber: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    partReplace: {
        type: String,
        required: true,
    },
    repairCost: {
        type: Number,
        required: true,
    },
    employeeID: {
        type: String,
        required: true,
    },
    employeeName: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Notification", notificationSchema);
