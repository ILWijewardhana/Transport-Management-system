import axios from "axios";

const BASE_URL = "http://localhost:8080/api/driver-income";

const driverIncomeService = {
  getAllIncomes: async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  getIncomeById: async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  createIncome: async (incomeData) => {
    const response = await axios.post(BASE_URL, incomeData);
    return response.data;
  },

  updateIncome: async (id, incomeData) => {
    const response = await axios.put(`${BASE_URL}/${id}`, incomeData);
    return response.data;
  },

  deleteIncome: async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  },
};

export default driverIncomeService;
