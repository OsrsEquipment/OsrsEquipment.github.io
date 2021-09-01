import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class DragonLongswordSpecial extends ItemEffect {
  static name = 'Cleave';

  static description = 'Loads of extra damage';

  static categories = ['item', 'melee'];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [1305]);
  }

  static apply(calculation) {
    calculation.addModifier('specialMaxHit', 1.25);
    calculation.hasSpecial = true;
    return true;
  }
}
