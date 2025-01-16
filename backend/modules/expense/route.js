const express = require("express");
const expenseController = require("./controller");
const router = express.Router();

router.post("/", expenseController.createExpense);
router.get("/", expenseController.getAllExpenses);
router.get("/:id", expenseController.getExpenseById);
router.put("/:id", expenseController.updateExpense);
router.delete("/:id", expenseController.deleteExpense);
router.get("/driver/:driverEmail", expenseController.getExpensesByDriverEmail);
router.patch("/:id/status", expenseController.updateExpenseStatus);

module.exports = router;
