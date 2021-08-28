import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class Arclight extends ItemEffect {
  static name = 'Arclight';

  static description = 'Provides a bonus against demons';

  static categories = ['item', 'melee'];

  static check(calculation) {
    return Utils.hasEquipped(calculation.loadout.equipment, 19675);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'melee' && Arclight.isTargetDemon(calculation.target)) {
      calculation.addModifier('accuracy', 1.7);
      calculation.addModifier('damage', 1.7);
      return true;
    }
    return false;
  }

  static isTargetDemon(target) {
    return target.attributes.includes('demon');
  }
}
