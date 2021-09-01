import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class OnyxBoltsEnchanted extends ItemEffect {
  static name = 'Life leech';

  static description = 'Chance to deal 20% extra damage';

  static categories = ['item', 'ranged'];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [9245, 21950]);
  }

  static apply(calculation) {
    if (calculation.dpsType !== 'ranged') return false;
    const isImmune = OnyxBoltsEnchanted.isTargetUndead(calculation.target);
    const procChance = isImmune
      ? 0 : 0.11 * (calculation.loadout.settings.completedHardKandarinDiary ? 1.1 : 1);
    calculation.addTransformer('specialEffectMaxHit', (seMaxHit, calc) => Math.floor(calc.maxHit * 1.2));
    calculation.addTransformer('specialEffectHitChance', () => procChance);
    calculation.addTransformer('averageDamage', (averageDamage, calc) => (calc.specialEffectMaxHit / 2) * calc.specialEffectHitChance * calc.hitChance + averageDamage * (1 - calc.specialEffectHitChance));
    calculation.hasSpecialEffect = true;
    return true;
  }

  static isTargetUndead(target) {
    return target.attributes && target.attributes.includes('undead');
  }
}
