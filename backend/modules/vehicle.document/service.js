const Vehicle = require("./model");

class VehicleService {
  async createVehicle(vehicleData) {
    return await Vehicle.create(vehicleData);
  }

  async getAllVehicles() {
    return await Vehicle.find();
  }

  async getVehicleById(id) {
    return await Vehicle.findById(id);
  }

  async updateVehicle(id, updateData) {
    return await Vehicle.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteVehicle(id) {
    return await Vehicle.findByIdAndDelete(id);
  }
}

module.exports = new VehicleService();
