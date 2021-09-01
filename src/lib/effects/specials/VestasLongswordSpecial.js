import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class VestasLongswordSpecial extends ItemEffect {
  static name = 'Feint';

  static description = 'Loads of extra damage';

  static categories = ['item', 'melee'];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [22613, 24617]);
  }

  static apply(calculation) {
    calculation.addModifier('specialMaxHit', 1.2);
    calculation.addTransformer('specialAverageDamage', (sad, calc) => (Math.floor(calc.maxHit * 0.2) + Math.floor(calc.maxHit * 1.2)) * calc.specialHitChance * 0.5);
    calculation.addModifier('specialTargetDefenceRoll', 0.25);
    calculation.hasSpecial = true;
    return true;
  }
}
