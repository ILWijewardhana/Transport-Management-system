const inventoryService = require("./service");

class InventoryController {
  async createItem(req, res) {
    try {
      const item = await inventoryService.createItem(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllItems(req, res) {
    try {
      const items = await inventoryService.getAllItems();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getItemById(req, res) {
    try {
      const item = await inventoryService.getItemById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateItem(req, res) {
    try {
      const item = await inventoryService.updateItem(req.params.id, req.body);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteItem(req, res) {
    try {
      const item = await inventoryService.deleteItem(req.params.id);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getItemByItemId(req, res) {
    try {
      const item = await inventoryService.getItemByItemId(req.params.itemId);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateStock(req, res) {
    try {
      const { newStockCount } = req.body;
      const item = await inventoryService.updateStock(
        req.params.id,
        newStockCount
      );
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new InventoryController();
