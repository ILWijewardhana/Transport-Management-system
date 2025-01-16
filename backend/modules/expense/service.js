const Expense = require("./model");

class ExpenseService {
  async createExpense(expenseData) {
    const expense = new Expense(expenseData);
    return await expense.save();
  }

  async getAllExpenses() {
    return await Expense.find();
  }

  async getExpenseById(id) {
    return await Expense.findById(id);
  }

  async updateExpense(id, updateData) {
    return await Expense.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteExpense(id) {
    return await Expense.findByIdAndDelete(id);
  }

  async getExpensesByDriverEmail(driverEmail) {
    return await Expense.find({ driverEmail });
  }

  async updateExpenseStatus(id, status, rejectionReason = "") {
    const updateData = { status };
    if (status === "rejected") {
      updateData.rejectionReason = rejectionReason;
    }
    return await Expense.findByIdAndUpdate(id, updateData, { new: true });
  }
}

module.exports = new ExpenseService();
