import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class DragonMaceSpecial extends ItemEffect {
  static name = 'Shatter';

  static description = 'Loads of extra damage';

  static categories = ['item', 'melee'];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [1434]);
  }

  static apply(calculation) {
    calculation.addModifier('specialMaxHit', 1.50);
    calculation.addModifier('specialAttackRoll', 1.25);
    calculation.hasSpecial = true;
    return true;
  }
}
