const BusRoute = require("./model");

class BusRouteService {
  async getAllRoutes() {
    return await BusRoute.find();
  }

  async getRouteById(id) {
    return await BusRoute.findById(id);
  }

  async createRoute(routeData) {
    const newRoute = new BusRoute(routeData);
    return await newRoute.save();
  }

  async updateRoute(id, routeData) {
    return await BusRoute.findByIdAndUpdate(id, routeData, { new: true });
  }

  async deleteRoute(id) {
    return await BusRoute.findByIdAndDelete(id);
  }
}

module.exports = new BusRouteService();
