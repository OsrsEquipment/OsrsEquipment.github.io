import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class DharoksSet extends ItemEffect {
  static priority = 100;

  static name = 'Dharok\'s set';

  static description = 'Increases your damage based on your missing health';

  static categories = ['item', 'melee'];

  static check(calculation) {
    const dharoksSet = [
      4718, // Dharok's greataxe
      4716, // Dharok's helm
      4720, // Dharok's platebody
      4722, // Dharok's platelegs
    ];

    return Utils.hasEquipped(calculation.loadout.equipment, dharoksSet);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'melee') {
      const playerMaxHp = calculation.skills.hitpoints;
      const playerCurrentHp = calculation.loadout.settings.currentHitpoints;
      const damageModifier = 1 + (playerMaxHp - playerCurrentHp) / 100 * (playerMaxHp / 100);
      calculation.addModifier('damage', damageModifier);
      return true;
    }
    return false;
  }
}
