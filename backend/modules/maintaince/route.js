const express = require("express");
const maintenanceController = require("./controller");
const router = express.Router();

router.post("/", maintenanceController.createService);
router.get("/", maintenanceController.getAllServices);
router.get("/:id", maintenanceController.getServiceById);
router.put("/:id", maintenanceController.updateService);
router.delete("/:id", maintenanceController.deleteService);
router.get(
  "/serviceId/:serviceId",
  maintenanceController.getServiceByServiceId
);
router.get(
  "/vehicle/:vehicleNumber",
  maintenanceController.getServicesByVehicleNumber
);
router.patch("/:id/status", maintenanceController.updateServiceStatus);

module.exports = router;
