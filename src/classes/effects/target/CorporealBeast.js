import TargetEffect from '../../TargetEffect';

export default class CorporealBeast extends TargetEffect {
  static priority = -1;

  static name = 'Corporeal beast';

  static description = 'Check wiki';

  static check(calculation) {
    return [319].includes(calculation.target.id);
  }

  static apply(calculation) {
    if (calculation.dpsType === 'melee' || calculation.dpsType === 'ranged') {
      const vunerableTo = ['spear', 'polearm'];
      const exceptions = [
        11889,
      ];
      if (!vunerableTo.includes(calculation.loadout.weapon.type)
        || exceptions.includes(calculation.loadout.weapon.id)
        || !CorporealBeast.isStabStance(calculation.loadout.stance)) {
        calculation.addModifier('damage', 0.5);
      }
    }
    return true;
  }

  static isStabStance(stance) {
    return stance.attack_type === 'stab';
  }
}
