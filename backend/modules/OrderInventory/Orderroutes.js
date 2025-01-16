const express = require("express");
const router = express.Router();
const Ordercontroller = require("./Ordercontrollers.js"); // Corrected import

// Route to get all orders
router.get("/", Ordercontroller.getAllOrders);
router.post("/", Ordercontroller.addorders); // Using the correct controller
router.get("/:id",Ordercontroller.getById);
router.delete("/:id",Ordercontroller.deleteorder);

// Export the router
module.exports = router;
