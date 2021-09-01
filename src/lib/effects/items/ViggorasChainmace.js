import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class ViggorasChainmace extends ItemEffect {
  static priority = 100;

  static name = 'Viggora\'s chainmace';

  static description = 'Provides 50% increased accuracy and damage to targets in the wilderness';

  static categories = ['item', 'melee'];

  static check(calculation) {
    return Utils.hasEquipped(calculation.loadout.equipment, 22545);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'melee' && calculation.loadout.settings.inWilderness) {
      calculation.addModifier('attackRoll', 1.5);
      calculation.addModifier('maxHit', 1.5);
      return true;
    }
    return false;
  }
}
