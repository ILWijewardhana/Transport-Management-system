const express = require("express");
const incomeController = require("./controller");
const router = express.Router();

router.post("/", incomeController.createIncome);
router.get("/", incomeController.getAllIncomes);
router.get("/:id", incomeController.getIncomeById);
router.put("/:id", incomeController.updateIncome);
router.delete("/:id", incomeController.deleteIncome);
router.get("/driver/:driverEmail", incomeController.getIncomesByDriverEmail);
router.patch("/:id/status", incomeController.updateIncomeStatus);

module.exports = router;
