const vehicleService = require("./service");

class VehicleController {
  async createVehicle(req, res) {
    try {
      const vehicle = await vehicleService.createVehicle(req.body);
      res.status(201).json(vehicle);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllVehicles(req, res) {
    try {
      const vehicles = await vehicleService.getAllVehicles();
      res.status(200).json(vehicles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getVehicleById(req, res) {
    try {
      const vehicle = await vehicleService.getVehicleById(req.params.id);
      if (!vehicle)
        return res.status(404).json({ message: "Vehicle not found" });
      res.status(200).json(vehicle);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateVehicle(req, res) {
    try {
      const vehicle = await vehicleService.updateVehicle(
        req.params.id,
        req.body
      );
      if (!vehicle)
        return res.status(404).json({ message: "Vehicle not found" });
      res.status(200).json(vehicle);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteVehicle(req, res) {
    try {
      const vehicle = await vehicleService.deleteVehicle(req.params.id);
      if (!vehicle)
        return res.status(404).json({ message: "Vehicle not found" });
      res.status(200).json({ message: "Vehicle deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new VehicleController();
