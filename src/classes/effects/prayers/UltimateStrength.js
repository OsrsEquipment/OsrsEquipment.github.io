import Effect from '../../Effect';

class UltimateStrength extends Effect {
  static priority = 900;

  static name = 'Ultimate Strength';

  static description = '+15% Strength';

  static apply(calculation) {
    if (calculation.dpsType === 'melee') {
      const { effectiveStrength } = calculation;
      calculation.invisibleStrengthBonus += Math.floor(effectiveStrength * 0.15);
      return true;
    }
    return false;
  }
}

export default UltimateStrength;
