import EquipmentItem from './EquipmentItem';
import EquipmentWeapon from './EquipmentWeapon';

export default class Equipment {
  constructor(items = {
    head: undefined,
    cape: undefined,
    neck: undefined,
    ammo: undefined,
    weapon: undefined,
    shield: undefined,
    body: undefined,
    legs: undefined,
    hands: undefined,
    feet: undefined,
    ring: undefined,
  }) {
    const mappedItems = {};
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const slot in items) {
      const item = items[slot];
      // eslint-disable-next-line no-continue
      if (!item) continue;
      mappedItems[slot] = slot === 'weapon' ? new EquipmentWeapon(slot, item) : new EquipmentItem(slot, item);
    }
    this.items = mappedItems;
  }

  get bonuses() {
    const result = {
      attack_stab: 0,
      attack_slash: 0,
      attack_crush: 0,
      attack_magic: 0,
      attack_ranged: 0,
      defence_stab: 0,
      defence_slash: 0,
      defence_crush: 0,
      defence_magic: 0,
      defence_ranged: 0,
      melee_strength: 0,
      ranged_strength: 0,
      magic_damage: 0,
      prayer: 0,
      slayer: 1,
      undead: 1,
    };
    const skipBonuses = ['requirements', 'slot'];
    Object.values(this.items)
      .filter(Boolean)
      .forEach((item) => {
        const equipBonuses = item.bonuses;
        if (equipBonuses) {
          Object.keys(equipBonuses)
            .filter((bonus) => skipBonuses.indexOf(bonus) === -1)
            .forEach((bonus) => {
              const bonusValue = equipBonuses[bonus];
              result[bonus] += bonusValue;
            });
        }
      });
    return result;
  }

  get weapon() {
    return this.items.weapon;
  }
}
