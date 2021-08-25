import Effect from '../../Effect';

export default class ArclightSpecial extends Effect {
  static name = 'Weaken';

  static description = 'Reduce target\'s Attack, Strength and Defence by 5% (10% on demons)';

  static categories = ['item', 'melee'];

  static apply(calculation) {
    const amount = Number(calculation.loadout.settings?.arclightSpecials);
    if (amount) {
      const {
        target,
        debuffedTarget,
      } = calculation;
      const percentage = (ArclightSpecial.isTargetDemon(target) ? 0.1 : 0.05);
      const defenceReduction = target.defence_level * Math.max((percentage * amount), 0);
      const strengthReduction = target.strength_level * Math.max((percentage * amount), 0);
      const attackReduction = target.attack_level * Math.max((percentage * amount), 0);

      debuffedTarget.defence_level = Math.max(0,
        Math.ceil(debuffedTarget.defence_level - defenceReduction));
      debuffedTarget.strength_level = Math.max(0,
        Math.ceil(debuffedTarget.strength_level - strengthReduction));
      debuffedTarget.attack_level = Math.max(0,
        Math.ceil(debuffedTarget.attack_level - attackReduction));

      return { name: `Weaken x${amount}` };
    }
    return false;
  }

  static isTargetDemon(target) {
    return target.attributes.includes('demon');
  }
}
