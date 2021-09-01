import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class DragonSwordSpecial extends ItemEffect {
  static name = 'Wild Stab';

  static description = 'Loads of extra damage';

  static categories = ['item', 'melee'];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [13576]);
  }

  static apply(calculation) {
    calculation.addModifier('specialMaxHit', 1.50);
    calculation.hasSpecial = true;
    return true;
  }
}
