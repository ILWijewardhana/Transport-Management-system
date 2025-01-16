const express = require("express");
const inventoryController = require("./controller");
const router = express.Router();

router.post("/", inventoryController.createItem);
router.get("/", inventoryController.getAllItems);
router.get("/:id", inventoryController.getItemById);
router.put("/:id", inventoryController.updateItem);
router.delete("/:id", inventoryController.deleteItem);
router.get("/itemid/:itemId", inventoryController.getItemByItemId);
router.patch("/:id/stock", inventoryController.updateStock);

module.exports = router;
