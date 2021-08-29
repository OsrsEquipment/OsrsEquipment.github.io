import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class ThammaronsSceptre extends ItemEffect {
  static name = 'Thammaron\'s sceptre';

  static description = 'Provides 100% increased accuracy and 25% increased damage against targets in the wilderness';

  static categories = ['item', 'magic'];

  static check(calculation) {
    return Utils.hasEquipped(calculation.loadout.equipment, 22555);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'magic' && calculation.loadout.settings.inWilderness) {
      calculation.addModifier('attackRoll', 2);
      calculation.magicDamageBonus += 25;
      return true;
    }
    return false;
  }
}
