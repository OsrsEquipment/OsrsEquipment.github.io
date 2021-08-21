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
    darts: undefined,
  }) {
    this.head = new EquipmentItem('head', items.head);
    this.cape = new EquipmentItem('cape', items.cape);
    this.neck = new EquipmentItem('neck', items.neck);
    this.ammo = new EquipmentItem('ammo', items.ammo);
    this.weapon = new EquipmentWeapon('weapon', items.weapon);
    this.shield = new EquipmentItem('shield', items.shield);
    this.body = new EquipmentItem('body', items.body);
    this.legs = new EquipmentItem('legs', items.legs);
    this.hands = new EquipmentItem('hands', items.hands);
    this.feet = new EquipmentItem('feet', items.feet);
    this.ring = new EquipmentItem('ring', items.ring);
    this.darts = new EquipmentItem('darts', items.darts);
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
    const items = {
      head: this.head,
      cape: this.cape,
      neck: this.neck,
      ammo: this.ammo,
      weapon: this.weapon,
      shield: this.shield,
      body: this.body,
      legs: this.legs,
      hands: this.hands,
      feet: this.feet,
      ring: this.ring,
      darts: this.darts,
    };
    Object.values(items)
      .filter(Boolean)
      .forEach((item) => {
        const equipBonuses = item.bonuses;
        if (equipBonuses) {
          Object.keys(equipBonuses)
            .forEach((bonus) => {
              const bonusValue = equipBonuses[bonus];
              result[bonus] += bonusValue;
            });
        }
      });
    return result;
  }
}
