import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class OpalBoltsEnchanted extends ItemEffect {
  static name = 'Lucky Lightning';

  static description = 'Chance to deal 10% of visible ranged level as extra damage';

  static categories = ['item', 'ranged'];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [9236, 21932]);
  }

  static apply(calculation) {
    if (calculation.dpsType !== 'ranged') return false;
    const procChance = 0.05 * (calculation.loadout.settings.completedHardKandarinDiary ? 1.1 : 1);
    const specMaxHit = Math.floor(calculation.visibleAttackLevel * 0.1);
    calculation.addTransformer('specialEffectMaxHit', (seMaxHit, calc) => specMaxHit + calc.maxHit);
    calculation.addTransformer('specialEffectHitChance', () => procChance);
    calculation.addTransformer('averageDamage', (averageDamage, calc) => (calc.maxHit / 2 + calc.specialEffectMaxHit) * calc.specialEffectHitChance * calc.hitChance + averageDamage * (1 - calc.specialEffectHitChance));
    calculation.hasSpecialEffect = true;
    return true;
  }
}
