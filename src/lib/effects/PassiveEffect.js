import Effect from '../Effect';

export default class PassiveEffect extends Effect {
  static priority = 800;

  static show = false;

  static name = 'Passive effect';

  static description = 'A passive effect required for accurate results';

  static apply(calculation) {
    switch (calculation.dpsType) {
      case 'melee':
      case 'ranged':
        calculation.invisibleStrengthBonus += 8;
        calculation.invisibleAttackBonus += 8;
    }
    return true;
  }
}
