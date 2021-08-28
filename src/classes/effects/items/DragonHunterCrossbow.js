import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class DragonHunterCrossbow extends ItemEffect {
  static priority = 100;

  static name = 'Dragon hunter crossbow';

  static description = 'Increased accuracy and damage against draconic creatures';

  static categories = ['item', 'ranged'];

  static check(calculation) {
    return Utils.hasEquipped(calculation.loadout.equipment, 21012);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'ranged' && DragonHunterCrossbow.isTargetDraconic(calculation.target)) {
      calculation.addModifier('accuracy', 1.3);
      calculation.addModifier('damage', 1.25);
      return true;
    }
    return false;
  }

  static isTargetDraconic(target) {
    return target.attributes.includes('dragon');
  }
}
