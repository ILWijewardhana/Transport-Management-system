const maintenanceService = require("./service");

class MaintenanceController {
  async createService(req, res) {
    try {
      const service = await maintenanceService.createService(req.body);
      res.status(201).json(service);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllServices(req, res) {
    try {
      const services = await maintenanceService.getAllServices();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getServiceById(req, res) {
    try {
      const service = await maintenanceService.getServiceById(req.params.id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateService(req, res) {
    try {
      const service = await maintenanceService.updateService(
        req.params.id,
        req.body
      );
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.status(200).json(service);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteService(req, res) {
    try {
      const service = await maintenanceService.deleteService(req.params.id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getServiceByServiceId(req, res) {
    try {
      const service = await maintenanceService.getServiceByServiceId(
        req.params.serviceId
      );
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getServicesByVehicleNumber(req, res) {
    try {
      const services = await maintenanceService.getServicesByVehicleNumber(
        req.params.vehicleNumber
      );
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateServiceStatus(req, res) {
    try {
      const { newStatus } = req.body;
      const service = await maintenanceService.updateServiceStatus(
        req.params.id,
        newStatus
      );
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.status(200).json(service);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new MaintenanceController();
