import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class AbyssalBludgeonSpecial extends ItemEffect {
  static name = 'Penance';

  static description = 'Increase damage dealt by 0.5% per prayer point missing';

  static categories = ['item', 'melee'];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [13263]);
  }

  static apply(calculation) {
    const missing = calculation.skills.prayer - calculation.settings.currentPrayerPoints;
    calculation.addModifier('specialMaxHit', 1 + 0.005 * missing);
    calculation.hasSpecial = true;
    return true;
  }
}
