import DataManager from '../data-manager';

class MonstersManager {
  async getAll() {
    const allMonsters = await DataManager.db.monsters.toArray();
    // freezing the objects prevents them from getting reactive
    // this prevention reduces memory footprint by a LOT
    allMonsters.forEach(Object.freeze);
    return allMonsters;
  }
}

export default new MonstersManager();
