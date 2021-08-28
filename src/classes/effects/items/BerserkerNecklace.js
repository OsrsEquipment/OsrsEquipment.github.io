import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class BerserkerNecklace extends ItemEffect {
  static priority = 100;

  static name = 'Berserker necklace';

  static description = 'Increased damage with obsidian weapons';

  static categories = ['item', 'melee'];

  static check(calculation) {
    return Utils.hasEquipped(calculation.loadout.equipment, 11128);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'melee'
      && BerserkerNecklace.isObsidianMeleeWeapon(calculation.loadout.equipment)) {
      calculation.addModifier('damage', 1.2);
      return true;
    }
    return false;
  }

  static isObsidianMeleeWeapon(equipment) {
    const obsidianWeaponIds = [6523, 6525, 6527, 6528];
    return Utils.hasAnyEquipped(equipment, obsidianWeaponIds);
  }
}
