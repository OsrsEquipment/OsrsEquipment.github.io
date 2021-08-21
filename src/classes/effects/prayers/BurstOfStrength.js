import Effect from '../../Effect';

class BurstOfStrength extends Effect {
  static priority = 900;

  static name = 'Burst of Strength';

  static description = '+5% Strength';

  static apply(calculation) {
    if (calculation.dpsType === 'melee') {
      const { effectiveStrength } = calculation;
      calculation.effectiveStrengthBonus += Math.floor(effectiveStrength * 0.05);
      return true;
    }
    return false;
  }
}

export default BurstOfStrength;
