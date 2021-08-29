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
    const procChance = 0.06 * (calculation.loadout.settings.completedHardKandarinDiary ? 1.1 : 1);
    const specMaxHit = Math.min(calculation.target.hitpoints * 0.2, 100);
    calculation.addTransformer('averageDamage', (averageDamage) => specMaxHit * procChance + averageDamage * (1 - procChance));
    calculation.addTransformer('specialEffectMaxHit', () => specMaxHit);
    calculation.addTransformer('specialEffectHitChance', () => procChance);
    return true;
  }
}
