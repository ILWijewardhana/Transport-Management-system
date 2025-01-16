const busRouteService = require("./service");

class BusRouteController {
  async getAllRoutes(req, res) {
    try {
      const routes = await busRouteService.getAllRoutes();
      res.json(routes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getRouteById(req, res) {
    try {
      const route = await busRouteService.getRouteById(req.params.id);
      if (route) {
        res.json(route);
      } else {
        res.status(404).json({ message: "Route not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createRoute(req, res) {
    try {
      const newRoute = await busRouteService.createRoute(req.body);
      res.status(201).json(newRoute);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateRoute(req, res) {
    try {
      const updatedRoute = await busRouteService.updateRoute(
        req.params.id,
        req.body
      );
      if (updatedRoute) {
        res.json(updatedRoute);
      } else {
        res.status(404).json({ message: "Route not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteRoute(req, res) {
    try {
      const deletedRoute = await busRouteService.deleteRoute(req.params.id);
      if (deletedRoute) {
        res.json({ message: "Route deleted successfully" });
      } else {
        res.status(404).json({ message: "Route not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new BusRouteController();
