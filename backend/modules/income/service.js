const Income = require("./model");

class IncomeService {
  async createIncome(incomeData) {
    const income = new Income(incomeData);
    return await income.save();
  }

  async getAllIncomes() {
    return await Income.find();
  }

  async getIncomeById(id) {
    return await Income.findById(id);
  }

  async updateIncome(id, updateData) {
    return await Income.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteIncome(id) {
    return await Income.findByIdAndDelete(id);
  }
}
module.exports = new IncomeService();
