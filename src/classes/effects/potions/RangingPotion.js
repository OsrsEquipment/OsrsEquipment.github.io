import Effect from '../../Effect';

class RangingPotion extends Effect {
  static priority = 1000;

  static categories = ['potion', 'ranged'];

  static name = 'Ranging potion';

  static apply(calculation) {
    if (calculation.dpsType === 'ranged') {
      const { effectiveStrength, effectiveAttack } = calculation;
      calculation.effectiveStrengthBonus += Math.floor(effectiveStrength * 0.1) + 4;
      calculation.effectiveAttackBonus += Math.floor(effectiveAttack * 0.1) + 4;
      return true;
    }
    return false;
  }
}

export default RangingPotion;
