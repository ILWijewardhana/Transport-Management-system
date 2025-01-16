const expenseService = require("./service");

class ExpenseController {
  async createExpense(req, res) {
    try {
      const expense = await expenseService.createExpense(req.body);
      res.status(201).json(expense);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllExpenses(req, res) {
    try {
      const expenses = await expenseService.getAllExpenses();
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getExpenseById(req, res) {
    try {
      const expense = await expenseService.getExpenseById(req.params.id);
      if (!expense) {
        return res.status(404).json({ message: "Expense not found" });
      }
      res.status(200).json(expense);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateExpense(req, res) {
    try {
      const expense = await expenseService.updateExpense(
        req.params.id,
        req.body
      );
      if (!expense) {
        return res.status(404).json({ message: "Expense not found" });
      }
      res.status(200).json(expense);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteExpense(req, res) {
    try {
      const expense = await expenseService.deleteExpense(req.params.id);
      if (!expense) {
        return res.status(404).json({ message: "Expense not found" });
      }
      res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getExpensesByDriverEmail(req, res) {
    try {
      const expenses = await expenseService.getExpensesByDriverEmail(
        req.params.driverEmail
      );
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateExpenseStatus(req, res) {
    try {
      const { status, rejectionReason } = req.body;
      const expense = await expenseService.updateExpenseStatus(
        req.params.id,
        status,
        rejectionReason
      );
      if (!expense) {
        return res.status(404).json({ message: "Expense not found" });
      }
      res.status(200).json(expense);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new ExpenseController();
