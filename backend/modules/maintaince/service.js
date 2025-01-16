const Maintenance = require("./model");

class MaintenanceService {
  async createService(serviceData) {
    const service = new Maintenance(serviceData);
    return await service.save();
  }

  async getAllServices() {
    return await Maintenance.find();
  }

  async getServiceById(id) {
    return await Maintenance.findById(id);
  }

  async updateService(id, updateData) {
    return await Maintenance.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteService(id) {
    return await Maintenance.findByIdAndDelete(id);
  }

  async getServiceByServiceId(serviceId) {
    return await Maintenance.findOne({ serviceID: serviceId });
  }

  async getServicesByVehicleNumber(vehicleNumber) {
    return await Maintenance.find({ vehicleNumber });
  }

  async updateServiceStatus(id, newStatus) {
    return await Maintenance.findByIdAndUpdate(
      id,
      { serviceStatus: newStatus },
      { new: true }
    );
  }
}

module.exports = new MaintenanceService();
