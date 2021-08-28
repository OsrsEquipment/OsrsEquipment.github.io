import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class CrawsBow extends ItemEffect {
  static priority = 100;

  static name = 'Craw\'s bow';

  static description = 'Provides 50% increased accuracy and damage to targets in the wilderness';

  static categories = ['item', 'ranged'];

  static check(calculation) {
    return Utils.hasEquipped(calculation.loadout.equipment, 22550);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'ranged' && calculation.loadout.settings.inWilderness) {
      calculation.addModifier('damage', 1.5);
      calculation.addModifier('accuracy', 1.5);
      return true;
    }
    return false;
  }
}
