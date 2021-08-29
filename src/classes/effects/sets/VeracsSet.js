import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class VeracsSet extends ItemEffect {
  static priority = 100;

  static name = 'Verac\'s set';

  static description = '25% chance of having a guaranteed and one extra damage';

  static categories = ['item', 'melee'];

  static check(calculation) {
    const set = [
      4755, // Verac's flail
      4753, // Verac's helm
      4757, // Verac's brassard
      4759, // Verac's plateskirt
    ];

    return Utils.hasEquipped(calculation.loadout.equipment, set);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'melee') {
      calculation.addTransformer('averageDamage', (averageDamage, calc) => (calc.maxHit + 1) / 2 * 0.25 + averageDamage * 0.75);
      calculation.addTransformer('specialEffectMaxHit', (seMaxHit, calc) => calc.maxHit + 1);
      calculation.addTransformer('specialEffectHitChance', () => 0.25);
      calculation.hasSpecialEffect = true;
      return true;
    }
    return false;
  }
}
