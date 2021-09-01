import ItemEffect from '../../ItemEffect';
import Utils from '../../../services/utils';

export default class DragonClawsSpecial extends ItemEffect {
  static name = 'Slice and Dice';

  static description = 'Loads of extra damage';

  static categories = ['item', 'melee'];

  static check(calculation) {
    return Utils.hasAnyEquipped(calculation.loadout.equipment, [13652]);
  }

  static apply(calculation) {
    // Pretty much a copy of how the spreadsheet does it
    // I don't fully understand the maths behind it
    calculation.addTransformer('specialMaxHit', (m) => m - 1);
    calculation.addTransformer('specialTargetDefenceRoll', (a, calc) => {
      const targetDefence = calc.targetDefence + 9;
      const targetStyleDefence = calc.target.defence_slash + 64;
      return targetDefence * targetStyleDefence;
    });
    calculation.addTransformer('specialHitChance', (specialHitChance) => {
      const geom = (x) => (1 - specialHitChance) ** (x - 1) * specialHitChance;
      return geom(1) + geom(2) + geom(3) + geom(4);
    });
    calculation.addTransformer('specialDps', (a, calc) => {
      const {
        specialAttackRoll,
        specialTargetDefenceRoll,
      } = calc;
      let result;
      if (specialAttackRoll > specialTargetDefenceRoll) {
        result = 1 - ((specialTargetDefenceRoll + 2) / (2 * specialAttackRoll + 1));
      } else {
        result = specialAttackRoll / (2 * specialTargetDefenceRoll + 1);
      }
      const geom = (x) => (1 - result) ** (x - 1) * result;
      return geom(1) * 1.5 * calc.specialMaxHit / calc.attackSpeedInSeconds
        + geom(2) * 1.25 * calc.specialMaxHit / calc.attackSpeedInSeconds
        + geom(3) * 1 * calc.specialMaxHit / calc.attackSpeedInSeconds
        + geom(4) * 0.75 * calc.specialMaxHit / calc.attackSpeedInSeconds
        + (1 - result) ** 4;
    });
    calculation.hasSpecial = true;
    return true;
  }
}
