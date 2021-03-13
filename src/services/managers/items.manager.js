import DataManager from '../data-manager';

class ItemsManager {
  getBySlotAndName(slot, name) {
    const collection = DataManager.db.items.toCollection();
    if (slot) {
      collection
        .and((item) => item.equipment.slot.toLowerCase() === slot.toLowerCase());
    }
    if (name) {
      collection
        .and((item) => item.name.toLowerCase().startsWith(name.toLowerCase()));
    }
    return collection.toArray();
  }

  async getBySlots(slots) {
    let collection = DataManager.db.items;
    if (slots) {
      collection = collection.where('equipment.slot').anyOfIgnoreCase(slots);
    }
    const items = await collection.toArray();
    items.forEach(Object.freeze);
    return items;
  }

  getDarts() {
    return DataManager.db.items
      .toCollection()
      .filter((item) => /^\w+\sdart$/.test(item.name))
      .toArray();
  }

  async getAll() {
    const items = await DataManager.db.items.toArray();
    items.forEach(Object.freeze);
    return items;
  }

  getById(id) {
    return DataManager.db.items.get(id);
  }
}

export default new ItemsManager();
