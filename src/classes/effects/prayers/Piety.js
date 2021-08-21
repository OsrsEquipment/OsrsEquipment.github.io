import Effect from '../../Effect';

class Piety extends Effect {
  static priority = 900;

  static name = 'Piety';

  static description = '+20% Attack, +23% Strength, +25% Defence';

  static apply(calculation) {
    if (calculation.dpsType === 'melee') {
      const { effectiveStrength, effectiveAttack } = calculation;
      calculation.effectiveStrengthBonus += Math.floor(effectiveStrength * 0.23);
      calculation.effectiveAttackBonus += Math.floor(effectiveAttack * 0.20);
      return true;
    }
    return false;
  }
}

export default Piety;
