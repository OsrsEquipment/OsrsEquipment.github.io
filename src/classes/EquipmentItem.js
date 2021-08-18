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
    this.item = item;
  }

  get bonuses() {
    if (!this.item || !this.item.equipment) return undefined;
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

    relevantBonuses.forEach((bonus) => { result[bonus] = this.item[bonus]; });

    return result;
  }
}
