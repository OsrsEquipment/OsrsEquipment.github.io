import Effect from '../../Effect';

class SuperRangingPotion extends Effect {
  static priority = 1000;

  static categories = ['potion', 'ranged'];

  static name = 'Super ranging potion';

  static apply(calculation) {
    if (calculation.dpsType === 'ranged') {
      const { effectiveStrength, effectiveAttack } = calculation;
      calculation.visibleStrengthBonus += Math.floor(effectiveStrength * 0.15) + 5;
      calculation.visibleAttackBonus += Math.floor(effectiveAttack * 0.15) + 5;
      return true;
    }
    return false;
  }
}

export default SuperRangingPotion;
