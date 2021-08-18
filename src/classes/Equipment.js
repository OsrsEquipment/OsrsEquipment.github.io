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
    this.items = items;
  }

  get bonuses() {
    const result = {};
    const skipBonuses = ['requirements', 'slot'];
    Object.values(this.items)
      .filter(Boolean)
      .forEach((item) => {
        const equipBonuses = item.equipment;
        Object.keys(equipBonuses)
          .filter((bonus) => skipBonuses.indexOf(bonus) === -1)
          .forEach((bonus) => {
            const bonusValue = equipBonuses[bonus];
            result[bonus] += bonusValue;
          });
      });
    return result;
  }

  get weapon() {
    return this.items.weapon;
  }
}
