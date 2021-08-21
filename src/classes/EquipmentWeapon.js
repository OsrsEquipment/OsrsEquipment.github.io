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
  }

  get stances() {
    if (!this.item || !this.item.weapon) return undefined;
    return this.item.weapon.stances;
  }

  get attackSpeed() {
    if (!this.item || !this.item.weapon) return undefined;
    return this.item.weapon.attack_speed;
  }

  get type() {
    if (!this.item || !this.item.weapon) return undefined;
    return this.item.weapon.weapon_type;
  }
}
