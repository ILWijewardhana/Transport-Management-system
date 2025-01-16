const express = require("express");
const router = express.Router();
const BreakdownController = require("./BreakdownControle");

// Breakdown routes
router.get("/", BreakdownController.getAllBreakdowns);
router.post("/", BreakdownController.addBreakdown);
router.get("/:id", BreakdownController.getById);
router.put("/:id", BreakdownController.updateBreakdown);
router.delete("/:id", BreakdownController.deleteBreakdown);

// Export the router
module.exports = router;
