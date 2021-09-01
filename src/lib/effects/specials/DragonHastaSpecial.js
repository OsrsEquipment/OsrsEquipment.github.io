import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class DragonHastaSpecial extends ItemEffect {
  static name = 'Unleash';

  static description = 'Loads of extra damage';

  static categories = ['item', 'melee'];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [22731]);
  }

  static apply(calculation) {
    const remaining = Math.floor(calculation.settings.currentSpecialEnergy / 5);
    calculation.addModifier('specialAttackRoll', 1 + 0.05 * remaining);
    calculation.addModifier('specialMaxHit', 1 + 0.025 * remaining);
    calculation.hasSpecial = true;
    return true;
  }
}
