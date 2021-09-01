import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class DragonSwordSpecial extends ItemEffect {
  static name = 'Wild Stab';

  static description = 'Loads of extra damage';

  static categories = ['item', 'melee'];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [21009]);
  }

  static apply(calculation) {
    calculation.addTransformer('specialTargetDefenceRoll', (a, calc) => {
      const targetDefence = calc.targetDefence + 9;
      const targetStyleDefence = calc.target.defence_stab + 64;
      return targetDefence * targetStyleDefence;
    });
    calculation.addModifier('specialMaxHit', 1.25);
    calculation.addModifier('specialAttackRoll', 1.25);
    calculation.hasSpecial = true;
    return true;
  }
}
