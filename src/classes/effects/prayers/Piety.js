import Effect from '../../Effect';

class Piety extends Effect {
  static priority = 900;

  static name = 'Piety';

  static description = '+20% Attack, +23% Strength, +25% Defence';

  static apply(calculation) {
    if (calculation.dpsType === 'melee') {
      const { effectiveStrength, effectiveAttack } = calculation;
      calculation.invisibleStrengthBonus += Math.floor(effectiveStrength * 0.23);
      calculation.invisibleAttackBonus += Math.floor(effectiveAttack * 0.20);
      return true;
    }
    return false;
  }
}

export default Piety;
