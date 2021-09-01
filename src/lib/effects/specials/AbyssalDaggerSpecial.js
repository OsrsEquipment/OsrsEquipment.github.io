import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class AbyssalDaggerSpecial extends ItemEffect {
  static name = 'Abyssal Puncture';

  static description = 'Double attack';

  static categories = ['item', 'melee'];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [13265]);
  }

  static apply(calculation) {
    calculation.addModifier('specialMaxHit', 0.85);
    calculation.addModifier('specialAttackRoll', 1.25);
    calculation.addModifier('specialAverageDamage', 2);
    calculation.hasSpecial = true;
    return true;
  }
}
