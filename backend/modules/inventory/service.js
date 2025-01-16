const Inventory = require("./model");

class InventoryService {
  async createItem(itemData) {
    const item = new Inventory(itemData);
    return await item.save();
  }

  async getAllItems() {
    return await Inventory.find();
  }

  async getItemById(id) {
    return await Inventory.findById(id);
  }

  async updateItem(id, updateData) {
    return await Inventory.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteItem(id) {
    return await Inventory.findByIdAndDelete(id);
  }

  async getItemByItemId(itemId) {
    return await Inventory.findOne({ Item_ID: itemId });
  }

  async updateStock(id, newStockCount) {
    return await Inventory.findByIdAndUpdate(
      id,
      { Stock_Count: newStockCount },
      { new: true }
    );
  }
}

module.exports = new InventoryService();
