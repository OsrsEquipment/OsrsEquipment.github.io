import Effect from '../../Effect';

class SuperhumanStrength extends Effect {
  static priority = 900;

  static name = 'Superhuman Strength';

  static description = '+10% Strength';

  static apply(calculation) {
    if (calculation.dpsType === 'melee') {
      const { effectiveStrength } = calculation;
      calculation.effectiveStrengthBonus += Math.floor(effectiveStrength * 0.1);
      return true;
    }
    return false;
  }
}

export default SuperhumanStrength;
