import Effect from '../../Effect';

class Rigour extends Effect {
  static priority = 900;

  static name = 'Rigour';

  static description = '+20% Ranged attack, +23% Ranged strength, +25% Defence';

  static apply(calculation) {
    if (calculation.dpsType === 'ranged') {
      const { effectiveStrength, effectiveAttack } = calculation;
      calculation.invisibleStrengthBonus += Math.floor(effectiveStrength * 0.23);
      calculation.invisibleAttackBonus += Math.floor(effectiveAttack * 0.20);
      return true;
    }
    return false;
  }
}

export default Rigour;
