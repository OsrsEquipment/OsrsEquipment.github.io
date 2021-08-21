export default class EquipmentItem {
  constructor(slot, item = {
    equipment: undefined,
    id: undefined,
    name: undefined,
    members: undefined,
    tradeable: undefined,
    weight: undefined,
    icon: undefined,
    examine: undefined,
  }) {
    this.slot = slot;
    this.id = item.id;
    this.name = item.name;
    this.members = item.members;
    this.tradeable = item.tradeable;
    this.weight = item.weight;
    this.icon = item.icon;
    this.examine = item.examine;
    this.equipment = item.equipment;
  }

  get bonuses() {
    if (!this.equipment) return undefined;
    const relevantBonuses = [
      'attack_stab',
      'attack_slash',
      'attack_crush',
      'attack_magic',
      'attack_ranged',
      'defence_stab',
      'defence_slash',
      'defence_crush',
      'defence_magic',
      'defence_ranged',
      'melee_strength',
      'ranged_strength',
      'magic_damage',
      'prayer',
    ];
    const result = {};

    relevantBonuses.forEach((bonus) => { result[bonus] = this.equipment[bonus]; });

    return result;
  }
}
