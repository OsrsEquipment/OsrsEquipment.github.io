import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class StatiusWarhammerSpecial extends ItemEffect {
  static name = 'Smash (Statius\'s Warhammer)';

  static description = 'Loads of extra damage';

  static categories = ['item', 'melee'];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [22622]);
  }

  static apply(calculation) {
    calculation.addModifier('specialMaxHit', 1.25);
    calculation.addTransformer('specialAverageDamage', (sad, calc) => (Math.floor(calc.maxHit * 0.25) + Math.floor(calc.maxHit * 1.25)) * calc.specialHitChance * 0.5);
    calculation.hasSpecial = true;
    return true;
  }
}
