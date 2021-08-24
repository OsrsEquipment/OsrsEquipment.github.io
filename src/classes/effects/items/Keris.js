import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class Keris extends ItemEffect {
  static name = 'Keris';

  static description = 'Provides a bonus against kalphites';

  static categories = ['item', 'melee'];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [10581, 10582, 10583, 10584]);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'melee' && Keris.isTargetKalphite(calculation.target)) {
      calculation.addDamageModifier(Keris.name, 1.33);
      return true;
    }
    return false;
  }

  static isTargetKalphite(target) {
    return target.attributes.includes('kalphite');
  }
}
