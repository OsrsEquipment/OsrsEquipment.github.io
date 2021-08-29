import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class PearlBoltsEnchanted extends ItemEffect {
  static name = 'Sea Curse';

  static description = 'Chance to deal 1/20 (1/15 for certain creatures) of visible ranged level as extra damage';

  static categories = ['item', 'ranged'];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [9238, 21936]);
  }

  static apply(calculation) {
    if (calculation.dpsType !== 'ranged') return false;
    const procChance = 0.06 * (calculation.loadout.settings.completedHardKandarinDiary ? 1.1 : 1);
    const multiplier = PearlBoltsEnchanted.isTargetFiery(calculation.target) ? 1 / 15 : 1 / 20;
    const specMaxHit = Math.floor(calculation.visibleAttackLevel * multiplier);
    calculation.addTransformer('averageDamage', (averageDamage, calc) => (calc.maxHit / 2 + specMaxHit) * procChance * calc.hitChance + averageDamage * (1 - procChance));
    calculation.addTransformer('specialEffectMaxHit', (seMaxHit, calc) => specMaxHit + calc.maxHit);
    calculation.addTransformer('specialEffectHitChance', () => procChance);
    calculation.hasSpecialEffect = true;
    return true;
  }

  static isTargetFiery(target) {
    return target.attributes && target.attributes.includes('fiery');
  }
}
