import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class AhrimsSet extends ItemEffect {
  static priority = 100;

  static name = 'Ahrim\'s set';

  static description = '25% chance for combat spells to deal 30% more damage.';

  static categories = ['item', 'ranged'];

  static check(calculation) {
    const set = [
      4710, // Ahrim's staff
      4708, // Ahrim's hood
      4712, // Ahrim's robetop
      4714, // Ahrim's robeskirt
      12853, // Amulet of the damned
    ];

    return Utils.hasEquipped(calculation.loadout.equipment, set);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'magic') {
      calculation.addTransformer('specialEffectMaxHit', (seMaxHit, calc) => Math.floor(calc.maxHit * 1.3));
      calculation.addTransformer('specialEffectHitChance', () => 0.25);
      calculation.addTransformer('averageDamage', (averageDamage, calc) => calc.specialEffectMaxHit / 2 * calc.specialEffectHitChance * calc.hitChance + averageDamage * (1 - calc.specialEffectHitChance));
      calculation.hasSpecialEffect = true;
      return true;
    }
    return false;
  }
}
