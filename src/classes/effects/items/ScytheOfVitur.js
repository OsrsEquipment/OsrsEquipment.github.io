import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class ScytheOfVitur extends ItemEffect {
  static name = 'Scythe of vitur';

  static description = 'Hits large enemies multiple times';

  static categories = ['item', 'melee'];

  static check(calculation) {
    return Utils.hasEquipped(calculation.loadout.equipment, 22325);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'melee' && ScytheOfVitur.isLarge(calculation.target)) {
      calculation.addAverageDamageModifier(ScytheOfVitur.name, 1.75);
      return true;
    }
    return false;
  }

  static isLarge(target) {
    return target.size > 1;
  }
}
