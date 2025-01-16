const express = require("express");
const router = express.Router();
const RepairController = require("./RepairControle");

// Repair routes
router.get("/", RepairController.getAllRepairs);
router.post("/", RepairController.addRepairs);
router.get("/:id", RepairController.getById);
router.put("/:id", RepairController.updateRepair);
router.delete("/:id", RepairController.deleteRepair);

// Export the router
module.exports = router;
