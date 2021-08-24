import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class ObsidianArmour extends ItemEffect {
  // Apply before berserker necklace
  static priority = 110;

  static name = 'Obsidian armour';

  static description = 'Increases your accuracy and damage when using obsidian weaponry';

  static categories = ['item', 'melee'];

  static helmId = 21298;

  static bodyId = 21301;

  static legsId = 21304;

  static check(calculation) {
    return Utils.hasEquipped(calculation.loadout.equipment, [
      ObsidianArmour.helmId,
      ObsidianArmour.bodyId,
      ObsidianArmour.legsId,
    ]);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'melee' && ObsidianArmour.isObsidianWeapon(calculation.loadout.equipment)) {
      calculation.addAccuracyModifier(ObsidianArmour.name, 1.1);
      calculation.addDamageModifier(ObsidianArmour.name, 1.1);
      return true;
    }
    return false;
  }

  static isObsidianWeapon(equipment) {
    const obsidianWeaponIds = [6523, 6525, 6527, 6528, 6526];
    return Utils.hasAnyEquipped(equipment, obsidianWeaponIds);
  }
}
