const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderschema = new schema({
  Driver_ID: {
    type: String,
    required: true, // validate
  },
  Driver_Name: {
    type: String,
    required: true, // validate
  },
  Vehicle_NO: {
    type: String,
    required: true, // validate
  },
  Item_ID: {
    type: String,
    required: true, // validate
  },
  Item_Name: {
    type: String,
    required: true, // validate
  },
  Size: {
    type: String,
    required: true, // validate
  },
  Type: {
    type: String,
    required: true, // validate
  },
});

module.exports = mongoose.model("Ordermodel", orderschema);
