const express = require("express");
const router = express.Router();
//insert user controller
const Inventorycontroller = require("./Inventorycontrollers.js");

router.get("/",Inventorycontroller.getAllInventories);
router.post("/",Inventorycontroller.addinventories);
router.get("/:id",Inventorycontroller.getById);
router.put("/:id",Inventorycontroller.updateinventory);
router.delete("/:id",Inventorycontroller.deleteinventory);

//export
module.exports = router;