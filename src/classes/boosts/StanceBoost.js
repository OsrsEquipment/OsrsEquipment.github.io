import Boost from '../Boost';

export default class StanceBoost extends Boost {
  static priority = 800;

  static show = false;

  static name = 'Stance boost';

  static description = 'Stance applies invisible bonuses';

  static apply(calculation) {
    switch (calculation.dpsType) {
      case 'meleeDps':
        switch (calculation.loadout.stance.attack_style) {
          case 'aggressive':
            calculation.effectiveStrengthBonus += 3;
            break;
          case 'accurate':
            calculation.effectiveAttackBonus += 3;
            break;
          case 'controlled':
            calculation.effectiveStrengthBonus += 1;
            calculation.effectiveAttackBonus += 1;
            break;
        }
        break;
      case 'rangedDps':
        switch (calculation.loadout.stance.combat_style) {
          case 'accurate':
            calculation.effectiveStrengthBonus += 3;
            calculation.effectiveAttackBonus += 3;
            break;
          case 'rapid':
          case 'flare':
            calculation.isRapid = true;
            break;
        }
        break;
      case 'magicDps':
        switch (calculation.loadout.stance.combat_style) {
          case 'accurate':
            calculation.effectiveAttackBonus += 3;
            break;
          case 'longrange':
            calculation.effectiveAttackBonus += 1;
            break;
        }
        break;
    }
    return true;
  }
}
