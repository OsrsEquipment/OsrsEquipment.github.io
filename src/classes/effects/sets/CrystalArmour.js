import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class CrystalArmour extends ItemEffect {
  static priority = 700;

  static name = 'Crystal armour';

  static description = 'Increased accuracy and damage with crystal bow and Bow of Faerdhinen';

  static categories = ['item', 'ranged'];

  static helmId = 23971;

  static bodyId = 23975;

  static legsId = 23979;

  static bowIds = [23983, 25865];

  static check(calculation) {
    const { equipment } = calculation.loadout;
    return Utils.hasAnyEquipped(equipment, [
      CrystalArmour.helmId,
      CrystalArmour.bodyId,
      CrystalArmour.legsId,
    ]) && Utils.hasAnyEquipped(equipment, [...CrystalArmour.bowIds]);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'ranged') {
      const { equipment } = calculation.loadout;
      let bonusDamage = 1;
      let bonusAccuracy = 1;
      if (Utils.hasEquipped(equipment, CrystalArmour.helmId)) {
        bonusDamage += 0.025;
        bonusAccuracy += 0.05;
      }
      if (Utils.hasEquipped(equipment, CrystalArmour.bodyId)) {
        bonusDamage += 0.075;
        bonusAccuracy += 0.15;
      }
      if (Utils.hasEquipped(equipment, CrystalArmour.legsId)) {
        bonusDamage += 0.05;
        bonusAccuracy += 0.1;
      }
      calculation.addDamageModifier(CrystalArmour.name, bonusDamage);
      calculation.addAccuracyModifier(CrystalArmour.name, bonusAccuracy);
      return true;
    }
    return false;
  }
}
