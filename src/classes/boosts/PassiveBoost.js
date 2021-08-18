import Boost from '../Boost';

export default class PassiveBoost extends Boost {
  static priority = 800;

  static show = false;

  static name = 'Passive boost';

  static description = 'A passive boost required for accurate results';

  static apply(calculation) {
    switch (calculation.dpsType) {
      case 'meleeDps':
      case 'rangedDps':
        calculation.effectiveStrengthBonus += 8;
        calculation.effectiveAttackBonus += 8;
        break;
      case 'magicDps':
        calculation.effectiveAttackBonus += 8;
        break;
    }
    return true;
  }
}
