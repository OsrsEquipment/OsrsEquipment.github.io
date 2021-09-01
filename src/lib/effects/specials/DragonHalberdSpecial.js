import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class DragonHalberdSpecial extends ItemEffect {
  static name = 'Sweep';

  static description = 'Loads of extra damage';

  static categories = ['item', 'melee'];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [3204]);
  }

  static apply(calculation) {
    calculation.addTransformer('specialTargetDefenceRoll', (a, calc) => {
      const targetDefence = calc.targetDefence + 9;
      const targetStyleDefence = calc.target.defence_slash + 64;
      return targetDefence * targetStyleDefence;
    });
    calculation.addModifier('specialMaxHit', 1.1);
    if (DragonHalberdSpecial.isLarge(calculation.target)) {
      calculation.addTransformer('specialHitChance', (hitChance) => 1 - (1 - hitChance) * (1 - hitChance * 0.75));
      calculation.addTransformer('specialAverageDamage', (a, calc) => {
        const {
          specialAttackRoll,
          specialTargetDefenceRoll,
        } = calc;
        let accuracy;
        if (specialAttackRoll > specialTargetDefenceRoll) {
          accuracy = 1 - ((specialTargetDefenceRoll + 2) / (2 * specialAttackRoll + 1));
        } else {
          accuracy = specialAttackRoll / (2 * specialTargetDefenceRoll + 1);
        }
        return calc.specialMaxHit * accuracy / 2
          + calc.specialMaxHit * accuracy * 0.75 / 2;
      });
    }
    calculation.hasSpecial = true;
    return true;
  }

  static isLarge(target) {
    return target.size > 1;
  }
}
