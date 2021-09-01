import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class RubyBoltsEnchanted extends ItemEffect {
  static name = 'Blood Forfeit';

  static description = 'Chance to deal 20% of target\'s current hitpoints (capped at 100)';

  static categories = ['item', 'ranged'];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [9242, 21944]);
  }

  static apply(calculation) {
    if (calculation.dpsType !== 'ranged') return false;
    const procChance = 0.06 * (calculation.loadout.settings.completedHardKandarinDiary ? 1.1 : 1);
    const specMaxHit = Math.min(calculation.target.hitpoints * 0.2, 100);
    calculation.addTransformer('specialEffectMaxHit', () => specMaxHit);
    calculation.addTransformer('specialEffectHitChance', () => procChance);
    calculation.addTransformer('averageDamage', (averageDamage, calc) => calc.specialEffectMaxHit * calc.specialEffectHitChance + averageDamage * (1 - calc.specialEffectHitChance));
    calculation.hasSpecialEffect = true;
    return true;
  }
}
