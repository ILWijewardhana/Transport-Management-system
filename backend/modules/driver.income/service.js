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

  async getIncomesByDriverEmail(driverEmail) {
    return await Income.find({ driverEmail });
  }

  async updateIncomeStatus(id, status, rejectionReason = "") {
    const updateData = { status };
    if (status === "rejected") {
      updateData.rejectionReason = rejectionReason;
    }
    return await Income.findByIdAndUpdate(id, updateData, { new: true });
  }
}
module.exports = new IncomeService();
