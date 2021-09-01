import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class KarilsSet extends ItemEffect {
  static priority = 100;

  static name = 'Karil\'s set';

  static description = '25% chance of hitting twice with one attack. Second hit deals half the damage of first hit.';

  static categories = ['item', 'ranged'];

  static check(calculation) {
    const set = [
      4734, // Karil's crossbow
      4732, // Karil's coif
      4736, // Karil's leathertop
      4738, // Karil's leatherskirt
      12853, // Amulet of the damned
    ];

    return Utils.hasEquipped(calculation.loadout.equipment, set);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'ranged') {
      calculation.addTransformer('specialEffectMaxHit', (seMaxHit, calc) => calc.maxHit / 2);
      calculation.addTransformer('specialEffectHitChance', () => 0.25);
      calculation.addTransformer('averageDamage', (averageDamage, calc) => (calc.maxHit + calc.specialEffectMaxHit) / 2 * calc.specialEffectHitChance * calc.hitChance + averageDamage * (1 - calc.specialEffectHitChance));
      calculation.hasSpecialEffect = true;
      return true;
    }
    return false;
  }
}
