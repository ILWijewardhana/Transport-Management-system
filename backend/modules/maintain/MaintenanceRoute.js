const express =require("express");
const router=express.Router();

const MaintenanceControler =require("./MaintenanceController.js");

router.get("/",MaintenanceControler.getAllMaintenances);
router.post("/",MaintenanceControler.addMaintenances);
router.get("/:id",MaintenanceControler.getById);
router.put("/:id",MaintenanceControler.updateMaintenance);
router.delete("/:id",MaintenanceControler.deleteMaintenance);



//export
module.exports=router;