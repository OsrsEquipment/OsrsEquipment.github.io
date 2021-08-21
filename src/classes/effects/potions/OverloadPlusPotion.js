import Effect from '../../Effect';

class OverloadPlusPotion extends Effect {
  static priority = 1000;

  static categories = ['potion', 'strength', 'attack', 'ranged', 'magic'];

  static name = 'Overload (+)';

  static apply(calculation) {
    const { effectiveAttack, effectiveStrength } = calculation;
    calculation.effectiveAttackBonus += Math.floor(effectiveAttack * 0.16) + 6;
    calculation.effectiveStrengthBonus += Math.floor(effectiveStrength * 0.16) + 6;
    return true;
  }
}

export default OverloadPlusPotion;
