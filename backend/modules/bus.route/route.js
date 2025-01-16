const express = require("express");
const router = express.Router();
const busRouteController = require("./controller");

router.get("/", busRouteController.getAllRoutes);
router.get("/:id", busRouteController.getRouteById);
router.post("/", busRouteController.createRoute);
router.put("/:id", busRouteController.updateRoute);
router.delete("/:id", busRouteController.deleteRoute);

module.exports = router;
