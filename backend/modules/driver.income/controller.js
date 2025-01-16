const incomeService = require("./service");

class IncomeController {
  async createIncome(req, res) {
    try {
      const income = await incomeService.createIncome(req.body);
      res.status(201).json(income);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllIncomes(req, res) {
    try {
      const incomes = await incomeService.getAllIncomes();
      res.status(200).json(incomes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getIncomeById(req, res) {
    try {
      const income = await incomeService.getIncomeById(req.params.id);
      if (!income) {
        return res.status(404).json({ message: "Income not found" });
      }
      res.status(200).json(income);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateIncome(req, res) {
    try {
      const income = await incomeService.updateIncome(req.params.id, req.body);
      if (!income) {
        return res.status(404).json({ message: "Income not found" });
      }
      res.status(200).json(income);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteIncome(req, res) {
    try {
      const income = await incomeService.deleteIncome(req.params.id);
      if (!income) {
        return res.status(404).json({ message: "Income not found" });
      }
      res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getIncomesByDriverEmail(req, res) {
    try {
      const incomes = await incomeService.getIncomesByDriverEmail(
        req.params.driverEmail
      );
      res.status(200).json(incomes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateIncomeStatus(req, res) {
    try {
      const { status, rejectionReason } = req.body;
      const income = await incomeService.updateIncomeStatus(
        req.params.id,
        status,
        rejectionReason
      );
      if (!income) {
        return res.status(404).json({ message: "Income not found" });
      }
      res.status(200).json(income);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new IncomeController();
