import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class DragonstoneBoltsEnchanted extends ItemEffect {
  static name = 'Dragon\'s breath';

  static description = 'Chance to deal 20% of visible ranged level as extra damage';

  static categories = ['item', 'ranged'];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [9244, 21948]);
  }

  static apply(calculation) {
    if (calculation.dpsType !== 'ranged') return false;
    const isImmune = DragonstoneBoltsEnchanted.isTargetDragon(calculation.target);
    const procChance = isImmune
      ? 0 : 0.06 * (calculation.loadout.settings.completedHardKandarinDiary ? 1.1 : 1);
    const specMaxHit = isImmune
      ? 0 : Math.floor(calculation.visibleAttackLevel * 0.2);
    // Spreadsheet seems to do an accuracy check for the spec hit as well? No reference as to why
    calculation.addTransformer('averageDamage', (averageDamage, calc) => (calc.maxHit / 2 + specMaxHit) * procChance * calc.hitChance + averageDamage * (1 - procChance));
    calculation.addTransformer('specialEffectMaxHit', (seMaxHit, calc) => specMaxHit + calc.maxHit);
    calculation.addTransformer('specialEffectHitChance', () => procChance);
    calculation.hasSpecialEffect = true;
    return true;
  }

  static isTargetDragon(target) {
    return target.attributes && target.attributes.includes('dragon');
  }
}
