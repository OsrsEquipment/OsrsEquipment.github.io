import Effect from '../../Effect';

class Rigour extends Effect {
  static priority = 900;

  static name = 'Rigour';

  static description = '+20% Ranged attack, +23% Ranged strength, +25% Defence';

  static apply(calculation) {
    if (calculation.dpsType === 'ranged') {
      const { effectiveStrength, effectiveAttack } = calculation;
      calculation.effectiveStrengthBonus += Math.floor(effectiveStrength * 0.23);
      calculation.effectiveAttackBonus += Math.floor(effectiveAttack * 0.20);
      return true;
    }
    return false;
  }
}

export default Rigour;
