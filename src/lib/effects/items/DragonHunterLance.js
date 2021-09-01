import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class DragonHunterLance extends ItemEffect {
  static priority = 100;

  static name = 'Dragon hunter lance';

  static description = 'Increased accuracy and damage against draconic creatures';

  static categories = ['item', 'melee'];

  static check(calculation) {
    return Utils.hasEquipped(calculation.loadout.equipment, 22978);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'melee' && DragonHunterLance.isTargetDraconic(calculation.target)) {
      calculation.addModifier('attackRoll', 1.2);
      calculation.addModifier('maxHit', 1.2);
      return true;
    }
    return false;
  }

  static isTargetDraconic(target) {
    return target.attributes.includes('dragon');
  }
}
