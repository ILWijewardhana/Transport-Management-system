const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const repairSchema = new Schema({
    repairID: {
        type: String,
        required: true,
    },
    repairNumber: {
        type: String,
        required: true,
    },
    repairDate: {
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
    repairStatus: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Repair", repairSchema); // "Repair" will be the collection name in MongoDB
