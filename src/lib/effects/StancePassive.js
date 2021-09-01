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
            calculation.invisibleStrengthBonus += 3;
            break;
          case 'accurate':
            calculation.invisibleAttackBonus += 3;
            break;
          case 'controlled':
            calculation.invisibleStrengthBonus += 1;
            calculation.invisibleAttackBonus += 1;
            break;
        }
        break;
      case 'ranged':
        switch (calculation.loadout.stance.combat_style) {
          case 'accurate':
            calculation.invisibleStrengthBonus += 3;
            calculation.invisibleAttackBonus += 3;
            break;
          case 'rapid':
          case 'flare':
          case 'medium fuse':
            calculation.addTransformer('attackSpeed', (attackSpeed) => attackSpeed - 1);
            break;
        }
        break;
      case 'magic':
        switch (calculation.loadout.stance.combat_style) {
          case 'accurate':
            calculation.invisibleAttackBonus += 2;
            break;
        }
        break;
    }
    return true;
  }
}
