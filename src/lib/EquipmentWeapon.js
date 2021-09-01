import EquipmentItem from './EquipmentItem';

export default class EquipmentWeapon extends EquipmentItem {
  constructor(slot, item = {
    equipment: undefined,
    id: undefined,
    name: undefined,
    members: undefined,
    tradeable: undefined,
    weapon: undefined,
    weight: undefined,
    icon: undefined,
    examine: undefined,
  }) {
    super(slot, item);
    this.weapon = item.weapon;
  }

  get stances() {
    if (!this.weapon) return undefined;
    return this.weapon.stances;
  }

  get attackSpeed() {
    if (!this.weapon) return undefined;
    return this.weapon.attack_speed;
  }

  get type() {
    if (!this.weapon) return undefined;
    return this.weapon.weapon_type;
  }
}
