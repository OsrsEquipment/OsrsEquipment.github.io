import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class DragonDaggerSpecial extends ItemEffect {
  static name = 'Puncture';

  static description = 'Loads of extra damage';

  static categories = ['item', 'melee'];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [1215]);
  }

  static apply(calculation) {
    calculation.addTransformer('specialTargetDefenceRoll', (a, calc) => {
      const targetDefence = calc.targetDefence + 9;
      const targetStyleDefence = calc.target.defence_slash + 64;
      return targetDefence * targetStyleDefence;
    });
    calculation.addModifier('specialAttackRoll', 1.15);
    calculation.addModifier('specialMaxHit', 1.15);
    calculation.addModifier('specialAverageDamage', 2);
    calculation.hasSpecial = true;
    return true;
  }
}
