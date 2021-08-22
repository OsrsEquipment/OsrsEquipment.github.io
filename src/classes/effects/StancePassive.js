import Effect from '../Effect';

export default class StancePassive extends Effect {
  static priority = 800;

  static show = false;

  static name = 'Stance passive';

  static description = 'Stance applies invisible bonuses';

  static apply(calculation) {
    switch (calculation.dpsType) {
      case 'melee':
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
      case 'ranged':
        switch (calculation.loadout.stance.combat_style) {
          case 'accurate':
            calculation.effectiveStrengthBonus += 3;
            calculation.effectiveAttackBonus += 3;
            break;
          case 'rapid':
          case 'flare':
            calculation.addAttackSpeedReduction('rapid', 1);
            break;
        }
        break;
      case 'magic':
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
