import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class DiamondBoltsEnchanted extends ItemEffect {
  static name = 'Armour Piercing';

  static description = 'Chance to guarantee a hit that rolls between 0-115% of your normal max hit';

  static categories = ['item', 'ranged'];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [9243, 21946]);
  }

  static apply(calculation) {
    if (calculation.dpsType !== 'ranged') return false;
    const procChance = 0.1 * (calculation.loadout.settings.completedHardKandarinDiary ? 1.1 : 1);
    calculation.addTransformer('specialEffectMaxHit', (seMaxHit, calc) => Math.floor(calc.maxHit * 1.15));
    calculation.addTransformer('specialEffectHitChance', () => procChance);
    calculation.addTransformer('averageDamage', (averageDamage, calc) => calc.specialEffectMaxHit / 2 * calc.specialEffectHitChance + averageDamage * (1 - calc.specialEffectHitChance));
    calculation.hasSpecialEffect = true;
    return true;
  }
}
